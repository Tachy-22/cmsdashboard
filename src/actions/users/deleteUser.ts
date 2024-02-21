import { prisma } from "@/lib/prisma";

export const deleteUser = async (email: string, name: string) => {
  try {
    await prisma.user.delete({
      where: {
        email: email,
      },
    });
    return `User with email ${email} has been created`;
  } catch (error) {
    console.error("an error occured when trying to create a user:", error);
  }
};
