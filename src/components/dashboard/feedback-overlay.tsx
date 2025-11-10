"use client";

interface FeedbackOverlayProps {
  isCorrect: boolean;
  correctAnswer: number;
}

export default function FeedbackOverlay({ isCorrect }: FeedbackOverlayProps) {
  return (
    <div
      className={`p-6 rounded-lg border-2 text-center ${
        isCorrect
          ? "bg-accent/20"
          : "bg-destructive/20 border-destructive text-destructive"
      }`}
    >
      <div className="text-4xl mb-2">{isCorrect ? "🎉" : "❌"}</div>
      <p className="text-lg font-bold mb-1">
        {isCorrect ? "Correct!" : "Incorrect!"}
      </p>
      {!isCorrect && <p className="text-sm opacity-90"></p>}
    </div>
  );
}
