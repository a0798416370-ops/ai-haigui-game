import { stories } from '../data/stories';
import GameCard from '../components/GameCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="border-t border-slate-700" />

      <div className="py-16 px-6 text-center">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">
          AI 海龟汤
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          每一个故事，都藏着一个你意想不到的真相。通过提问，找到它。
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <GameCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
}
