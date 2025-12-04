import prisma from "./prisma";
import { addSeconds } from "date-fns";

const rechargeSeconds = Number(process.env.LIFELINE_RECHARGE_SECONDS);

export async function getLifelines(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const now = new Date();

  // If already at max lifelines, no need to recharge
  if (user.lifelines >= user.maxLifelines) {
    return user;
  }

  // Check if recharge time has passed
  if (now >= user.nextRechargeUtc) {
    // Calculate how many full recharge periods have elapsed
    const elapsedMs = now.getTime() - user.nextRechargeUtc.getTime();
    const elapsedPeriods = Math.floor(elapsedMs / (rechargeSeconds * 1000)) + 1; // +1 for the current period

    // Calculate new lifeline count (capped at max)
    const newLifelines = Math.min(
      user.lifelines + elapsedPeriods,
      user.maxLifelines,
    );

    // Calculate the next recharge time from the last completed recharge period
    let nextRecharge: Date;
    if (newLifelines >= user.maxLifelines) {
      // If at max, set to now (no active recharge)
      nextRecharge = now;
    } else {
      // Set to the next recharge time based on the last completed period
      const completedPeriods = Math.min(
        elapsedPeriods,
        user.maxLifelines - user.lifelines,
      );
      nextRecharge = addSeconds(
        user.nextRechargeUtc,
        completedPeriods * rechargeSeconds,
      );
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        lifelines: newLifelines,
        nextRechargeUtc: nextRecharge,
      },
    });

    return updated;
  }

  return user;
}

export async function useLifeline(userId: string) {
  const user = await getLifelines(userId); // ensures auto recharge

  if (user.lifelines <= 0) {
    return { success: false, error: "No lifelines left" };
  }

  const now = new Date();
  const nextRecharge = addSeconds(now, rechargeSeconds);

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      lifelines: { decrement: 1 },
      nextRechargeUtc: nextRecharge,
    },
  });

  return {
    success: true,
    lifelines: updated.lifelines,
    nextRechargeUtc: updated.nextRechargeUtc.toISOString(),
  };
}
