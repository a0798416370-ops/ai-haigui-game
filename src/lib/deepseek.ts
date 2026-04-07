const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface CallDeepSeekParams {
  systemPrompt: string;
  conversationHistory: DeepSeekMessage[];
  userQuestion: string;
}

export async function callDeepSeek({
  systemPrompt,
  conversationHistory,
  userQuestion,
}: CallDeepSeekParams): Promise<string> {
  const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error('VITE_DEEPSEEK_API_KEY 未配置，请检查 .env.local 文件');
  }

  const messages: DeepSeekMessage[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: userQuestion },
  ];

  let res: Response;
  try {
    res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature: 0.7,
        max_tokens: 150,
      }),
    });
  } catch (networkError) {
    throw new Error('网络连接失败，请检查网络后重试');
  }

  if (res.status === 401) {
    throw new Error('API Key 无效，请检查 VITE_DEEPSEEK_API_KEY 配置');
  }
  if (res.status === 429) {
    throw new Error('请求过于频繁，请稍后再试');
  }
  if (!res.ok) {
    throw new Error(`AI 服务异常（${res.status}），请稍后再试`);
  }

  const data = await res.json();
  return data.choices[0].message.content as string;
}
