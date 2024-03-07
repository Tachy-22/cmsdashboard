"use client";
import { Button, Divider, Input } from "@nextui-org/react";
import React, { useState } from "react";
import ThemePicker from "./ThemePicker";
import ProjectAdmins from "./ProjectAdmins";
import { createProject } from "@/actions/projects/createProject";
import { useSession } from "next-auth/react";
import useProjectAdmins from "@/lib/hooks/useProjectAdmins";
import { updateAdminsProjectIds } from "@/actions/users/updateAdminsProjectIds";
import { useRouter } from "next/navigation";
import SubmitButton from "./forms/SubmitButton";
import { Project } from "@prisma/client";
import { useToast } from "./ui/use-toast";

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const TypedSession = session as TSession;

  const {
    searchInput,
    isOwner,
    admins,
    matchedUsers,
    handleAdminAddition,
    handleAdminRemoval,
    handleSearchChange,
  } = useProjectAdmins(session);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      const projectData = {
        ...Object.fromEntries(formData),
        creatorId: TypedSession?.user?.id as string,
        creatorName: TypedSession?.user?.name as string,
        slug: "slug",
        admins: admins.map((admin) => admin.email),
      };

      const project = await createProject(projectData as Project);

      if (project) {
        toast({ description: "Project created successfully !" });

        for (const admin of admins) {
          console.log("the admins array", admin, project);
          const newIds = [...(admin?.projectIds || []), project?.id];

          try {
            const sucess = await updateAdminsProjectIds(admin.id, newIds);
            if (sucess) {
              toast({
                description: "All admin profiles have been successfully updated.",
              });
              toast({
                description: "Redirecting ...",
              });
            } else {
              toast({
                description: "error with admin addition.",
              });
            }
          } catch (error) {
            console.error("Error updating admin's projectIds:", error);
            toast({ description: "error with admin addition." });
          }
        }
        router.push(`/dashboard/project/${project?.id}`);
        onClose();
      } else {
        toast({ description: "Project was not created !" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form action={handleSubmit} className="w-full h-full flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font- text-md">
          Project Name
        </label>
        <Input
          isRequired
          type="text"
          label={``}
          labelPlacement={`outside`}
          placeholder="Enter your project name here..."
          description={""}
          id="title"
          name="title"
          classNames={{
            // base: ["max-w-[40rem]"],
            inputWrapper: ["bg-white", "dark:bg-stone-700"],
          }}
          variant="faded"
        />
      </div>
      <Divider className="" />
      <div className="flex flex-col gap-2">
        <ThemePicker />
      </div>
      <Divider className="" />
      <div className="">
        <ProjectAdmins
          searchInput={searchInput}
          isOwner={isOwner}
          matchedUsers={matchedUsers}
          admins={admins}
          handleAdminAddition={handleAdminAddition}
          handleAdminRemoval={handleAdminRemoval}
          handleSearchChange={handleSearchChange}
        />
      </div>
      <Divider className="" />
      <div className="flex justify-end gap-3 items-center">
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
};

export default CreateProjectForm;
