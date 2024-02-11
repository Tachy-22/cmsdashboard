"use client";
import AnalyticsCard from "@/components/AnalyticsCard";
import ProjectsTable from "@/components/ProjectsTable";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import CreateProjectModalButton from "@/components/CreateProjectModalButton";

const page = () => {
  const create = "create";
  return (
    <div className="flex flex-col w-full h-full p-[1rem] md:p-[2rem] xl:px-[4rem] gap-[3rem]">
      <div className="grid grid-cols-3 gap-6 h-fit ">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => {
          return <AnalyticsCard key={i} />;
        })}
      </div>
      <div className="">
        <CreateProjectModalButton />
      </div>
      <div className="h-full w-full">
        <ProjectsTable />
      </div>
    </div>
  );
};

export default page;
