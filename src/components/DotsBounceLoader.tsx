"use client";
import React from "react";

const DotsBounceLoader = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.3s]" />
        <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:.7s]" />
      </div>
      <p className="font-light text-sm"> Loading...</p>
    </div>
  );
};

export default DotsBounceLoader;
