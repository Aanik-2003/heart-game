"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface GameHeaderProps {
  score: number;
  streak: number;
}

export default function GameHeader({ score, streak }: GameHeaderProps) {
  const handleLogout = () => {
    console.log("log out btn pressed");
  };

  return (
    <header className="border-b border-border bg-card/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold ">🎮</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Guess Counter</h1>
            <p className="text-xs text-muted-foreground">
              Count the heart correctly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Score</p>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="text-center">
            <p className="text-muted-foreground text-sm">Streak</p>
            <p className={`text-3xl font-bold`}>{streak}</p>
          </div>
        </div>
        <Button onClick={handleLogout}>
          <span>Log out</span>
          <LogOut className="ml-2 inline-block" size={16} />
        </Button>
      </div>
    </header>
  );
}
