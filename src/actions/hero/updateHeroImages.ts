"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updateHeroImages = async (updatedImages: string[], id: string) => {
  try {
    const hero = await prisma.hero.update({
      where: {
        id: id,
      },
      data: {
        images: updatedImages,
      },
    });
    revalidatePath("/dashboard/project/[id]", "page");
    return hero;
  } catch (error) {
    console.error(
      "an error occured when trying to create the contact content:",
      error
    );
  }
};
