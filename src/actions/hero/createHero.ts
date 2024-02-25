"use server";
import { prisma } from "@/lib/prisma";
import { getHero } from "./getHero";
import { updateHero } from "./updateHero";



export const createHero = async (heroData: THero) => {
  const { title, images, projectId, description, button } = heroData;
  console.log({ title, images, projectId, description, button } , "function itself")

  const hero=await getHero(projectId as string)

  if (hero) {
    //update hero
    await updateHero(heroData,hero.id)
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
  }
 
};
