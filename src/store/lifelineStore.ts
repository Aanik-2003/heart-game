import { create } from "zustand";

interface LifelineState {
  lifelines: number;
  nextRechargeUtc: string | null;
  setLifeData: (data: {
    lifelines: number;
    nextRechargeUtc: string | null;
  }) => void;
}

export const useLifeStore = create<LifelineState>((set) => ({
  lifelines: 3,
  nextRechargeUtc: null,

  setLifeData: (data) =>
    set({ lifelines: data.lifelines, nextRechargeUtc: data.nextRechargeUtc }),
}));
