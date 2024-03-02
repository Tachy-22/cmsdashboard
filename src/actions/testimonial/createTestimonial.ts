"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Testimonial } from "@prisma/client";

export const createTestimonial = async (testimonialData: Testimonial) => {
  const { name, occupation, comment, projectId } = testimonialData;

  try {
    const testimonial = await prisma.testimonial.create({
      data: {
        name: name,
        occupation: occupation,
        comment: comment,
        projectId: projectId,
      },
    });
    if (testimonial) {
      revalidatePath("/dashboard/project/[id]", "page");
      return testimonial;
    } else {
      return;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to create the testimonial content:",
      error
    );
  }
};
