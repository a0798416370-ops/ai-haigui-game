import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  systemPrompt: string;
  conversationHistory: DeepSeekMessage[];
  userQuestion: string;
}

function setCorsHeaders(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, conversationHistory, userQuestion } = req.body as ChatRequestBody;

  if (!systemPrompt || !userQuestion) {
    return res.status(400).json({ error: 'Missing required fields: systemPrompt, userQuestion' });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'DEEPSEEK_API_KEY not configured' });
  }

  const messages: DeepSeekMessage[] = [
    { role: 'system', content: systemPrompt },
    ...(conversationHistory ?? []),
    { role: 'user', content: userQuestion },
  ];

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
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

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: `DeepSeek API error: ${response.status}`, detail: errorText });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content as string;

    if (!content) {
      return res.status(500).json({ error: 'No content from DeepSeek API' });
    }

    return res.status(200).json({ content });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ error: 'Internal server error', detail: message });
  }
}
