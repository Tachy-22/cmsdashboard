"use server";
import { prisma } from "@/lib/prisma";

export const getTestimonial = async (projectId: string) => {
  try {
    const testimonial = await prisma.testimonial.findUnique({
      where: {
        projectId: projectId,
      },
    });
    if (testimonial) {
      return testimonial;
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(
      "an error occured when trying to get the testimonial content:",
      error
    );
  }
};
