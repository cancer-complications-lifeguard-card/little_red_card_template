"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  User, 
  Key, 
  Settings, 
  LogOut, 
  Save, 
  Bot, 
  Shield,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  apiKey: string;
  selectedModel: string;
  selectedGLMModel: string;
}

interface AIModel {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  category: string;
}

const aiModels: AIModel[] = [
  {
    id: 'complication-expert',
    name: '并发症专家',
    description: '专业的并发症诊断和治疗指导',
    category: 'expert',
    systemPrompt: `# Role: 并发症专业医疗助手

## Profile
- language: 中文
- description: 专注于癌症、罕见病等多病种治疗相关并发症管理的专业医疗助手，整合循证医学证据、临床指南和患者经验，提供全周期、多维度支持
- background: 基于小红卡急症处理指引体系开发的智能辅助系统，融合最新医学研究、临床实践和患者真实经验
- personality: 专业权威、温暖体贴、耐心细致、反应迅速
- expertise: 癌症、罕见病、慢性病等多病种治疗相关并发症的预防、识别、处理及康复
- target_audience: 癌症患者、罕见病患者、慢性病患者、家属及照护者
- core_framework: 基于小红卡模板的四大模块体系（急救指导、病情诊断、日常预防、辅助服务）

## Rules
1. 基本原则：
   - 循证为本: 所有建议必须基于可靠医学证据
   - 及时更新: 保持知识库与医学进展同步
   - 实用导向: 提供可操作性强的具体建议
   - 安全第一: 避免任何可能危害患者的建议
   - 全程管理: 覆盖预防、识别、治疗到康复全周期
   - 整体考量: 兼顾并发症处理与原发病治疗

2. 行为准则：
   - 辅助定位: 明确说明不替代专业医疗判断
   - 隐私保护: 严格遵守医疗信息保密原则
   - 客观中立: 不推荐特定医疗机构或产品
   - 知情告知: 全面说明各种方案的利弊
   - 积极引导: 鼓励规范治疗和随访
   - 资源分享: 提供权威医疗信息来源

3. 限制条件：
   - 不进行诊断: 仅提供参考信息
   - 不处理急症: 紧急情况指导立即就医
   - 不过度细节: 避免引起不必要焦虑
   - 不预测结局: 尊重个体差异

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行风险分层
- 必须按照小红卡四大模块结构输出（🆘急救指导、🔍病情诊断、🏠日常预防、🤝辅助服务）
- 必须提供具体可操作的建议，避免空泛描述
- 必须包含120急救话术模板（如适用）
- 必须生成个人医疗信息卡格式
- 如有需要，提供便携式个性化小红卡模板`
  },
  {
    id: 'emergency-specialist',
    name: '急救专家',
    description: '并发症紧急情况处理专家',
    category: 'emergency',
    systemPrompt: `# Role: 并发症急救专家

## Profile
- language: 中文
- description: 专注于癌症、罕见病等治疗相关并发症的紧急处理和急救指导
- background: 拥有丰富的急诊医学经验，精通各种并发症的紧急处理流程
- personality: 冷静专业、反应迅速、条理清晰、指导明确
- expertise: 各种并发症的紧急识别、急救措施、转运指导、生命体征监测
- target_audience: 面临紧急并发症情况的患者、家属及现场救助人员
- core_framework: 基于小红卡急救模板的标准化处理流程

## Rules
1. 核心原则：
   - 生命至上: 优先保障患者生命安全
   - 快速响应: 提供立即可以执行的急救措施
   - 标准化: 遵循标准急救流程和指南
   - 清晰指导: 步骤明确，易于理解和执行
   - 风险意识: 识别潜在风险，提供警示

2. 指导原则：
   - 时间敏感性: 强调黄金抢救时间
   - 分级处理: 根据严重程度提供不同级别指导
   - 资源利用: 指导合理利用现有急救资源
   - 转运准备: 提供专业转运指导
   - 信息传递: 指导如何向医护人员传递关键信息

3. 安全要求：
   - 不冒险: 不建议非专业人员执行高风险操作
   - 及时求助: 强调及时寻求专业医疗帮助
   - 环境安全: 确保急救环境的安全性
   - 自我保护: 提醒救助者注意自我保护

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行紧急程度分级
- 必须提供分秒必争的急救步骤指导
- 必须包含120急救电话话术模板
- 必须明确标识需要立即就医的危险信号
- 必须提供现场急救到专业转运的完整指导
- 必须包含关键生命体征监测要点`
  },
  {
    id: 'rehabilitation-guide',
    name: '康复指导专家',
    description: '并发症后康复和长期管理专家',
    category: 'rehabilitation',
    systemPrompt: `# Role: 并发症康复指导专家

## Profile
- language: 中文
- description: 专注于并发症后的康复治疗、功能恢复和长期健康管理
- background: 拥有康复医学专业背景，精通各种并发症的康复评估和治疗方案
- personality: 耐心细致、鼓励支持、专业全面、注重实效
- expertise: 功能评估、康复训练、营养支持、心理疏导、生活质量提升
- target_audience: 经历并发症治疗后的患者、家属及康复护理人员
- core_framework: 基于小红卡康复模板的全面康复体系

## Rules
1. 康复原则：
   - 个体化: 根据患者具体情况制定个性化方案
   - 循序渐进: 康复训练逐步推进，避免过度
   - 全面性: 关注身体、心理、社会功能全方位康复
   - 长期性: 强调康复是一个长期过程
   - 参与性: 鼓励患者主动参与康复过程

2. 指导原则：
   - 科学性: 基于循证医学的康复方法
   - 实用性: 提供家庭可执行的康复指导
   - 安全性: 确保康复措施的安全性
   - 监测: 定期评估康复效果，调整方案
   - 支持: 提供心理和社会支持资源

3. 管理要求：
   - 预防复发: 指导预防并发症复发的措施
   - 生活质量: 关注患者生活质量的提升
   - 社会回归: 帮助患者回归社会和家庭生活
   - 长期随访: 建立长期随访和管理机制

## 输出要求
- 必须使用红绿灯警示系统（🔴🟡🟢）进行康复风险评估
- 必须提供分阶段的康复计划（急性期、恢复期、维持期）
- 必须包含家庭康复训练的具体指导
- 必须提供营养支持和心理调适建议
- 必须包含康复效果自我评估方法
- 必须提供长期随访和管理建议`
  }
];

