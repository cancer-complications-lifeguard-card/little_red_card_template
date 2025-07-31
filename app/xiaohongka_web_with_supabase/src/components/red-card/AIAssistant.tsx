"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Send, 
  Bot, 
  User, 
  Heart, 
  AlertTriangle,
  Clock,
  MessageSquare,
  Sparkles,
  Brain,
  Settings
} from "lucide-react";
import AuthManager from "./AuthManager";
import { aiService, AIMessage } from "@/lib/ai-service";
import ErrorToast from "@/components/ui/error-toast";

interface Message {
  id: string;
  content: string;
  displayContent: string; // 用于打字机效果显示的内容
  role: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean; // 是否正在打字中
}

interface UserSession {
  isLoggedIn: boolean;
  username: string;
  apiKey: string;
  selectedModel: string;
  selectedGLMModel: string;
}

const aiModels = [
  { id: 'complication-expert', name: '并发症专家', description: '专业的并发症诊断和治疗指导' },
  { id: 'emergency-specialist', name: '急救专家', description: '并发症紧急情况处理专家' },
  { id: 'rehabilitation-guide', name: '康复指导专家', description: '并发症后康复和长期管理专家' }
];

const quickQuestions = [
  "什么是消化道出血的紧急处理方法？",
  "肠梗阻有哪些典型症状？",
  "如何预防术后感染？",
  "腹水患者需要注意什么？",
  "抗凝药物使用注意事项有哪些？"
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '您好！我是小红卡AI医疗助手，可以为您提供专业的医疗咨询和急救指导。请先在右上角设置API密钥，然后告诉我您需要什么帮助？',
      displayContent: '您好！我是小红卡AI医疗助手，可以为您提供专业的医疗咨询和急救指导。请先在右上角设置API密钥，然后告诉我您需要什么帮助？',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('complication-expert');
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: false,
    username: '',
    apiKey: '',
    selectedModel: 'complication-expert',
    selectedGLMModel: 'glm-4.5'
  });
  const [errorToast, setErrorToast] = useState<{
    show: boolean;
    message: string;
    type: 'error' | 'success' | 'info' | 'warning';
  }>({ show: false, message: '', type: 'error' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 从localStorage加载用户会话
  useEffect(() => {
    const savedSession = localStorage.getItem('userSession');
    if (savedSession) {
      try {
        const session = JSON.parse(savedSession);
        setUserSession(session);
        setSelectedModel(session.selectedModel || 'complication-expert');
        
        // 如果有API密钥，初始化AI服务
        if (session.apiKey) {
          initializeAIService(session.apiKey, session.selectedModel, session.selectedGLMModel);
        }
      } catch (error) {
        console.error('加载用户会话失败:', error);
      }
    }
  }, []);

  const initializeAIService = async (apiKey: string, model: string, glmModel?: string) => {
    try {
      await aiService.initialize(apiKey);
      showToast('AI服务初始化成功', 'success');
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message, 'error');
      }
    }
  };

  const showToast = (message: string, type: 'error' | 'success' | 'info' | 'warning' = 'error') => {
    setErrorToast({ show: true, message, type });
    setTimeout(() => {
      setErrorToast({ show: false, message: '', type: 'error' });
    }, 5000);
  };

  const handleAuthChange = (session: UserSession) => {
    setUserSession(session);
    setSelectedModel(session.selectedModel);
    
    if (session.apiKey) {
      initializeAIService(session.apiKey, session.selectedModel, session.selectedGLMModel);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 打字机效果
  useEffect(() => {
    const typingMessages = messages.filter(msg => msg.isTyping && msg.displayContent.length < msg.content.length);
    
    if (typingMessages.length === 0) return;

    const timers: NodeJS.Timeout[] = [];
    
    typingMessages.forEach(message => {
      if (message.displayContent.length < message.content.length) {
        const timer = setTimeout(() => {
          setMessages(prev => prev.map(msg => 
            msg.id === message.id 
              ? { ...msg, displayContent: msg.content.substring(0, msg.displayContent.length + 1) }
              : msg
          ));
        }, 20); // 打字速度，可以调整
        timers.push(timer);
      }
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // 检查是否已登录
    if (!userSession.isLoggedIn) {
      showToast('请先设置API密钥', 'warning');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      displayContent: inputMessage,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // 获取当前模型的系统提示词
      const currentModel = aiModels.find(model => model.id === selectedModel);
      let systemPrompt = '';
      
      if (currentModel) {
        switch (currentModel.id) {
          case 'complication-expert':
            systemPrompt = `# Role: 并发症专业医疗助手

## Profile
- language: 中文
- description: 专注于癌症、罕见病等多病种治疗相关并发症管理的专业医疗助手
- expertise: 癌症、罕见病、慢性病等多病种治疗相关并发症的预防、识别、处理及康复
- target_audience: 癌症患者、罕见病患者、慢性病患者、家属及照护者

## Rules
1. 基本原则：
   - 循证为本: 所有建议必须基于可靠医学证据
   - 实用导向: 提供可操作性强的具体建议
   - 安全第一: 避免任何可能危害患者的建议
   - 全程管理: 覆盖预防、识别、治疗到康复全周期

2. 行为准则：
   - 辅助定位: 明确说明不替代专业医疗判断
   - 隐私保护: 严格遵守医疗信息保密原则
   - 客观中立: 不推荐特定医疗机构或产品
   - 知情告知: 全面说明各种方案的利弊

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行风险分层
- 必须按照小红卡四大模块结构输出（🆘急救指导、🔍病情诊断、🏠日常预防、🤝辅助服务）
- 必须提供具体可操作的建议，避免空泛描述
- 必须包含120急救话术模板（如适用）
- 必须生成个人医疗信息卡格式`;
            break;
          case 'emergency-specialist':
            systemPrompt = `# Role: 并发症急救专家

## Profile
- language: 中文
- description: 专注于癌症、罕见病等治疗相关并发症的紧急处理和急救指导
- expertise: 各种并发症的紧急识别、急救措施、转运指导、生命体征监测

## Rules
1. 核心原则：
   - 生命至上: 优先保障患者生命安全
   - 快速响应: 提供立即可以执行的急救措施
   - 标准化: 遵循标准急救流程和指南
   - 清晰指导: 步骤明确，易于理解和执行

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行紧急程度分级
- 必须提供分秒必争的急救步骤指导
- 必须包含120急救电话话术模板
- 必须明确标识需要立即就医的危险信号`;
            break;
          case 'rehabilitation-guide':
            systemPrompt = `# Role: 并发症康复指导专家

## Profile
- language: 中文
- description: 专注于并发症后的康复治疗、功能恢复和长期健康管理
- expertise: 功能评估、康复训练、营养支持、心理疏导、生活质量提升

## Rules
1. 康复原则：
   - 个体化: 根据患者具体情况制定个性化方案
   - 循序渐进: 康复训练逐步推进，避免过度
   - 全面性: 关注身体、心理、社会功能全方位康复
   - 长期性: 强调康复是一个长期过程

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行康复风险评估
- 必须提供分阶段的康复计划（急性期、恢复期、维持期）
- 必须包含家庭康复训练的具体指导
- 必须提供营养支持和心理调适建议`;
            break;
        }
      }

      // 创建流式响应消息
      const streamingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        displayContent: '',
        role: 'assistant',
        timestamp: new Date(),
        isTyping: true
      };

      setMessages(prev => [...prev, streamingMessage]);

      // 调用AI服务流式API
      const aiMessages: AIMessage[] = [
        {
          role: 'user',
          content: inputMessage
        }
      ];

      await aiService.chatCompletionStream(
        aiMessages,
        selectedModel,
        undefined,
        userSession.selectedGLMModel,
        (chunk) => {
          // 更新流式消息的完整内容
          setMessages(prev => prev.map(msg => 
            msg.id === streamingMessage.id 
              ? { ...msg, content: msg.content + chunk }
              : msg
          ));
        },
        () => {
          // 流式完成，停止打字效果
          setMessages(prev => prev.map(msg => 
            msg.id === streamingMessage.id 
              ? { ...msg, isTyping: false, displayContent: msg.content }
              : msg
          ));
          setIsLoading(false);
        },
        (error) => {
          // 错误处理
          setIsLoading(false);
          showToast(error.message, 'error');
          
          // 更新消息为错误信息
          setMessages(prev => prev.map(msg => 
            msg.id === streamingMessage.id 
              ? { ...msg, content: `抱歉，出现了错误：${error.message}。请检查您的API密钥设置或稍后再试。`, displayContent: `抱歉，出现了错误：${error.message}。请检查您的API密钥设置或稍后再试。`, isTyping: false }
              : msg
          ));
        }
      );

    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        showToast(error.message, 'error');
        
        // 添加错误消息到聊天界面
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `抱歉，出现了错误：${error.message}。请检查您的API密钥设置或稍后再试。`,
          displayContent: `抱歉，出现了错误：${error.message}。请检查您的API密钥设置或稍后再试。`,
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Error Toast */}
      <AnimatePresence>
        {errorToast.show && (
          <ErrorToast
            message={errorToast.message}
            type={errorToast.type}
            onClose={() => setErrorToast({ show: false, message: '', type: 'error' })}
          />
        )}
      </AnimatePresence>

      {/* Header with Auth */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="text-sm sm:text-base font-medium">AI模型：</span>
          </div>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aiModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div>
                    <div className="font-medium text-sm">{model.name}</div>
                    <div className="text-xs text-gray-500">{model.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Badge variant="outline" className="text-xs sm:text-sm text-blue-600 border-blue-200">
            <Sparkles className="h-3 w-3 mr-1" />
            智能匹配
          </Badge>
        </div>
        
        <AuthManager 
          onAuthChange={handleAuthChange}
          currentSession={userSession}
        />
      </div>

      {/* Status Indicator */}
      {!userSession.isLoggedIn && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              请先设置API密钥以使用AI助手功能
            </span>
          </div>
        </motion.div>
      )}

      {/* Chat Container */}
      <Card className="flex flex-col h-[60vh] sm:h-[70vh] max-h-[600px] sm:max-h-[800px]">
        <CardHeader className="pb-2 sm:pb-3 flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="text-base sm:text-lg">AI医疗对话</span>
            {userSession.isLoggedIn && (
              <Badge variant="secondary" className="text-xs">
                已连接
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] sm:max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      {message.role === 'assistant' && (
                        <div className="flex items-center gap-1">
                          <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                          <span className="text-xs text-gray-500">AI助手</span>
                        </div>
                      )}
                      {message.role === 'user' && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-500">您</span>
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                        </div>
                      )}
                      <span className="text-xs text-gray-400">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div
                      className={`p-2 sm:p-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white rounded-br-none'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-xs sm:text-sm break-words overflow-hidden">
                        {message.displayContent}
                        {message.isTyping && (
                          <span className="text-gray-400 ml-1 text-xs">正在思考中，请稍等...</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* 加载动画只在非流式响应时显示 */}
              {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] sm:max-w-[80%]">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      <Bot className="h-3 w-3 sm:h-4 sm:w-4 text-blue-500" />
                      <span className="text-xs text-gray-500">AI助手</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-2xl rounded-bl-none">
                      <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="flex-shrink-0 p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="mb-2 sm:mb-3">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1 sm:mb-2">快速提问：</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {quickQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickQuestion(question)}
                    className="px-2 sm:px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors leading-relaxed"
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="请输入您的问题..."
                className="flex-1 resize-none text-sm"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={!userSession.isLoggedIn}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !userSession.isLoggedIn}
                className="self-end bg-blue-500 hover:bg-blue-600 px-3 sm:px-4"
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features - 只在未开始对话时显示 */}
      {messages.length <= 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-green-500" />
                <span className="font-medium">专业可靠</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                基于权威医疗知识库，提供专业准确的医疗建议
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="font-medium">24小时在线</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                随时随地为您提供医疗咨询和急救指导
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-200 dark:border-red-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-medium">紧急响应</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                紧急情况快速响应，提供及时的处理建议
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}