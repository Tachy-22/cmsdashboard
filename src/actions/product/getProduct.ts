"use server";
import { prisma } from "@/lib/prisma";

export const getProduct = async (projectId: string) => {
  try {
    const product = await prisma.product.findMany({
      where: {
        projectId: projectId,
      },
    });
    if (product) {
      return product;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the product content:",
      error
    );
  }
};
