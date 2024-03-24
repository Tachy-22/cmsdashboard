"use client";
import React from "react";
import { Card, CardBody, Skeleton } from "@nextui-org/react";
import { textStyle } from "@/lib/twStyles";
import { Project } from "@prisma/client";
import { useSession } from "next-auth/react";
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { HandCoins } from "lucide-react";
const dmSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const CreatedProjectCountCard = ({ projects }: { projects: Project[] }) => {
  const { data: session } = useSession();
  const TypedSession = session as TSession;
  const filteredProjects =
    TypedSession &&
    projects?.filter(
      (project) => project?.creatorId === TypedSession?.user?.id
    );

  return (
    <Card
      className={`  ${textStyle} max-h-fit py-3 w-full sm:max-w-[20rem] min-w-fit max-w-full bg-transparent`}
    >
      <CardBody>
        <div className="flex gap-1 items-start">
          <div className=" rounded-md p-1">
            {" "}
            <HandCoins
              size={44}
              strokeWidth={1}
              className="text-secondary dark:text-white/90"
            />
          </div>{" "}
          <div className="flex gap-y-2 flex-col px-4">
            {!filteredProjects && (
              <Skeleton
                className="text-3xl font-bold w-[1rem] h-[1rem] p-[1.2rem] rounded-md"
                isLoaded={filteredProjects as unknown as boolean}
              />
            )}
            {filteredProjects && (
              <p className={cn(`text-3xl font-bold w-fit `, dmSans.className)}>
                {filteredProjects?.length}
              </p>
            )}
            <p className="text-base  text-default-500">Created Projects </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CreatedProjectCountCard;
