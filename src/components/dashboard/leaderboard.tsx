"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchLeaderboard, type LeaderboardEntry } from "@/lib/api";
import { Flame, Medal, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadLeaderboard = async () => {
    setLoading(true);
    const res = await fetchLeaderboard();
    if (res.success) setLeaderboard(res.leaderboard);
    setLoading(false);
  };

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const getRankIcon = (position: number) => {
    if (position === 1) return <Trophy className="w-5 h-5 text-chart-5" />;
    if (position === 2) return <Medal className="w-5 h-5 text-chart-4" />;
    if (position === 3) return <Medal className="w-5 h-5 text-chart-3" />;
    return null;
  };

  const maxScore =
    leaderboard.length > 0
      ? Math.max(...leaderboard.map((u) => u.score ?? 0))
      : 100;

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-card border-border">
        <div className="p-6 space-y-4">
          <Skeleton className="h-8 w-32" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-border px-6 py-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-foreground">Leaderboard</h2>
            <p className="text-sm text-muted-foreground">
              {leaderboard.length} players competing
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      {leaderboard.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted-foreground text-sm">No scores yet.</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {leaderboard.map((user, index) => {
            const position = index + 1;
            const scorePercentage = ((user.score ?? 0) / maxScore) * 100;

            return (
              <div
                key={user.userId}
                className="px-6 py-4 hover:bg-primary/5 transition-colors duration-200"
              >
                <div className="flex items-center gap-4">
                  {/* Rank Position */}
                  <div className="flex items-center justify-center w-10 min-w-10">
                    {getRankIcon(position) ? (
                      getRankIcon(position)
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">
                        {position}
                      </span>
                    )}
                  </div>

                  {/* User Avatar & Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate">
                        {user.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress
                          value={scorePercentage}
                          className="h-2 flex-1 max-w-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="ml-auto flex items-center gap-3 min-w-0">
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">
                        {user.score ?? 0}
                      </p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>

                    {/* Streak Badge */}
                    {(user.streak ?? 0) > 0 && (
                      <Badge className="flex items-center gap-1 bg-chart-5/20 text-chart-5 hover:bg-chart-5/30 border-0">
                        <Flame className="w-3 h-3" />
                        {user.streak ?? 0}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
