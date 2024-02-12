"use client";
import { Button } from "@nextui-org/react";
import React from "react";

const SubmitButton = ({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button
      color="primary"
      variant="solid"
      disabled={isLoading}
      isLoading={isLoading}
      radius="sm"
      // className={` rounded-md w-full p-2 my-4 bg-black transition-colors duration-500 hover:bg-chestnut-500 text-white ${
      //   isLoading ? "hover:cursor-wait opacity-50" : ""
      // } `}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
