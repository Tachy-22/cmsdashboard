"use client";
import React from "react";
import { Input } from "@nextui-org/react";
import SubmitButton from "./forms/SubmitButton";
import { addAdmin } from "@/actions/users/addAdmin";
import { useToast } from "./ui/use-toast";

const AddAdminForm = () => {
  const { toast } = useToast();
  const handleFormSubmission = async (formData: FormData) => {
    try {
      const email = formData.get("email");
      const result = await addAdmin(email as string);

      switch (result) {
        case true:
          // Admin added successfully
          toast({
            title: "Success",
            description: "New admin added successfully",
            duration: 5000,
          });
          break;

        case "Failed to retrieve admin data":
          // Failed to retrieve admin data
          toast({
            title: "Error",
            description: "Failed to retrieve admin data",
            variant: "destructive",
            duration: 5000,
          });
          break;

        case "Already an admin":
          // User is already an admin
          toast({
            title: "Info",
            description: "User is already an admin !",
            duration: 5000,
          });
          break;

        case "Failed to update user role to admin":
          // Failed to update user role to admin
          toast({
            title: "Error",
            description: "Failed to update user role to admin",
            duration: 5000,
          });
          break;

        case "An error occurred while adding an admin":
          // An error occurred while adding an admin
          toast({
            title: "Error",
            description: "An error occurred while adding an admin",
            duration: 5000,
          });
          break;

        default:
          // Handle any other unexpected result
          console.error("Unexpected result:", result);
      }
    } catch (error) {
      // Handle general error
      console.error("Error while trying to add a new admin:", error);
      toast({
        title: "Error",
        description: "Error while trying to add a new admin",
        variant: "destructive",
        duration: 5000,
      });
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
