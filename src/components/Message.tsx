import { useState, useEffect } from 'react';
import type { Message } from '../types';

interface MessageProps {
  message: Message;
  isStreaming?: boolean;
}

export default function MessageBubble({ message, isStreaming = false }: MessageProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isStreaming) {
      setDisplayed(message.content);
      return;
    }

    setDisplayed('');
    const chars = message.content.split('');
    let i = 0;

    const typeNext = () => {
      if (i >= chars.length) return;

      const char = chars[i];
      i++;

      if (char === '…' && chars[i - 2] === '…') {
        setDisplayed((prev) => prev + char);
        setTimeout(typeNext, 500);
        return;
      }

      setDisplayed((prev) => prev + char);
      setTimeout(typeNext, 50);
    };

    const timer = setTimeout(typeNext, 50);
    return () => clearTimeout(timer);
  }, [message.content, isStreaming]);

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const justifyClass = isUser ? 'justify-end' : isAssistant ? 'justify-start' : 'justify-center';
  const alignClass = isUser ? 'items-end' : isAssistant ? 'items-start' : 'items-center';

  const renderBubble = () => {
    if (message.type === 'system') {
      return (
        <p className="text-slate-500 text-xs text-center py-2">
          {displayed}
        </p>
      );
    }

    if (message.type === 'key_clue') {
      return (
        <div className="flex flex-col">
          <span className="text-amber-400 text-xs mb-1">🔑 关键线索</span>
          <div className="bg-amber-900 text-amber-200 font-bold rounded-2xl px-4 py-3">
            {displayed}
            {isStreaming && (
              <span className="animate-pulse inline-block w-0.5 h-4 bg-slate-300 ml-0.5 align-middle" />
            )}
          </div>
        </div>
      );
    }

    if (message.type === 'hint') {
      return (
        <div className="flex flex-col">
          <span className="text-amber-400 text-xs mb-1">💡 主持人提示</span>
          <div className="bg-slate-700 text-slate-100 rounded-2xl px-4 py-3 border-l-4 border-amber-400">
            {displayed}
            {isStreaming && (
              <span className="animate-pulse inline-block w-0.5 h-4 bg-slate-300 ml-0.5 align-middle" />
            )}
          </div>
        </div>
      );
    }

    // normal
    const bubbleClass = isUser
      ? 'bg-blue-700 text-slate-100 rounded-2xl px-4 py-3'
      : 'bg-slate-700 text-slate-100 rounded-2xl px-4 py-3';

    return (
      <div className={bubbleClass}>
        {displayed}
        {isStreaming && (
          <span className="animate-pulse inline-block w-0.5 h-4 bg-slate-300 ml-0.5 align-middle" />
        )}
      </div>
    );
  };

  if (message.type === 'system') {
    return <div className="flex justify-center">{renderBubble()}</div>;
  }

  return (
    <div className={`flex ${justifyClass} ${alignClass} animate-fadeIn`}>
      {renderBubble()}
    </div>
  );
}
