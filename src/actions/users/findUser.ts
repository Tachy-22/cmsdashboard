"use server"
import { prisma } from "@/lib/prisma";

export const findUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (user) {
      return user;
    } else {
      return false;
    }
  } catch (error) {
    console.error("an error occured when trying to find the user:", error);
  }
};
