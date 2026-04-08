import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import type { Story } from '../types';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { messages, reasoning_log, resetGame } = useGameStore();

  const endType = (location.state?.endType ?? useGameStore.getState().endType) as 'win' | 'give_up' | undefined;

  const storyData = (location.state?.story ?? useGameStore.getState().currentStory) as Story | null;
  const totalQuestions = (location.state?.totalQuestions ?? messages.filter((m) => m.role === 'user').length) as number;
  const hintsUsed = (location.state?.hintsUsed ?? useGameStore.getState().totalHints) as number;

  const [showFull, setShowFull] = useState(false);
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    if (!storyData) return;
    const t = setTimeout(() => setShowFull(true), 3000);
    return () => clearTimeout(t);
  }, [storyData]);

  if (!storyData || !endType) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 mb-4">数据加载失败</p>
          <button
            onClick={() => navigate('/')}
            className="bg-amber-500 text-slate-900 px-6 py-3 rounded-lg font-bold"
          >
            返回大厅
          </button>
        </div>
      </div>
    );
  }

  const breakthroughs = reasoning_log.filter((e) => e.is_breakthrough);

  const rating =
    hintsUsed === 0 ? '🔥 独立破案' :
    hintsUsed === 1 ? '⭐ 小试牛刀' :
    hintsUsed === 2 ? '💡 稳步推理' :
    '🐢 龟速前进';

  const resultLabel = endType === 'win' ? '胜利推理' : '放弃查看';

  const criticalPoints = storyData.key_points.filter(
    (k) => k.importance === 'critical'
  );

  const handleRestart = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4 py-10 flex flex-col items-center">
      {/* 1. 结果标题区域 */}
      <div className="w-full max-w-2xl mb-8 text-center">
        <h1 className={endType === 'win'
          ? 'text-amber-400 text-2xl font-bold'
          : 'text-slate-300 text-2xl font-bold'}>
          {endType === 'win' ? '🎉 你找到了真相！' : '真相揭晓'}
        </h1>
        <p className="text-slate-500 text-sm mt-2">{storyData.title}</p>
      </div>

      {/* 2. 汤底分层揭示区域 */}
      <div className="w-full max-w-2xl mb-8">
        {/* 关键谜点 */}
        <div className="space-y-3 mb-4">
          {criticalPoints.map((point, idx) => (
            <div key={idx} className="bg-slate-800 rounded-xl px-5 py-4">
              <p className="text-amber-300">
                🔑 {point.point}
              </p>
              {!showFull && (
                <div className="h-3 mt-2 bg-slate-700 rounded blur-sm" />
              )}
            </div>
          ))}
        </div>

        {/* 完整汤底 */}
        {showFull ? (
          <div className="bg-slate-800 rounded-lg p-6 text-slate-100 leading-relaxed transition-all duration-700">
            {storyData.bottom}
          </div>
        ) : (
          <button
            className="w-full py-3 rounded-lg border border-slate-700 text-slate-500 text-sm hover:border-slate-500 hover:text-slate-300 transition-colors"
            onClick={() => setShowFull(true)}
          >
            揭示完整真相
          </button>
        )}
      </div>

      {/* 3. 本局统计 */}
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4 mb-8">
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-amber-400 text-2xl font-bold">{totalQuestions}</p>
          <p className="text-slate-400 text-xs mt-1">总提问数</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-amber-400 text-2xl font-bold">{breakthroughs.length}</p>
          <p className="text-slate-400 text-xs mt-1">有效突破</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-amber-400 text-2xl font-bold">{hintsUsed}</p>
          <p className="text-slate-400 text-xs mt-1">使用引导</p>
        </div>
        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-amber-400 text-lg font-bold leading-tight">{rating}</p>
          <p className="text-slate-400 text-xs mt-1">{resultLabel}</p>
        </div>
      </div>

      {/* 4. 推理路径回顾（可折叠） */}
      <div className="w-full max-w-2xl mb-10">
        <p className="text-slate-500 text-sm cursor-pointer hover:text-slate-300 transition-colors"
           onClick={() => setShowLog((v) => !v)}>
          {showLog ? '收起 ▲' : '查看推理路径 ▼'}
        </p>
        {showLog && (
          <div className="mt-3 space-y-2">
            {breakthroughs.length === 0 ? (
              <p className="text-slate-600 text-sm">暂无有效突破记录。</p>
            ) : (
              breakthroughs.map((entry, idx) => (
                <p key={idx} className="text-amber-300 text-sm">
                  Q：{entry.question} &nbsp;→&nbsp; A：{entry.answer}
                </p>
              ))
            )}
          </div>
        )}
      </div>

      {/* 底部操作按钮 */}
      <div className="flex flex-col items-center gap-3">
        <button
          className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg px-6 py-3 transition-colors"
          onClick={handleRestart}
        >
          再来一局
        </button>
        <button
          className="text-slate-400 hover:text-slate-100 underline text-sm"
          onClick={() => navigate('/')}
        >
          返回大厅
        </button>
      </div>
    </div>
  );
}
