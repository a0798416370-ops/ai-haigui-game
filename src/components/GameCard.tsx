import { useNavigate } from 'react-router-dom';
import type { Story } from '../types';

interface GameCardProps {
  story: Story;
}

export default function GameCard({ story }: GameCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/game/${story.id}`);
  };

  return (
    <div
      className="bg-slate-800 rounded-lg shadow-lg p-6 cursor-pointer hover:bg-slate-700 hover:scale-105 transition-all duration-200"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
    >
      <div className="text-amber-400 mb-2">
        {'★'.repeat(story.difficulty)}
      </div>

      <h3 className="text-slate-100 font-bold text-lg mb-3">
        {story.title}
      </h3>

      <div className="flex flex-wrap gap-2 mb-3">
        {story.tags.map((tag) => (
          <span
            key={tag}
            className="bg-slate-600 text-slate-300 text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="text-slate-400 text-sm mb-4">
        约 {story.estimated_minutes} 分钟
      </div>

      <div className="flex justify-end">
        <span className="text-slate-400 text-xl">→</span>
      </div>
    </div>
  );
}
