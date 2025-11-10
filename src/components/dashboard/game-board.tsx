"use client";

import { Card } from "@/components/ui/card";
import { HeartApiResponse } from "@/types/api";
import { useState } from "react";
import { Spinner } from "../loader";
import AnswerInput from "./answer-input";
import FeedbackOverlay from "./feedback-overlay";
import QuestionCard from "./question-card";

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
    null,
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    if (!apiResponse?.solution || userAnswer === "") return;

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

  return (
    <div className="w-full max-w-2xl">
      <div className="grid gap-6">
        <Card className="bg-card border-border p-8">
          <div className="space-y-6">
            <QuestionCard questionUrl={apiResponse?.question} />

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
