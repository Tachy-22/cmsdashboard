"use server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export const createUser = async (
  email: string,
  name?: string,
  image?: string,
  password?: string
) => {
  try {
    const hashedPassword = await hash((password as string) || "1234", 10);
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        image: image,
        password: hashedPassword,
      },
    });
    if (user) {
      const userEmail = user.email;
      console.log(`User with email ${userEmail} has been created`);
      return user;
    } else {
    }
  } catch (error) {
    console.error("an error occured when trying to create a user:", error);
  }
};
