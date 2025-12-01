import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GameState {
  score: number;
  streak: number;
  setScore: (score: number) => void;
  setStreak: (streak: number) => void;
  incrementScore: (points: number) => void;
  incrementStreak: () => void;
  reset: () => void;
}

export const useGameStore = create(
  persist<GameState>(
    (set) => ({
      score: 0,
      streak: 0,
      setScore: (score) => set({ score }),
      setStreak: (streak) => set({ streak }),
      incrementScore: (points) =>
        set((state) => ({ score: state.score + points })),
      incrementStreak: () => set((state) => ({ streak: state.streak + 1 })),
      reset: () => set({ score: 0, streak: 0 }),
    }),
    {
      name: "game-storage",
    },
  ),
);
