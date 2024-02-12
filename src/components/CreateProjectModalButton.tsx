"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import CreateProjectForm from "./CreateProjectForm";
import { PlusIcon } from "lucide-react";
import { createProject } from "@/actions/projects/createProject";
import { useSession } from "next-auth/react";

export default function CreateProjectModalButton() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { data: session } = useSession();

  console.log("session in client:", session);

  const handleSubmit = async (formData: FormData) => {
    const projectData = Object.fromEntries(Array.from(formData.entries()));
    const project = await createProject({
      title: "demo name",
      theme: "#fffff",
      creatorId: "6592856561087c92988614a7",
      slug: "slug",
      admins: ["abc@gmail.com", "efg@gmail.com"],
    });
    console.log("project created ", project);
    console.log("Project Data:", projectData, projectData.project_name);
    onClose();
  };

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        <PlusIcon size="18" /> New Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <form action={handleSubmit}>
              <ModalHeader className="flex gap-4 items-center">
                <Avatar
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                />
                <div className="flex flex-col">
                  Create a new Project
                  <small className=" text-sm  text-gray-500 font-light">
                    Create a new web project with just a few clicks.
                  </small>
                </div>
              </ModalHeader>
              <ModalBody>
                <CreateProjectForm />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="secondary" type="submit">
                  Create project
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
