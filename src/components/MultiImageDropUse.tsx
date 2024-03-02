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

export function MultiImageDropzoneUsage({
  getImageUrl,
  areAllFilesComplete,
}: {
  getImageUrl?: any;
  areAllFilesComplete: (filestate: FileState[]) => void;
}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

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
              getImageUrl(res.url);
            });
        } catch (err) {
          updateFileProgress(addedFileState.key, "ERROR");
        }
      })
    );
  };

  useEffect(() => {
    areAllFilesComplete((fileStates as FileState[]) );
  }, [areAllFilesComplete, fileStates]);

  console.log({ fileStates });
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
