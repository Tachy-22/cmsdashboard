"use server";
import { prisma } from "@/lib/prisma";

type TContact = {
  adress: string;
  projectId: string | null;
  location: string;
};

export const createContact = async (heroData: TContact) => {
  const { adress, projectId, location } = heroData;
  try {
    const contact = await prisma.contact.create({
      data: {
        adress: adress,
        projectId: projectId,
        location: location,
      },
    });
    if (contact) {
      return contact;
    } else {
      return;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to create the contact content:",
      error
    );
  }
};
