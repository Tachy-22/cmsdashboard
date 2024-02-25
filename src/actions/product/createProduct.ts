"use server";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";



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
        images:images
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
