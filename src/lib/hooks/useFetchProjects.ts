"use client";
import { getProjects } from "@/actions/projects/getProjects";
import { Project } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useFetchProjects = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchProjects = async () => {
        const projects = (await getProjects(
          session?.user?.projectIds
        )) as unknown as Project[];
        setProjects(projects);
        setIsLoading(false);
      };

      if (status === "authenticated") {
        fetchProjects();
      }
    } catch (error) {}
  }, [session?.user?.projectIds, status]);
  return [projects, isLoading];
};

export default useFetchProjects;
