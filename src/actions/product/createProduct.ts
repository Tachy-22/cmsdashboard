"use server";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createProduct = async (productData: Product) => {
  const { name, projectId, description, type, price, images } = productData;

  try {
  
    const product = await prisma.product.create({
      data: {
        name: name,
        projectId: projectId,
        description: description,
        type: type,
        price: price,
        images: images,
      },
    });

    if (product) {
      revalidatePath("/dashboard/project/[id]", "page");
      return product;
    } else {
      revalidatePath("/dashboard/project/[id]", "page");
      return;
    }
  } catch (error) {
    console.error(
      "An error occurred when trying to create the product content:",
      error
    );
  }
  revalidatePath("/dashboard/project/[id]", "page");
};
