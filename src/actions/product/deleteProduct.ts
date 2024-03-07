"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: string) => {
  try {
    const del = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard/project/[id]", "page");
    return del;
  } catch (error) {
    console.error(
      "an error occured when trying to get the product content:",
      error
    );
  }
};
