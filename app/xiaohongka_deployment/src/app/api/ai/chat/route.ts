import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface AIModel {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  category: string;
}

const aiModels: AIModel[] = [
  {
    id: 'medical-expert',
    name: '医疗专家',
    description: '专业的医疗知识问答',
    category: 'general',
    systemPrompt: `你是一位专业的医疗专家，拥有丰富的临床经验和医学知识。请根据用户的问题提供专业、准确的医疗建议。

回答原则：
1. 基于权威医学知识回答问题
2. 对于紧急情况，优先建议立即就医
3. 提供清晰、实用的建议
4. 适当解释医学术语
5. 强调专业医疗诊断的重要性

请用中文回答，保持专业但易懂的语调。`
  },
  {
    id: 'emergency-guide',
    name: '急救指导',
    description: '紧急情况处理指导',
    category: 'emergency',
    systemPrompt: `你是一位专业的急救指导专家，专门提供紧急医疗情况的处理指导。

回答原则：
1. 优先提供立即可以采取的急救措施
2. 步骤清晰、易于理解和执行
3. 强调何时需要立即拨打急救电话
4. 提供重要的注意事项和禁忌
5. 在回答末尾强调专业医疗救助的重要性

请用中文回答，语调要冷静、专业，让用户在紧急情况下能够清晰理解。`
  },
  {
    id: 'health-advisor',
    name: '健康顾问',
    description: '日常健康咨询建议',
    category: 'general',
    systemPrompt: `你是一位专业的健康顾问，专注于提供日常健康咨询和预防保健建议。

回答原则：
1. 提供科学、实用的健康建议
2. 强调预防胜于治疗的理念
3. 建议健康的生活方式和习惯
4. 适当提供营养和运动建议
5. 对于症状问题，建议及时就医

请用中文回答，保持友好、专业的语调，鼓励用户养成健康的生活习惯。`
  },
  {
    id: 'surgical-care',
    name: '术后护理',
    description: '手术后护理专业指导',
    category: 'specialized',
    systemPrompt: `你是一位专业的术后护理专家，专注于手术后的护理指导和康复建议。

回答原则：
1. 提供专业的术后护理指导
2. 关注伤口护理、疼痛管理、营养支持等
3. 识别并警示可能的并发症
4. 提供康复训练和生活方式调整建议
5. 强调遵医嘱的重要性

请用中文回答，保持专业、细致的语调，关注患者的全面康复。`
  },
  {
    id: 'chronic-disease',
    name: '慢病管理',
    description: '慢性疾病管理专家',
    category: 'specialized',
    systemPrompt: `你是一位慢性疾病管理专家，专注于糖尿病、高血压、心脏病等慢性疾病的长期管理。

回答原则：
1. 提供科学的慢病管理知识
2. 强调药物治疗和生活方式管理的结合
3. 提供自我监测和随访建议
4. 关注并发症预防和心理健康
5. 鼓励患者积极参与疾病管理

请用中文回答，保持耐心、专业的语调，为长期健康管理提供支持。`
  },
  {
    id: 'medication-guide',
    name: '用药指导',
    description: '药物使用和安全指导',
    category: 'specialized',
    systemPrompt: `你是一位药物使用和安全指导专家，专注于提供准确的用药信息和安全指导。

回答原则：
1. 提供准确的药物信息和使用指导
2. 强调用药安全和注意事项
3. 提醒可能的副作用和相互作用
4. 强调遵医嘱用药的重要性
5. 提供药物储存和管理建议

请用中文回答，保持严谨、专业的语调，确保用药安全信息的准确性。`
  }
];

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  modelId: string;
  glmModel?: string;
  apiKey?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { messages, modelId, glmModel, apiKey } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const selectedModel = aiModels.find(m => m.id === modelId) || aiModels[0];
    
    // 构建完整的消息历史
    const completeMessages: ChatMessage[] = [
      {
        role: 'system',
        content: selectedModel.systemPrompt
      },
      ...messages
    ];

    try {
      // 初始化ZAI SDK
      const zai = await ZAI.create();
      
      // 先尝试非流式调用获取完整响应
      const completion = await zai.chat.completions.create({
        messages: completeMessages,
        model: glmModel || 'glm-4.5', // 使用指定的GLM模型，默认为glm-4.5
        temperature: 0.7,
        max_tokens: 2000
      });

      const response = completion.choices[0]?.message?.content || '';
      
      // 模拟流式响应，将完整内容分块发送
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      const encoder = new TextEncoder();

      // 模拟流式数据发送
      (async () => {
        try {
          // 将响应内容分成小块发送
          const chunkSize = 5; // 每次发送5个字符
          for (let i = 0; i < response.length; i += chunkSize) {
            const chunk = response.slice(i, i + chunkSize);
            await writer.write(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
            // 添加小延迟模拟真实的流式效果
            await new Promise(resolve => setTimeout(resolve, 20));
          }
          await writer.write(encoder.encode('data: [DONE]\n\n'));
          await writer.close();
        } catch (error) {
          console.error('Stream processing error:', error);
          await writer.write(encoder.encode(`data: ${JSON.stringify({ error: 'Stream processing failed' })}\n\n`));
          await writer.close();
        }
      })();

      return new Response(stream.readable, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (aiError) {
      console.error('AI API Error:', aiError);
      return NextResponse.json(
        { 
          error: 'AI调用失败',
          details: aiError instanceof Error ? aiError.message : '未知错误'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: '请求处理失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    models: aiModels.map(model => ({
      id: model.id,
      name: model.name,
      description: model.description,
      category: model.category
    }))
  });
}