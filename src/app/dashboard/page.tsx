import { getProjects } from "@/actions/projects/getProjects";
import { findUser } from "@/actions/users/findUser";
import CreateProjectModalButton from "@/components/CreateProjectModalButton";
import CreatedProjectCountCard from "@/components/CreatedProjectCountCard";
import ProjectCountCard from "@/components/ProjectCountCard";
import ProjectsTable from "@/components/ProjectsTable";
import { adminAuthRequired } from "@/lib/auth";
import { Project } from "@prisma/client";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession();
  const dbUser = (await findUser(
    session?.user?.email as string
  )) as unknown as TSession;
  const isAdmin = await adminAuthRequired();

  const projects = await getProjects(dbUser?.projectIds as string[], isAdmin);

  return (
    <div className="flex flex-col w-full  px-[1rem] lg:px-[4.5rem] py-[3rem]    gap-[2rem] -y-auto">
      <div className="flex flex-col sm:flex-row sm:items-center items-start  gap-5 h-fit py-3 ">
        <ProjectCountCard projects={projects as Project[]} />
        {isAdmin && (
          <CreatedProjectCountCard projects={projects as Project[]} />
        )}
      </div>
      {isAdmin ? (
        <div className="">
          <CreateProjectModalButton />
        </div>
      ) : (
        <h2>My Projects: </h2>
      )}

      <div className="h-  w-full">
        <ProjectsTable projects={projects as Project[]} />
      </div>
    </div>
  );
};

export default page;
