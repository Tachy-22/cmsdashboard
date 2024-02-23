"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const getProjects = async (projectIds: string[]) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        id: { in: projectIds },
      },
    });
    revalidatePath("/dashboard");
    if (projects) {
      revalidatePath("/dashboard");
      return projects;
    } else {
      revalidatePath("/dashboard");
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the projects content:",
      error
    );
  }
};
