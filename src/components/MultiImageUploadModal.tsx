import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { MultiImageDropzoneUsage } from "./MultiImageDropUse";

export default function MultiImageUploadModal({
  getImageUrl,
}: {
  getImageUrl?: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="solid" color="primary" onPress={() => onOpen()}>
          Upload Hero Images
        </Button>
      </div>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-full flex items-center justify-center flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Hero Images
              </ModalHeader>
              <ModalBody>
                <MultiImageDropzoneUsage
                  getImageUrl={(url: string) => {
                    getImageUrl(url);
                  }}
                />
              </ModalBody>
              <ModalFooter className="self-end">
                <Button color="primary" onPress={onClose}>
                  save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
