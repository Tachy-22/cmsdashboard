"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import { createProduct } from "@/actions/product/createProduct";
import { useParams } from "next/navigation";
import { Product } from "@prisma/client";
import SubmitButton from "./forms/SubmitButton";
import { FileState } from "./MultiImageDropzone";
import { useToast } from "./ui/use-toast";

export default function AddProductsModal() {
  const { toast } = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const param = useParams();
  const projectId = param.id;
  const [images, setImages] = useState<string[]>([]);
  const [hasUploaded, setHasUploaded] = useState<boolean | null>(null);

  const getImageUrl = (url: string) => {
    setImages((prev) => [...prev, url]);
    console.log(url);
  };

  const mutateProduct = async (formData: FormData) => {
    try {
      const productData = {
        projectId: projectId as string,
        name: formData.get("name") as string,
        type: formData.get("type") as string,
        price: formData.get("price") as string,
        description: formData.get("description") as string,
        images,
      };
      const success = await createProduct(productData as Product);
      if (success) {
        toast({
          description: "Product has been uploaded successfully !",
        });
        toast({
          description: "Refreshing Product table !",
        });
        onClose();
      } else {
        toast({
          description: "An error occured, Product has been not been uploaded !",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const areAllFilesComplete = (fileStates: FileState[]) => {
    if (Array.isArray(fileStates) && fileStates.length > 0) {
      const isUploaded = fileStates.every(
        (fileState) => fileState.progress === "COMPLETE"
      );
      setHasUploaded(() => isUploaded);
      return isUploaded;
    }
    setHasUploaded(() => false);
    return false;
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          color="primary"
          className="w-full max-w-[150px] ml-auto mt-3 block"
          onPress={() => onOpen()}
        >
          Add Products
        </Button>
      </div>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-full flex items-center justify-center flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Upload Hero Images
              </ModalHeader>
              <ModalBody className="">
                <div>
                  <div className="max-w-[500px] flex flex-col gap-y-3 mx-auto ">
                    <MultiImageDropzoneUsage
                      getImageUrl={getImageUrl}
                      areAllFilesComplete={areAllFilesComplete}
                    />
                    <form
                      action={mutateProduct}
                      className="flex flex-col gap-y-3"
                    >
                      <Input isRequired label="Product Name" name={"name"} />
                      <Input isRequired label="Product Type" name="type" />
                      <Input
                        isRequired
                        label="Product description"
                        name="description"
                      />
                      <Input
                        isRequired
                        label="Product price"
                        name="price"
                        type="number"
                      />
                      <br />

                      <SubmitButton disabled={!hasUploaded} />
                    </form>
                  </div>
                </div>
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
