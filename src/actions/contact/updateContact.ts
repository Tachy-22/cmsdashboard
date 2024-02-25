"use server";
import { prisma } from "@/lib/prisma";



export const updateContact = async (contactData: TContact,id:string) => {
    const { address, projectId, location } = contactData;
    try {
      await prisma.contact.update({
        where: {
          id: id,
        },
        data: {
          adress: address,
          projectId: projectId,
          location: location,
        },
      });
    } catch (error) {
      console.error(
        "an error occured when trying to update the contact content:",
        error
      );
    }
};
