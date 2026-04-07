import { create } from 'zustand';
import type { Difficulty, GameState, Message, Story } from '../types';

interface GameActions {
  startGame: (story: Story, difficulty: Difficulty) => void;
  addMessage: (message: Message) => void;
  updateAfterAnswer: (content: string) => void;
  setLoading: (loading: boolean) => void;
  triggerHint: () => void;
  triggerKeyClue: () => void;
  revealBottom: (type: 'win' | 'give_up') => void;
  resetGame: () => void;
}

type GameStore = GameState & GameActions;

const initialState: GameState = {
  phase: 'idle',
  currentStory: null,
  selectedDifficulty: null,
  aiPhase: 1,
  stuckCount: 0,
  totalHints: 0,
  maxHints: 3,
  stuckThreshold: 5,
  messages: [],
  reasoning_log: [],
  isLoading: false,
  isRevealed: false,
  endType: null,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: (story: Story, difficulty: Difficulty) => {
    set({
      phase: 'playing',
      currentStory: story,
      selectedDifficulty: difficulty,
      aiPhase: 1,
      stuckCount: 0,
      totalHints: 0,
      maxHints: 3,
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: story.surface,
          type: 'system',
          timestamp: Date.now(),
        },
      ],
      reasoning_log: [],
      isLoading: false,
      isRevealed: false,
      endType: null,
    });
  },

  addMessage: (message: Message) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },

  updateAfterAnswer: (content: string) => {
    const { stuckCount, stuckThreshold } = get();
    if (content.includes('是')) {
      set({ stuckCount: 0 });
    } else {
      const newStuck = stuckCount + 1;
      set({
        stuckCount: newStuck,
        aiPhase: newStuck >= stuckThreshold ? 2 : get().aiPhase,
      });
    }
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  triggerHint: () => {
    const { currentStory, totalHints, maxHints } = get();
    if (!currentStory || totalHints >= maxHints) return;
    const hintIndex = totalHints;
    const template = currentStory.hint_templates[hintIndex];
    if (!template) return;
    set((state) => ({ totalHints: state.totalHints + 1 }));
    get().addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: template.hint,
      type: 'hint',
      timestamp: Date.now(),
    });
  },

  triggerKeyClue: () => {
    const { currentStory } = get();
    if (!currentStory) return;
    get().addMessage({
      id: crypto.randomUUID(),
      role: 'assistant',
      content: currentStory.key_clue,
      type: 'key_clue',
      timestamp: Date.now(),
    });
  },

  revealBottom: (type: 'win' | 'give_up') => {
    set({ isRevealed: true, phase: 'result', endType: type });
  },

  resetGame: () => {
    set(initialState);
  },
}));
