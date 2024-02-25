"use server";
import { prisma } from "@/lib/prisma";



export const updateHero = async (heroData: THero,id:string) => {
    const { title, images, projectId, description, button } = heroData;  try {
     await prisma.hero.update({
       where: {
         id: id,
       },
       data: {
         title: title,
         images: images,
         projectId: projectId,
         description: description,
         button: button,
       },
     });


  } catch (error) {
    console.error(
      "an error occured when trying to create the contact content:",
      error
    );
  }
};
