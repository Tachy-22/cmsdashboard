"use client";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { textStyle } from "@/lib/twStyles";
import { Project } from "@prisma/client";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Group } from "lucide-react";
const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const ProjectCountCard = ({ projects }: { projects: Project[] }) => {

  return (
    <Card
      className={`  ${textStyle} max-h-fit py-3 w-full sm:max-w-[20rem] min-w-fit max-w-full `}
    >
      <CardBody>
        <div className="flex gap-1 items-start">
          {" "}
          <div className=" rounded-md p-1">
            {" "}
            <Group
              size={44}
              strokeWidth={1}
              className="text-secondary dark:text-white/90"
            />
          </div>
          <div className="flex gap-y-2 flex-col px-4">
            <p className={cn(`text-3xl font-bold  `, dmSans.className)}>
              {projects?.length}
            </p>
            <p className="text-base  text-default-500">
               Total Projects{" "}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCountCard;
