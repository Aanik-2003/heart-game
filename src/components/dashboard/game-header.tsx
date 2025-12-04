"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-actions";
import { useGameStore } from "@/store/gameStore";

interface GameHeaderProps {
  score: number;
  streak: number;
}

export default function GameHeader({ score, streak }: GameHeaderProps) {
  const router = useRouter();
  const { reset } = useGameStore();
  const handleLogout = async () => {
    try {
      const response = await signOut();

      if (response.success) {
        toast.success("Logged out successfully!");
        reset();
        router.push("/login");
      } else {
        toast.error(response.error || "Logout failed");
      }
    } catch (err) {
      toast.error("Something went wrong during logout");
      console.error(err);
    }
  };

  return (
    <header className="border-b border-border bg-card/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 flex flex-wrap gap-6 items-center justify-between">
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
