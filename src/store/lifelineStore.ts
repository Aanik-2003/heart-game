import { create } from "zustand";

const MAX_LIFELINES = Number(process.env.NEXT_PUBLIC_MAX_LIFELINES) || 5;

interface LifelineState {
  lifelines: number;
  nextRechargeUtc: string | null;
  maxLifelines: number;
  setLifeData: (data: {
    lifelines: number;
    nextRechargeUtc: string | null;
  }) => void;
}

export const useLifeStore = create<LifelineState>((set) => ({
  lifelines: MAX_LIFELINES,
  nextRechargeUtc: null,
  maxLifelines: MAX_LIFELINES,
  setLifeData: (data) =>
    set({ lifelines: data.lifelines, nextRechargeUtc: data.nextRechargeUtc }),
}));
