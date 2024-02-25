"use server";
import { prisma } from "@/lib/prisma";



export const updateAbout = async (aboutData: TAbout,id:string) => {
    const { projectId, description } = aboutData;


    try {
      await prisma.about.update({
        where: {
          id: id,
        },
        data: {
          projectId: projectId,
          description: description,
        },
      });
    } catch (error) {
      console.error(
        "an error occured when trying to update the about content:",
        error
      );
    }
};
