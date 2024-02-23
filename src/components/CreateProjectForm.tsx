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

const CreateProjectForm = ({ onClose }: { onClose: () => void }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    searchInput,
    isOwner,
    admins,
    matchedUsers,
    handleAdminAddition,
    handleAdminRemoval,
    handleSearchChange,
  } = useProjectAdmins(session);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setisLoading(true);
    try {
      const projectData = {
        ...Object.fromEntries(formData),
        creatorId: session?.user?.id as string,
        slug: "slug",
        admins: admins.map((admin) => admin.email),
      };

      const project = await createProject(projectData as TProject);

      for (const admin of admins) {
        console.log("the admins array", admin, project);
        const newIds = [...(admin?.projectIds || []), project?.id];
        console.log("updating ids");

        try {
          await updateAdminsProjectIds(admin.id, newIds);
          console.log("updated ids");
        } catch (error) {
          console.error("Error updating admin's projectIds:", error);
        }
      }
      router.push(`/dashboard/project/${project?.id}`);
      setisLoading(false);
      onClose();
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
      <div className="flex justify-end gap-3">
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button isLoading={isLoading} color="secondary" type="submit">
          Create project
        </Button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
