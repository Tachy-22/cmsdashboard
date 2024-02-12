"use client";
import { Divider, Input } from "@nextui-org/react";
import React from "react";
import ThemePicker from "./ThemePicker";
import ProjectAdmins from "./ProjectAdmins";

const CreateProjectForm = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4 ">
      <div className="flex flex-col gap-2">
        <label htmlFor="project_name" className="font- text-md">
          Project Name
        </label>
        <Input
          isRequired
          type="text"
          label={``}
          labelPlacement={`outside`}
          placeholder="Enter your project name here..."
          description={""}
          id="project_name"
          name="project_name"
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
        <ProjectAdmins />
      </div>
      <Divider className="" />
    </div>
  );
};

export default CreateProjectForm;
