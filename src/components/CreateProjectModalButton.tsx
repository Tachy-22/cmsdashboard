"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import CreateProjectForm from "./CreateProjectForm";
import { PlusIcon } from "lucide-react";

export default function CreateProjectModalButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button color="primary" variant="solid" onPress={onOpen}>
        <PlusIcon size="18" /> New Project
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-4 items-center">
                <Avatar
                  size="lg"
                  src="./new_project2.png"
                  className="bg-white dark:bg-inherit"
                />
                <div className="flex flex-col">
                  Create a new Project
                  <small className=" text-sm  text-gray-500 font-light">
                    Create a new web project with just a few clicks.
                  </small>
                </div>
              </ModalHeader>
              <ModalBody>
                <CreateProjectForm onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
