"use client";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { useEffect, useState } from "react";

export const saveImageUrlsToLocalstorage = (urls: string[]) => {
  localStorage.setItem("imageUrls", JSON.stringify(urls));
};

export const getImageUrlsFromLocalStorage = () => {
  const storedUrls = localStorage.getItem("imageUrls");
  return storedUrls ? JSON.parse(storedUrls) : [];
};

export const deleteImageUrlsFromLocalStorage = () => {
  localStorage.removeItem("imageUrls");
};

export function MultiImageDropzoneUsage({
  getImageUrl,
}: {
  getImageUrl?: any;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const storedUrls = getImageUrlsFromLocalStorage();
    setImageUrls(storedUrls);
  }, []);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const uplaodFiles = async (addedFiles: FileState[]) => {
    setFileStates([...fileStates, ...addedFiles]);
    await Promise.all(
      addedFiles.map(async (addedFileState) => {
        try {
          await edgestore.publicFiles
            .upload({
              file: addedFileState.file as File,
              onProgressChange: async (progress) => {
                updateFileProgress(addedFileState.key, progress);
                if (progress === 100) {
                  // wait 1 second to set it to complete
                  // so that the user can see the progress bar at 100%
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  updateFileProgress(addedFileState.key, "COMPLETE");
                }
              },
            })
            .then((res) => {
              console.log(res);
              const newImageUrls = [...getImageUrlsFromLocalStorage(), res.url];
              getImageUrl(res.url);
              saveImageUrlsToLocalstorage(newImageUrls);
              setImageUrls(newImageUrls);
            });
        } catch (err) {
          updateFileProgress(addedFileState.key, "ERROR");
        }
      })
    );
  };

  console.log({ imageUrls }, { fileStates });
  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 5,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={(addedFiles) => {
          uplaodFiles(addedFiles);
        }}
      />
    </div>
  );
}
