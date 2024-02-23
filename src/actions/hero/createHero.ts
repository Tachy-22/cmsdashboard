"use server";
import { prisma } from "@/lib/prisma";

type THero = {
  title: string;
  projectId: string | null;
  description: string;
  images: string[];
  button: string;
};

export const createProject = async (heroData: THero) => {
  const { title, images, projectId, description, button } = heroData;
  try {
    const hero = await prisma.hero.create({
      data: {
        title: title,
        projectId: projectId,
        description: description,
        button: button,
        images: images,
      },
    });
    if (hero) {
      return hero;
    } else {
      return;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to create the hero content:",
      error
    );
  }
};
