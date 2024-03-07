import DotsBounceLoader from "@/components/DotsBounceLoader";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center min-w-screen mx-auto  top-0 bottom-0 min-h-screen">
      <DotsBounceLoader />
    </div>
  );
};

export default loading;
