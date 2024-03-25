"use client";
// Assuming your TypeScript environment is configured properly

import { Button, ButtonProps, Spinner } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

// Define additional props for DeleteButton
interface DeleteButtonProps extends ButtonProps {
  // Add any additional props specific to DeleteButton
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="bordered"
      type="submit"
      className="w-full max-w-[150px] mx-auto flex items-center bg-red-500 text-white"
      radius="sm"
      isLoading={pending}
      {...props} // Spread the additional props
    >
      {pending ? "" : props.children || "Delete"}
    </Button>
  );
};

export default DeleteButton;
