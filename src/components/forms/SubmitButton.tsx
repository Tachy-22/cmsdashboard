"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-fit max-w-[150px] flex items-center  mt-3  "
      color="primary"
      radius="sm"
      isLoading={pending}
    >
      {pending ? "Saving" : "Submit"}
    </Button>
  );
};

export default SubmitButton;
