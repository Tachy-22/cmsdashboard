import AnalyticsCard from "@/components/AnalyticsCard";
import ProjectsTable from "@/components/ProjectsTable";

const page = () => {
  return (
    <div className="flex flex-col w-full h-full p-[1rem] md:p-[2rem] xl:px-[4rem] gap-4">
      <div className="grid grid-cols-3 gap-6 h-full ">
        {Array.from({ length: 3 }, (_, i) => i).map((_, i) => {
          return <AnalyticsCard key={i} />;
        })}
      </div>
      <div className="h-full w-full">
        <ProjectsTable />
      </div>
    </div>
  );
};

export default page;
