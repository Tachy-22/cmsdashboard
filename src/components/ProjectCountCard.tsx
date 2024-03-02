"use client";
import React from "react";
import { Card, CardHeader, CardBody,  } from "@nextui-org/react";
import { textStyle } from "@/lib/twStyles";
import { Project } from "@prisma/client";

const ProjectCountCard = ({ projects }: { projects: Project[] }) => {
  return (
    <Card
      className={`  ${textStyle} max-h-fit py-4 min-w-[6rem] shadow-none drop-shadow-none border-0none`}
    >
      <CardBody>
        <div className="flex gap-3 items-center">
          <p className="text-md">Total Projects : </p>
          <p className="text-lg text-default-500 px-2">{projects.length}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProjectCountCard;
