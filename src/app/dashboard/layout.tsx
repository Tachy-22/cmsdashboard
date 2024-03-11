import React from "react";
import SideMenu from "@/components/SideMenu";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-[calc(100vh-65px)] max-h-[calc(100vh-65px)]  w-full  ">
      <SideMenu />
      <div className="flex flex-col w-full h-full min-h-full justify-start items-center overflow-y-auto ">
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
