import { getProjects } from "@/actions/projects/getProjects";
import { findUser } from "@/actions/users/findUser";
import AnalyticsCard from "@/components/AnalyticsCard";
import CreateProjectModalButton from "@/components/CreateProjectModalButton";
import ProjectsTable from "@/components/ProjectsTable";
import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  const dbUser = (await findUser(session?.user?.email as string)) as unknown as TSession;
  const projects = await getProjects(dbUser?.projectIds as string[]);
  console.log("server session:", session);
  console.log({ projects });
  return (
    <div className="flex flex-col w-full h-full p-[1rem] md:p-[2rem] xl:px-[4rem] gap-[3rem]">
      <div className="grid grid-cols-3 gap-6 h-fit ">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => {
          return <AnalyticsCard key={i} />;
        })}
      </div>
      <div className="">
        {" "}
        <CreateProjectModalButton />
      </div>

      <div className="h-full w-full">
        <ProjectsTable projects={projects as Project[]} />
      </div>
    </div>
  );
};

export default page;
