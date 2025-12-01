"use client";

import { Card } from "@/components/ui/card";
import { HeartApiResponse } from "@/types/api";
import { useState, useEffect } from "react";
import { Spinner } from "../loader";
import AnswerInput from "./answer-input";
import FeedbackOverlay from "./feedback-overlay";
import QuestionCard from "./question-card";
import { useLifeStore } from "@/store/lifelineStore";

interface GameBoardProps {
  apiResponse: HeartApiResponse | null;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function GameBoard({
  apiResponse,
  onCorrect,
  onIncorrect,
}: GameBoardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const { lifelines, nextRechargeUtc } = useLifeStore();
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (!nextRechargeUtc || lifelines >= 3) {
      setCountdown("");
      return;
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = new Date(nextRechargeUtc).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("Ready!");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [nextRechargeUtc, lifelines]);

  const handleSubmit = () => {
    if (userAnswer.trim() === "") return;

    const solution = apiResponse?.solution;
    if (solution === undefined || solution === null) return;

    const isCorrect = Number.parseInt(userAnswer) === apiResponse?.solution;
    console.log("asdfsdaf", isCorrect);

    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      onCorrect();
      setLoading(false);
      setUserAnswer("");
      setFeedback("correct");
    } else {
      onIncorrect();
    }
  };

  if (!apiResponse) {
    return <Spinner />;
  }

  console.log("lifelines in game board", lifelines);

  return (
    <div className="w-full max-w-2xl">
      <div className="grid gap-6">
        <Card className="bg-card border-border p-8">
          <div className="space-y-6">
            <QuestionCard questionUrl={apiResponse?.question} />
            {/* Lifelines UI */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {Array.from({ length: lifelines }, (_, i) => (
                  <span key={i} className="text-2xl text-red-500">
                    ❤️
                  </span>
                ))}
              </div>
              {countdown && lifelines < 3 && (
                <div className="text-sm text-muted-foreground">
                  Next lifeline in:{" "}
                  <span className="font-medium">{countdown}</span>
                </div>
              )}
            </div>
            <AnswerInput
              value={userAnswer}
              onChange={setUserAnswer}
              onSubmit={handleSubmit}
              disabled={loading || feedback !== null}
              placeholder="Enter your answer"
            />

            {feedback && (
              <FeedbackOverlay
                isCorrect={feedback === "correct"}
                correctAnswer={apiResponse.solution}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
