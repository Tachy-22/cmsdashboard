"use client";
import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";
import { textStyle } from "@/lib/twStyles";
import { Project } from "@prisma/client";
import { useSession } from "next-auth/react";

const CreatedProjectCountCard = ({ projects }: { projects: Project[] }) => {
  const { data: session } = useSession();
  const TypedSession = session as TSession;
  const filteredProjects = projects.filter((project) => {
    const proj = project?.creatorId === TypedSession?.user?.id;
    return proj;
  });
  return (
    <Card
      className={`  ${textStyle} max-h-fit py-4 min-w-[6rem] shadow-none drop-shadow-none `}
    >
      <CardBody>
        <div className="flex gap-3 items-center">
          <p className="text-md">Created Projects : </p>
          <p className="text-lg text-default-500 px-2">
            {filteredProjects.length}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default CreatedProjectCountCard;
