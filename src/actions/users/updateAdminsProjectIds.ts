"use server";

import { prisma } from "@/lib/prisma";

export async function updateAdminsProjectIds(
  userId?: string,
  newIds?: string[]
) {
  try {
    const userUpdate = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { projectIds: newIds },
    });
    return userUpdate;
  } catch (error) {
    console.error(error);
  }
}
