"use client";
import React, { FormEvent } from "react";

const FormUi = ({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) => {
  return (
    <div className="w-full flex justify-center items-center ">
      <div className="flex flex-col w-full  h-full   rounded-xl backdrop-blur-lg gap-1">
        
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {children}
        </form>
      </div>
    </div>
  );
};

export default FormUi;
