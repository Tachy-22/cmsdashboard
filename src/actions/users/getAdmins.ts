"use server";
import { prisma } from "@/lib/prisma";

export const getAdmins = async () => {
  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
    select: {
      name: true,
      email: true,
    },
  });
  if (admins) {
    return admins;
  } else {
    return false;
  }
};
