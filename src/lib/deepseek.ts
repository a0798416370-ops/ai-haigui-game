const API_BASE = import.meta.env.DEV
  ? ''
  : 'https://ai-haigui-game-iota.vercel.app';

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
  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemPrompt, conversationHistory, userQuestion }),
    });
  } catch (networkError) {
    throw new Error('网络连接失败，请检查网络后重试');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`AI 服务异常（${res.status}）: ${err.error ?? res.statusText}`);
  }

  const data = await res.json();
  return data.content as string;
}
