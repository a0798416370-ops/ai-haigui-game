import type { Difficulty } from '../types';

interface DifficultySelectorProps {
  onConfirm: (d: Difficulty) => void;
}

const difficulties: Difficulty[] = [1, 2, 3, 4, 5];

export default function DifficultySelector({ onConfirm }: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-slate-300 text-sm text-center">
        请选择难度（1=简单，5=极难）
      </p>
      <div className="flex gap-3">
        {difficulties.map((d) => (
          <button
            key={d}
            className="text-amber-400 text-2xl hover:scale-110 transition-transform"
            onClick={() => onConfirm(d)}
            title={`难度 ${d}`}
          >
            ⭐
          </button>
        ))}
      </div>
    </div>
  );
}
