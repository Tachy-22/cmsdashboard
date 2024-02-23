"use server";
import { prisma } from "@/lib/prisma";

export const getContact = async (projectId: string) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: {
        projectId: projectId,
      },
    });
    if (contact) {
      return contact;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the contact content:",
      error
    );
  }
};
