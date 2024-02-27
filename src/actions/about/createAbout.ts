"use server";
import { prisma } from "@/lib/prisma";
import { getAbout } from "./getAbout";
import { updateAbout } from "./updateAbout";
import { revalidatePath } from "next/cache";

export const createAbout = async (aboutData: TAbout) => {
  const { projectId, description } = aboutData;
  const about = await getAbout(projectId as string);

  if (about) {
    await updateAbout(aboutData, about.id);
    revalidatePath("/dashboard/project/[id]", "page");
  } else {
    try {
      const about = await prisma.about.create({
        data: {
          projectId: projectId,
          description: description,
        },
      });
      if (about) {
        revalidatePath("/dashboard/project/[id]", "page");
        return about;
      } else {
        revalidatePath("/dashboard/project/[id]", "page");
        return;
      }
    } catch (error) {
      console.error(
        "an error occured when trying to create the about content:",
        error
      );
    }
  }
  revalidatePath("/dashboard/project/[id]", "page");
};
