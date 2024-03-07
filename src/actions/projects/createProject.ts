"use server";
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";
import { revalidatePath } from "next/cache";

function addOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export const createProject = async (projectData: Project) => {
  const { title, theme, creatorId, slug, admins, creatorName } = projectData;

  try {
    const now = new Date();
    // Format the date
    const formattedDate = `${addOrdinalSuffix(
      now.getDate()
    )}, ${new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      now
    )}, ${now.getFullYear()}`;

    const project = await prisma.project.create({
      data: {
        title: title,
        theme: theme,
        creatorId: creatorId,
        admins: admins,
        slug: slug,
        createdAt: formattedDate, // Add the formatted date to the createdAt field
        creatorName: creatorName,
      },
    });
    if (project) {
      revalidatePath("/dashboard", "page");
      console.log({ project });
      return project;
    }
  } catch (error) {
    console.error("an error occured when trying to create a project:", error);
  }
};
