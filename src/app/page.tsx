"use client";

import GameBoard from "@/components/dashboard/game-board";
import GameFooter from "@/components/dashboard/game-footer";
import GameHeader from "@/components/dashboard/game-header";
import Leaderboard from "@/components/dashboard/leaderboard";
import {
  fetchLifelines,
  getHeartApi,
  saveGame,
  consumeLifeline,
} from "@/lib/api";
import { useGameStore } from "@/store/gameStore";
import { useLifeStore } from "@/store/lifelineStore";
import { HeartApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<HeartApiResponse | null>(null);
  const { score, streak, incrementScore, incrementStreak, reset } =
    useGameStore();
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(0);

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

  useEffect(() => {
    const loadLife = async () => {
      const data = await fetchLifelines();
      console.log("lifeline data", data);
      useLifeStore.getState().setLifeData(data);
    };

    loadLife();
  }, []);

  const onCorrect = async () => {
    incrementScore(10);
    incrementStreak();

    // Save current game progress
    await saveGame(score + 10, streak + 1);

    // Next question
    const response = await getHeartApi();
    setApiResponse(response);
    setRefreshLeaderboard((prev) => prev + 1); // Trigger leaderboard refresh
  };

  const onIncorrect = async () => {
    try {
      const data = await consumeLifeline(); // POST API call
      console.log("consumed lifeline", data);

      if (data.success && data.lifelines !== undefined) {
        console.log("success consuming, lifelines remaining:", data.lifelines);

        // Lifeline used → DO NOT reset score or streak
        useLifeStore.getState().setLifeData({
          lifelines: data.lifelines,
          nextRechargeUtc: data.nextRechargeUtc || null,
        });

        // Next question
        const response = await getHeartApi();
        setApiResponse(response);
      } else {
        // No lifelines → reset game
        console.log("no lifelines left, resetting game");
        useLifeStore.getState().setLifeData({
          lifelines: 0,
          nextRechargeUtc: null,
        });
        reset();
        await saveGame(0, 0);

        // Next question
        const response = await getHeartApi();
        setApiResponse(response);
      }
    } catch (err) {
      console.error("Error using lifeline:", err);
    }
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
          <Leaderboard refreshTrigger={refreshLeaderboard} />
        </div>
      </main>
      <GameFooter />
    </div>
  );
}
