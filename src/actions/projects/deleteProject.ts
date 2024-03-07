"use server";
import { prisma } from "@/lib/prisma";
import { Project } from "@prisma/client";
import { updateAdminsProjectIds } from "../users/updateAdminsProjectIds";
import { getUsersByEmails } from "../users/getUsersByEmails";
import { revalidatePath } from "next/cache";

export const deleteProject = async (projectData: Project, id: string) => {
  const { creatorId, admins } = projectData;
  if (id) {
    try {
      const res = await prisma.project.delete({
        where: {
          creatorId: creatorId,
          id: id,
        },
      });
      console.log(`project with id: ${id} has been deleted`, res);
      const administrators = await getUsersByEmails(admins as string[]);
      if (administrators) {
        administrators.forEach(async (administrator) => {
          const newIds = administrator.projectIds.filter(
            (projectId: string) => projectId !== id
          ) as string[];

          // Assuming `updateAdminsProjectIds` is an asynchronous function
          const res = await updateAdminsProjectIds(administrator.id, newIds);

          // Handle the result if needed
          console.log(res);
        });
      }
      revalidatePath("/dashboard", "page");

      return res;
    } catch (error) {
      console.error(
        `an error occured when trying to delet a project with id  ${id} :`,
        error
      );
    }
  }
};
