import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { MultiImageDropzoneUsage } from "./MultiImageDropUse";

export default function AddProductsModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button   color="primary"  className="w-full max-w-[150px] ml-auto mt-3 block" onPress={() => onOpen()}>Add Products</Button>
      </div>
      <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-full flex items-center justify-center flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Hero Images
              </ModalHeader>
              <ModalBody>
              <div className="max-w-[500px] flex flex-col gap-y-3 mx-auto ">
              <MultiImageDropzoneUsage />
                <Input isRequired label="Product Name" />
                <Input isRequired label="Product Type" />
                <Input isRequired label="Product description" />
                <Input isRequired label="Product Name"  type="number"/>
                <Button>
                    Add Product
                </Button>
              </div>
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
