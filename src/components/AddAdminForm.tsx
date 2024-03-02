"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import SubmitButton from "./forms/SubmitButton";
import { addAdmin } from "@/actions/users/addAdmin";

const AddAdminForm = () => {
  const handleFormSubmission = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      const success = await addAdmin(email as string);
      if (success) {
        console.log("New admin added successfully");
      } else {
        console.error("Failed to add a new admin");
      }
    } catch (error) {
      console.error("Error while trying to add a new admin:", error);
    }
  };

  return (
    <div className="   flex flex-col gap-4 ">
      <h2 className="">Add a new Admin:</h2>
      <form action={handleFormSubmission} className="flex gap-3 items-end">
        <Input
          labelPlacement="outside"
          type="email"
          label="Email"
          name="email"
          variant="bordered"
          placeholder="Enter user's email..."
          className="max-w-[30rem]"
          size="md"
          required
        />
        
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddAdminForm;
