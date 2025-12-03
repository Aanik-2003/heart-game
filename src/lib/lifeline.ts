import prisma from "./prisma";
import { addSeconds } from "date-fns";

const rechargeSeconds = Number(process.env.LIFELINE_RECHARGE_SECONDS ?? 3600);
export async function getLifelines(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const now = new Date(); // ALWAYS UTC on server

  // Auto recharge if time passed and lifelines not full
  if (now >= user.nextRechargeUtc && user.lifelines < user.maxLifelines) {
    const nextRecharge = addSeconds(now, rechargeSeconds);

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        lifelines: user.lifelines + 1,
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
