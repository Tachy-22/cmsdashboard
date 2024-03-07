"use server";
import { prisma } from "@/lib/prisma";

export const getUsersByEmails = async (adminEmails: string[]) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: { in: adminEmails },
      },
      select: { projectIds: true, id: true },
    });
    if (users) {
      return users;
    } else {
      return false;
    }
  } catch (error) {
    console.error("an error occured when trying to find users:", error);
  }
};
