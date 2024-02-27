"use server";
import { prisma } from "@/lib/prisma";

export const getProjectContent = async (projectId: string) => {
  if (projectId) {
    try {
      const project = await prisma.project.findUnique({
        where: {
          id: projectId,
        },
        include: {
          hero: true,
          contact: true,
          product: true,
          about: true,
        },
      });
      if (project) {
        return project;
      } else {
        return false;
      }
    } catch (error) {
      console.error(
        "an error occured when trying to fetch the content:",
        error
      );
    }
  } else {
    return;
  }
};
