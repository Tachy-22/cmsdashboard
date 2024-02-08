import React from "react";

const page = async ({ params }: { params: { dashboard: string } }) => {
  return (
    <div className="p-4 px-[4rem]  w-full flex flex-col gap-3 ">
      {params.dashboard} nested route
    </div>
  );
};

export default page;
