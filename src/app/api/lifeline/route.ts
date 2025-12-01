import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getLifelines, useLifeline as lifelineService } from "@/lib/lifeline";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const data = await getLifelines(session.user.id);
  return NextResponse.json({
    lifelines: data.lifelines,
    nextRechargeUtc: data.nextRechargeUtc,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session)
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });

  const data = await lifelineService(session.user.id);
  return NextResponse.json(data);
}
