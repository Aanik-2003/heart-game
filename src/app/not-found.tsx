"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Gamepad2, Zap } from "lucide-react";

export default function NotFound() {
  const [floatingItems, setFloatingItems] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  useEffect(() => {
    // Generate random floating items for visual interest
    const items = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingItems(items);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 relative overflow-hidden flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingItems.map((item) => (
          <div
            key={item.id}
            className="absolute w-2 h-2 rounded-full bg-primary/20 animate-pulse"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              animation: `float ${3 + item.id}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
        {/* Game Icon Animation */}
        <div className="flex justify-center">
          <div className="relative w-32 h-32 md:w-40 md:h-40">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <Gamepad2 className="w-20 h-20 md:w-24 md:h-24 text-primary animate-bounce" />
            </div>

            {/* Orbiting elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-full h-full animate-spin"
                style={{ animationDuration: "4s" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-7xl md:text-8xl font-bold text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              Game Over!
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            This level doesnt exist... yet! You have wandered into uncharted
            territory. Time to respawn and get back in the game.
          </p>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-3 gap-4 py-8 px-6 rounded-xl bg-muted/50 backdrop-blur-sm border border-border/50">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-accent">—</div>
            <div className="text-xs text-muted-foreground">Streak Lost</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-destructive">✕</div>
            <div className="text-xs text-muted-foreground">Page Found</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto group">
              <Home className="w-5 h-5 mr-2" />
              Return to Game
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-border hover:bg-muted/50 transition-colors font-medium flex items-center justify-center gap-2 group"
          >
            <Zap className="w-5 h-5" />
            Go Back
            <span className="text-xs ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Last checkpoint
            </span>
          </button>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-muted-foreground pt-8 border-t border-border/30">
          Error Code: 404 • Page Not Found • Try respawning or contact support
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
