"use client";

export default function GameFooter() {
  return (
    <footer className="border-t border-border py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>🎮 Guess Counter Game • Keep your streak alive! 🔥</p>
        <p className="mt-2 text-xs opacity-75">
          Tip: Use your lifelines wisely for the hardest questions
        </p>
      </div>
    </footer>
  );
}
