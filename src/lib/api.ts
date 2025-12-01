import { HeartApiResponse } from "@/types/api";
import { AxiosError } from "axios";
import apiClient from "./apiHepler";

export interface LeaderboardEntry {
  userId: string;
  name: string;
  score: number | null;
  streak: number | null;
}

export const getHeartApi = async (): Promise<HeartApiResponse> => {
  try {
    const response = await apiClient.get("heart/api.php?out=json");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const msg = error.response?.data?.message || error.message;
      throw new Error(msg);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export async function saveGame(score: number, streak: number) {
  const res = await fetch("/api/game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ score, streak }),
    credentials: "include",
  });

  return res.json();
}

export async function fetchLeaderboard(): Promise<{
  success: boolean;
  leaderboard: LeaderboardEntry[];
}> {
  const res = await fetch("/api/game");
  return res.json();
}
