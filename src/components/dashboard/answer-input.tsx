"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AnswerInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
  isCorrect?: boolean;
}

export default function AnswerInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder,
}: AnswerInputProps) {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !disabled) {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-3">
      <Input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 h-12 text-lg font-semibold"
        min="0"
        max="99"
      />
      <Button
        onClick={onSubmit}
        className="px-8 h-12 text-base font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
      >
        Submit
      </Button>
    </div>
  );
}
