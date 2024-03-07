import React from "react";
import SideMenu from "@/components/SideMenu";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-full fixed w-full overflow-auto">
      <SideMenu />
      <div className="flex flex-col w-full h-full justify-start items-center">
        {children}
      </div>
    </div>
  );
};

export default DashBoardLayout;
