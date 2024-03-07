import React, { useCallback, useState } from "react";
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
import { FileState } from "./MultiImageDropzone";

export default function AddHeroImagesModal({
  getImageUrl,
}: {
  getImageUrl?: any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [hasUploaded, setHasUploaded] = useState<boolean>(false);

  const areAllFilesComplete = useCallback((fileStates: FileState[]) => {
    if (Array.isArray(fileStates) && fileStates.length > 0) {
      const isUploaded = fileStates.every(
        (fileState) => fileState.progress === "COMPLETE"
      );
      setHasUploaded(() => isUploaded);
      return isUploaded;
    }
    setHasUploaded(() => false);
    return false;
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button variant="solid" color="primary" onPress={() => onOpen()}>
          Add Hero Images
        </Button>
      </div>
      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent className="w-full flex items-center justify-center flex-col">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Hero Images
              </ModalHeader>
              <ModalBody>
                <MultiImageDropzoneUsage
                  getImageUrl={getImageUrl}
                  areAllFilesComplete={areAllFilesComplete}
                />
              </ModalBody>
              <ModalFooter className="self-end">
                <Button
                  disabled={!hasUploaded}
                  onClick={onClose}
                  color="danger"
                >
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
