"use client";

import GameBoard from "@/components/dashboard/game-board";
import GameFooter from "@/components/dashboard/game-footer";
import GameHeader from "@/components/dashboard/game-header";
import Leaderboard from "@/components/dashboard/leaderboard";
import { getHeartApi, saveGame } from "@/lib/api";
import { useGameStore } from "@/store/gameStore";
import { HeartApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<HeartApiResponse | null>(null);
  const { score, streak, incrementScore, incrementStreak, reset } =
    useGameStore();
  useEffect(() => {
    const fetchHearApiFucntion = async () => {
      try {
        const response = await getHeartApi();
        setApiResponse(response);
      } catch (error) {
        console.error("Error fetching Heart API:", error);
      }
    };
    fetchHearApiFucntion();
  }, []);

  const onCorrect = async () => {
    incrementScore(10);
    incrementStreak();

    // Save current game progress
    await saveGame(score + 10, streak + 1);

    // Next question
    const response = await getHeartApi();
    setApiResponse(response);
  };

  const onIncorrect = async () => {
    // Next question
    const response = await getHeartApi();
    setApiResponse(response);

    // Save zeroed game progress
    await saveGame(0, 0);
    reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GameHeader score={score} streak={streak} />
      <main className="flex-1 flex flex-col md:flex-row items-start justify-center px-4 py-8 md:py-12 gap-8">
        <div className="flex-1 max-w-2xl">
          <GameBoard
            apiResponse={apiResponse}
            onCorrect={onCorrect}
            onIncorrect={onIncorrect}
          />
        </div>

        <div className="w-full md:w-80 flex-shrink-0">
          <Leaderboard />
        </div>
      </main>
      <GameFooter />
    </div>
  );
}
