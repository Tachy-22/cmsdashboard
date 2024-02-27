"use server";
import { prisma } from "@/lib/prisma";
import { getHero } from "./getHero";
import { updateHero } from "./updateHero";
import { revalidatePath } from "next/cache";

export const createHero = async (heroData: THero) => {
  const { title, images, projectId, description, button } = heroData;
  console.log(
    { title, images, projectId, description, button },
    "function itself"
  );

  const hero = await getHero(projectId as string);

  if (hero) {
    //update hero
    const heroUpdate = await updateHero(heroData, hero.id);
    revalidatePath("/dashboard/project/[id]", "page");
    return heroUpdate;
  } else {
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
        revalidatePath("/dashboard/project/[id]", "page");

        return hero;
      } else {
        revalidatePath("/dashboard/project/[id]", "page");

        return;
      }
    } catch (error) {
      revalidatePath("/dashboard/project/[id]", "page");
      console.error(
        "an error occured when trying to create the hero content:",
        error
      );
    }
  }
};
