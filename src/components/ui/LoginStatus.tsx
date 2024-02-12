import React from "react";

const Status = ({ status }: { status: string }) => {
  return (
    <>
      {status && (
        <div
          className={`  text-white w-fit text-sm py-1 px-3 rounded-md mt-2 ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {status}
        </div>
      )}
    </>
  );
};

export default Status;
