import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the current session
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Not logged in" });
    }

    const { score, streak } = await req.json();

    // Save game history
    const game = await prisma.gameHistory.create({
      data: {
        userId: session.user.id,
        score,
        streak,
      },
    });

    return NextResponse.json({ success: true, game });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Failed to save game" });
  }
}

export async function GET() {
  try {
    // Fetch top score/streak per user
    const topGames = await prisma.gameHistory.groupBy({
      by: ["userId"],
      _max: { score: true, streak: true },
    });

    const leaderboard = await Promise.all(
      topGames.map(async (g) => {
        const user = await prisma.user.findUnique({ where: { id: g.userId } });
        return {
          userId: g.userId,
          name: user?.name ?? "Unknown",
          score: g._max.score,
          streak: g._max.streak,
        };
      }),
    );

    // Sort descending by score
    leaderboard.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

    return NextResponse.json({ success: true, leaderboard });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch leaderboard",
    });
  }
}
