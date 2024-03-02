"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addAdmin(email?: string) {
  const userUpdate = await prisma.user.update({
    where: {
      email: email,
    },
    data: { role: "ADMIN" },
  });
  if (userUpdate) {
    revalidatePath("/dashboard/add-admin", "page");
    return true;
  }
  return userUpdate;
}
