"use client";

import GameBoard from "@/components/dashboard/game-board";
import GameFooter from "@/components/dashboard/game-footer";
import GameHeader from "@/components/dashboard/game-header";
import { getHeartApi } from "@/lib/api";
import { HeartApiResponse } from "@/types/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<HeartApiResponse | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

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
    setScore((prev) => prev + 10);
    setStreak((prev) => prev + 1);

    try {
      const response = await getHeartApi();
      console.log("Next Question:", response?.question);
      setApiResponse(response);
    } catch (error) {
      console.error("Error fetching next question:", error);
    }
  };

  const onIncorrect = () => {
    setStreak(0);
    setScore(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <GameHeader score={score} streak={streak} />
      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <GameBoard
          apiResponse={apiResponse}
          onCorrect={onCorrect}
          onIncorrect={onIncorrect}
        />
      </main>
      <GameFooter />
    </div>
  );
}
