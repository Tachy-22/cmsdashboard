"use server";
import { prisma } from "@/lib/prisma";

type TProduct = {
  name: string;
  projectId: string | null;
  description: string;
  type: string;
};

export const createProduct = async (heroData: TProduct) => {
  const { name, projectId, description, type } = heroData;
  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        projectId: projectId,
        description: description,
        type: type,
      },
    });
    if (product) {
      return product;
    } else {
      return;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to create the product content:",
      error
    );
  }
};
