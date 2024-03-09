"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAdmins } from "./getAdmins";

export async function addAdmin(email?: string) {
  try {
    // Get the current list of admins
    const admins: false | { email: string; name: string | null }[] =
      await getAdmins();

    // Check if admins exist
    if (!admins) {
      // Handle the case where there was an issue retrieving the admins
      return "Failed to retrieve admin data";
    }

    // Check if the email is already an admin
    const isEmailInAdmins = admins.some((admin) => admin.email === email);
    if (isEmailInAdmins) {
      return "Already an admin";
    }

    // Update user role to ADMIN
    const userUpdate = await prisma.user.update({
      where: {
        email: email,
      },
      data: { role: "ADMIN" },
    });

    // Check if the user update was successful
    if (userUpdate) {
      // Trigger a revalidation for the dashboard page
      revalidatePath("/dashboard/add-admin", "page");
      return true;
    }

    // Handle the case where the user update was not successful
    return "Failed to update user role to admin";
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("An error occurred while adding an admin:", error);
    return "An error occurred while adding an admin";
  }
}
