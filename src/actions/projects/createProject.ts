"use server";
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";

type TProject = {
  slug: string;
  title: string;
  theme: string;
  creatorId: string | null;
  admins: string[];
};

export const createProject = async (projectData: TProject) => {
  const { title, theme, creatorId, slug, admins } = projectData;
  try {
    const project = await prisma.project.create({
      data: {
        title: title,
        theme: theme,
        creatorId: creatorId,
        admins: admins,
        slug: slug,
      },
    });
    if (project) {
      console.log({ project });
      return project;
    }
  } catch (error) {
    console.error("an error occured when trying to create a project:", error);
  }
};
