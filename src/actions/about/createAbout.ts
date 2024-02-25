"use server";
import { prisma } from "@/lib/prisma";
import { getAbout } from "./getAbout";
import { updateAbout } from "./updateAbout";



export const createAbout = async (aboutData: TAbout) => {
  const { projectId, description } = aboutData;
const about=await getAbout(projectId as string)

  if (about) {
    await updateAbout(aboutData,about.id)
  } else {
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
  }
};


