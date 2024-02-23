"use server";
import { prisma } from "@/lib/prisma";

type TAbout = {
  projectId: string | null;
  description: string;
};

export const createAbout = async (aboutData: TAbout) => {
  const { projectId, description } = aboutData;
  try {
    const about = await prisma.about.create({
      data: {
        projectId: projectId,
        description: description,
      },
    });
    if (about) {
      return about;
    } else {
      return;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to create the about content:",
      error
    );
  }
};


