"use server";
import { prisma } from "@/lib/prisma";

export const getHero = async (projectId: string) => {
  try {
    const hero = await prisma.hero.findUnique({
      where: {
        projectId: projectId,
      },
    });
    if (hero) {
      return hero;
    } else {
      return false;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the hero content:",
      error
    );
  }
};
