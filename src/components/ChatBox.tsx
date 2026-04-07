import { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import Message from './Message';
import { buildSystemPrompt } from '../utils/promptBuilder';
import { callDeepSeek } from '../utils/deepseek';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    totalHints,
    maxHints,
    currentStory,
    addMessage,
    updateAfterAnswer,
    setLoading,
  } = useGameStore();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend() {
    if (!input.trim() || isLoading || !currentStory) return;
    const question = input.trim();
    setInput('');
    setLoading(true);

    addMessage({
      id: crypto.randomUUID(),
      role: 'user',
      content: question,
      type: 'normal',
      timestamp: Date.now(),
    });

    const systemPrompt = buildSystemPrompt({
      story: currentStory,
      aiPhase: useGameStore.getState().aiPhase,
    });

    const history = messages.map((m) => ({ role: m.role, content: m.content }));

    const aiContent = await callDeepSeek({
      systemPrompt,
      conversationHistory: history,
      userQuestion: question,
    });

    const { aiPhase: currentAiPhase, totalHints: currentHints, maxHints: currentMax } = useGameStore.getState();
    const msgType =
      currentHints >= currentMax ? 'key_clue' : currentAiPhase === 2 ? 'hint' : 'normal';

    addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: aiContent,
      type: msgType,
      timestamp: Date.now(),
    });

    updateAfterAnswer(aiContent);
    setLoading(false);

    if (aiContent.includes('你找到了')) {
      setTimeout(() => useGameStore.getState().revealBottom(), 1500);
    }
  }

  function handleHint() {
    const { triggerHint, triggerKeyClue, totalHints: hints, maxHints: max, currentStory: story } = useGameStore.getState();
    if (hints >= max) {
      triggerKeyClue();
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: story!.key_clue,
        type: 'key_clue',
        timestamp: Date.now(),
      });
    } else {
      triggerHint();
    }
  }

  const remainingHints = maxHints - totalHints;
  const isHintDepleted = remainingHints <= 0;

  return (
    <div className="flex flex-col h-full">
      {/* 汤面置顶 */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex-shrink-0">
        <span className="text-slate-400 text-xs mb-1 block">📖 汤面</span>
        <p className="text-slate-100 text-sm leading-relaxed">
          {currentStory?.surface ?? ''}
        </p>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, idx) => {
          const isLastAssistant =
            idx === messages.length - 1 && msg.role === 'assistant';
          return (
            <Message
              key={msg.id}
              message={msg}
              isStreaming={isLastAssistant ? isLoading : false}
            />
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* 底部操作栏 */}
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 border-t border-slate-700 flex-shrink-0">
        <button
          className={
            isHintDepleted
              ? 'text-amber-600 border border-amber-600 rounded-lg px-3 py-3 text-sm whitespace-nowrap disabled:opacity-50'
              : 'text-amber-400 border border-amber-400 rounded-lg px-3 py-3 text-sm whitespace-nowrap disabled:opacity-50'
          }
          disabled={isLoading}
          onClick={handleHint}
        >
          {isHintDepleted ? '获取关键线索' : `求助（剩余 ${remainingHints} 次）`}
        </button>

        <input
          type="text"
          className="flex-1 bg-slate-700 text-slate-100 rounded-lg px-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
          placeholder={isLoading ? 'AI 正在回答中…' : '输入你的问题，按回车发送…'}
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg px-4 py-3 transition-colors disabled:opacity-50"
          disabled={isLoading || !input.trim()}
          onClick={handleSend}
        >
          {isLoading ? '…' : '发送'}
        </button>
      </div>
    </div>
  );
}
