"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getProjects = async (projectIds: string[]) => {
  try {
    const projects =
      projectIds.length !== 0 &&
      (await prisma.project.findMany({
        where: {
          id: { in: projectIds },
        },
      }));

    if (projects) {
      revalidatePath("/dashboard","page");
      return projects;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the projects content:",
      error
    );
  }
};
