"use server";
import { prisma } from "@/lib/prisma";

export const geAbout = async (projectId: string) => {
  try {
    const about = await prisma.about.findUnique({
      where: {
        projectId: projectId,
      },
    });
    if (about) {
      return about;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the about content:",
      error
    );
  }
};
