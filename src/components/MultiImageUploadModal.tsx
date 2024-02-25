import React,{useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { MultiImageDropzoneUsage } from "./MultiImageDropUse";

export default function MultiImageUploadModal() {
  const {isOpen, onOpen, onClose} = useDisclosure();



 

  return (
    <>
      <div className="flex flex-wrap gap-3">
        
          <Button  onPress={() => onOpen()}>Open Modal</Button>
       
      </div>
      <Modal 
        size={"full"} 
        isOpen={isOpen} 
        onClose={onClose} 
      >
        <ModalContent className="w-full flex items-center justify-center flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Upload Hero Images</ModalHeader>
              <ModalBody>
          <MultiImageDropzoneUsage
          />
              </ModalBody>
              <ModalFooter className="self-end">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
