export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type MessageRole = 'user' | 'assistant';
export type AIAnswer = '是' | '否' | '无关' | '你找到了';
export type MessageType = 'normal' | 'hint' | 'key_clue' | 'system';
export type GamePhase = 'idle' | 'selecting' | 'playing' | 'result';
export type AIPhase = 1 | 2;

export interface KeyPoint {
  point: string;
  importance: 'critical' | 'supporting';
}

export interface ReasoningLayer {
  layer: number;
  clue: string;
  hint: string;
}

export interface HintTemplate {
  type: 'identity' | 'emotion' | 'context' | 'time' | 'motive' | 'perspective';
  hint: string;
}

export interface Story {
  id: string;
  title: string;
  difficulty: Difficulty;
  estimated_minutes: number;
  tags: string[];
  surface: string;
  bottom: string;
  key_points: KeyPoint[];
  reasoning_path: ReasoningLayer[];
  hint_templates: HintTemplate[];
  key_clue: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  answer?: AIAnswer;
  type: MessageType;
  timestamp: number;
}

export interface ReasoningLogEntry {
  question: string;
  answer: string;
  timestamp: number;
  is_breakthrough: boolean;
}

export interface GameState {
  phase: GamePhase;
  currentStory: Story | null;
  selectedDifficulty: Difficulty | null;
  aiPhase: AIPhase;
  stuckCount: number;
  totalHints: number;
  maxHints: number;
  stuckThreshold: number;
  messages: Message[];
  reasoning_log: ReasoningLogEntry[];
  isLoading: boolean;
  isRevealed: boolean;
  endType: 'win' | 'give_up' | null;
}
