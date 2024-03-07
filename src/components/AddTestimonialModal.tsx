"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";

import { Testimonial } from "@prisma/client";
import SubmitButton from "./forms/SubmitButton";
import { useAppSelector } from "@/lib/redux/hooks";
import { createTestimonial } from "@/actions/testimonial/createTestimonial";
import { useToast } from "./ui/use-toast";

export default function AddTestimonialModal() {
  const { toast } = useToast();
  const { project } = useAppSelector((state) => state.projectSlice);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTestimonialSubmission = async (formData: FormData) => {
    try {
      const testimonialData = {
        projectId: project.id as string,
        name: formData.get("name") as string,
        comment: formData.get("comment") as string,
        occupation: formData.get("occupation") as string,
      };
      const success = await createTestimonial(testimonialData as Testimonial);
      if (success) {
        toast({ description: "testimonial uploaded successfuly !" });
        onClose();
      } else {
        toast({ description: "testimonial was not uploaded !" });

        console.log("failed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="primary"
          className="w-full max-w-[150px] ml-auto mt-3 block"
          onPress={() => onOpen()}
        >
          Add Testimonial
        </Button>
      </div>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-full flex  flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new Testimonial
              </ModalHeader>
              <ModalBody>
                <form action={handleTestimonialSubmission}>
                  <div className=" flex flex-col gap-y-3  ">
                    <div className="grid grid-cols-2 gap-3 ">
                      <Input
                        isRequired
                        labelPlacement="outside"
                        label="Name"
                        name="name"
                        variant="flat"
                        placeholder="John Doe"
                      />
                      <Input
                        isRequired
                        labelPlacement="outside"
                        label="Occupation"
                        name="occupation"
                        variant="flat"
                        placeholder="CEO  at Company Inc."
                      />
                    </div>
                    <Textarea
                      isRequired
                      label="Comment"
                      name="comment"
                      labelPlacement="outside"
                      placeholder="Enter users comment"
                      className="w-full"
                    />
                  </div>
                  <br />

                  <SubmitButton />
                </form>
              </ModalBody>
              <ModalFooter className="self-end items-center flex justify-end w-full">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
