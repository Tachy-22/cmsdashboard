import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

export const deleteProject = async (projectData: Project, id: string) => {
  const { creatorId } = projectData;
  try {
    await prisma.project.delete({
      where: {
        creatorId: creatorId,
        id: id,
      },
    });
    console.log(`project with id: ${id} has been deleted`);
  } catch (error) {
    console.error(
      `an error occured when trying to delet a project with id  ${id} :`,
      error
    );
  }
};