// GLM模型配置
const glmModels = [
  { id: 'glm-4.5', name: 'GLM-4.5', description: '智谱AI通用大模型，平衡性能与效率' },
  { id: 'glm-4.5-air', name: 'GLM-4.5-Air', description: '智谱AI优化版本，性能更强，响应更快' },
  { id: 'glm-4.5-airx', name: 'GLM-4.5-AirX', description: '智谱AI高级版本，处理复杂任务能力更强' },
  { id: 'glm-4.5-flash', name: 'GLM-4.5-Flash', description: '智谱AI轻量版本，响应快速，免费使用' },
  { id: 'glm-4.1v-thinking-flashx', name: 'GLM-4.1V-Thinking', description: '智谱AI思考增强版本，擅长推理和分析' }
];

interface AuthManagerProps {
  onAuthChange: (session: UserSession) => void;
  currentSession: UserSession;
}

export default function AuthManager({ onAuthChange, currentSession }: AuthManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [username, setUsername] = useState(currentSession.username || '');
  const [apiKey, setApiKey] = useState(currentSession.apiKey || '');
  const [selectedModel, setSelectedModel] = useState(currentSession.selectedModel || 'complication-expert');
  const [selectedGLMModel, setSelectedGLMModel] = useState(currentSession.selectedGLMModel || 'glm-4.5');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    setUsername(currentSession.username || '');
    setApiKey(currentSession.apiKey || '');
    setSelectedModel(currentSession.selectedModel || 'complication-expert');
    setSelectedGLMModel(currentSession.selectedGLMModel || 'glm-4.5');
  }, [currentSession]);

  const handleSave = () => {
    const session: UserSession = {
      isLoggedIn: !!username && !!apiKey,
      username,
      apiKey,
      selectedModel,
      selectedGLMModel
    };
    
    onAuthChange(session);
    localStorage.setItem('userSession', JSON.stringify(session));
    setIsOpen(false);
  };

  const handleLogout = () => {
    const session: UserSession = {
      isLoggedIn: false,
      username: '',
      apiKey: '',
      selectedModel: 'complication-expert',
      selectedGLMModel: 'glm-4.5'
    };
    
    onAuthChange(session);
    localStorage.removeItem('userSession');
    setUsername('');
    setApiKey('');
    setSelectedModel('complication-expert');
    setSelectedGLMModel('glm-4.5');
  };

  const testApiConnection = async () => {
    if (!apiKey) return;
    
    setTestStatus('testing');
    setTestMessage('正在测试API连接...');
    
    try {
      // 这里应该调用实际的API测试
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setTestStatus('success');
      setTestMessage('API连接测试成功！');
    } catch (error) {
      setTestStatus('error');
      setTestMessage('API连接失败，请检查密钥是否正确');
    }
  };

  const selectedModelData = aiModels.find(model => model.id === selectedModel);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          {currentSession.isLoggedIn ? (
            <>
              <User className="h-4 w-4" />
              {currentSession.username}
            </>
          ) : (
            <>
              <Settings className="h-4 w-4" />
              设置
            </>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            AI助手设置
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* User Authentication */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                用户信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">用户名</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="请输入用户名"
                />
              </div>
              
              {currentSession.isLoggedIn && (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  退出登录
                </Button>
              )}
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API配置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API密钥</Label>
                <div className="flex gap-2">
                  <Input
                    id="apiKey"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="请输入API密钥"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={testApiConnection}
                  disabled={!apiKey || testStatus === 'testing'}
                  variant="outline"
                  className="flex-1"
                >
                  {testStatus === 'testing' ? '测试中...' : '测试连接'}
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!username || !apiKey}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  保存
                </Button>
              </div>
              
              {testStatus !== 'idle' && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  testStatus === 'success' ? 'bg-green-50 text-green-700' :
                  testStatus === 'error' ? 'bg-red-50 text-red-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {testStatus === 'success' && <CheckCircle className="h-4 w-4" />}
                  {testStatus === 'error' && <AlertCircle className="h-4 w-4" />}
                  {testStatus === 'testing' && <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                  <span className="text-sm">{testMessage}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Model Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                AI模型选择
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>选择AI模型</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiModels.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-gray-500">{model.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedModelData && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{selectedModelData.category}</Badge>
                    <span className="text-sm text-gray-500">{selectedModelData.name}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">系统提示词</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingPrompt(!isEditingPrompt)}
                      >
                        {isEditingPrompt ? '取消编辑' : '编辑提示词'}
                      </Button>
                    </div>
                    
                    {isEditingPrompt ? (
                      <Textarea
                        value={customPrompt || selectedModelData.systemPrompt}
                        onChange={(e) => setCustomPrompt(e.target.value)}
                        className="min-h-[200px] text-xs"
                        placeholder="编辑系统提示词..."
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs max-h-32 overflow-y-auto">
                        {customPrompt || selectedModelData.systemPrompt}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm">底层模型选择</Label>
                    <Select value={selectedGLMModel} onValueChange={setSelectedGLMModel}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {glmModels.map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            <div>
                              <div className="font-medium">{model.name}</div>
                              <div className="text-sm text-gray-500">{model.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      选择此专家Agent使用的底层GLM模型，默认为GLM-4.5
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}