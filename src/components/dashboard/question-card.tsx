"use client";

import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

interface QuestionCardProps {
  questionUrl: string;
}

export default function QuestionCard({ questionUrl }: QuestionCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="overflow-hidden border-border bg-muted/30">
      <div className="aspect-video flex items-center justify-center from-muted to-muted/50 relative">
        {!imageError ? (
          <Image
            src={questionUrl || "/placeholder.svg"}
            alt="Question"
            className="w-full h-full object-contain p-4"
            onError={() => setImageError(true)}
            crossOrigin="anonymous"
            fill
            priority
            sizes="100"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-4xl">🖼️</div>
            <p className="text-muted-foreground text-sm">
              Image could not load
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-border bg-card/50">
        <p className="text-center text-foreground font-medium">
          How many hearts are in the image?
        </p>
      </div>
    </Card>
  );
}
