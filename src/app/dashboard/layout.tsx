import React from "react";

import SideMenu from "@/components/SideMenu";
import Header from "@/components/Header";

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" flex h-full fixed w-full overflow-scroll">
      <SideMenu />
      <div className="flex flex-col w-full h-full justify-start items-center">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default DashLayout;
