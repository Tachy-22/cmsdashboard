"use server";
import { prisma } from "@/lib/prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, image: true },
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
