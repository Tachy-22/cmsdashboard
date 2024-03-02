import { getProjectContent } from "@/actions/projects/getProjectContent";
import SectionTabs from "@/components/SectionTabs";
import { Project } from "@prisma/client";

async function page({ params }: { params: { id: string } }) {
  const projectData = (await getProjectContent(params.id)) as Project;

  return <SectionTabs projectData={projectData} />;
}

export default page;
