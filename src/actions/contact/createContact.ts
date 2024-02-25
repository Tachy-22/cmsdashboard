"use server";
import { prisma } from "@/lib/prisma";
import { getContact } from "./getContact";
import { updateContact } from "./updateContact";



export const createContact = async (contactData: TContact) => {
  const { address, projectId, location } = contactData;
  
  const contact=await getContact(projectId as string)

  if (contact) {
 await updateContact(contactData,contact.id)
} else {
  try {
    const contact = await prisma.contact.create({
      data: {
        adress: address,
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
}

 
};
