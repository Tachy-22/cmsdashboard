"use client";
import React, { useEffect } from "react";
import {
  Link,
  Card,
  CardBody,
  CardFooter,
  Image,
  CardHeader,
  Divider,
  Tabs,
  Tab,
} from "@nextui-org/react";
import HeroForm from "@/components/forms/Hero";
import AboutForm from "@/components/forms/About";
import ProductsForm from "@/components/forms/Products";
import ContactForm from "@/components/forms/Contact";
import Testimonial from "@/components/forms/Testimonial";
import Footer from "@/components/forms/Footer";
import { useParams } from "next/navigation";
import { Project } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateProject } from "@/lib/redux/projectSlice";

function SectionTabs({ projectData }: { projectData: Project }) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { project } = useAppSelector((state) => state.projectSlice);

  useEffect(() => {
    dispatch(updateProject(projectData as Project));
  }, [dispatch, projectData]);

  const tabData = [
    { title: "Hero", component: <HeroForm /> },
    { title: "About", component: <AboutForm /> },
    { title: "Products", component: <ProductsForm /> },
    { title: "Contact", component: <ContactForm /> },
    { title: "Testimonial", component: <Testimonial /> },
    { title: "Footer", component: <Footer /> },
  ];

  return (
    <section className="w-full max-w-[1304px] ">
      <Card className="max-w-[400px] ml-auto">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{project?.title}</p>
            <p className="text-small text-default-500">
              {project?.creatorName}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-y-2 text-default-500">
          <div className="flex items-center gap-x-2">
            <p>Project Id:</p>
            <p>{params?.id}</p>
          </div>
          <div className="flex items-center gap-x-2">
            <p>Creation Date:</p>
            <p>{project?.createdAt}</p>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link isExternal showAnchorIcon href="http://munrosmenswear.co.uk">
            Visit website to see live preview
          </Link>
        </CardFooter>
      </Card>
      <div className="flex mt-12 flex-wrap gap-4 w-full">
        <Tabs aria-label="Tabs section " className=" mx-auto ">
          {tabData.map((tab, index) => (
            <Tab key={index} className="w-full block" title={tab.title}>
              {tab.component}
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="mt-10"></div>
    </section>
  );
}

export default SectionTabs;
