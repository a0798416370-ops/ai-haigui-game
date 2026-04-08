import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stories } from '../data/stories';
import { useGameStore } from '../store/gameStore';
import DifficultySelector from '../components/DifficultySelector';
import ChatBox from '../components/ChatBox';
import type { Difficulty } from '../types';

export default function Game() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const { phase } = useGameStore();

  const story = stories.find((s) => s.id === id);

  useEffect(() => {
    if (phase === 'result') {
      navigate('/result', { state: { endType: 'give_up' } });
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      useGameStore.getState().resetGame();
    };
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">
          故事不存在，<button className="underline" onClick={() => navigate('/')}>返回大厅</button>
        </p>
      </div>
    );
  }

  if (difficulty === null) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <DifficultySelector
          onConfirm={(d) => {
            setDifficulty(d);
            useGameStore.getState().startGame(story, d);
          }}
        />
      </div>
    );
  }

  const stars = '⭐'.repeat(difficulty);

  return (
    <div className="flex flex-col h-screen">
      {/* 顶部导航栏 */}
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <button
          className="text-slate-400 hover:text-slate-100 text-sm"
          onClick={() => navigate('/')}
        >
          ← 大厅
        </button>
        <span className="text-slate-100 font-bold truncate max-w-[120px]">{story.title}</span>
        <span className="text-amber-400 text-sm">{stars}</span>
      </div>

      {/* 中间 ChatBox */}
      <div className="flex-1 overflow-hidden">
        <ChatBox />
      </div>

      {/* 底部操作栏 */}
      <div className="bg-slate-800 border-t border-slate-700 px-4 py-3 text-center flex-shrink-0">
        <button
          className="text-slate-500 hover:text-slate-300 text-sm underline"
          onClick={() => useGameStore.getState().revealBottom('give_up')}
        >
          放弃推理，查看真相
        </button>
      </div>
    </div>
  );
}
