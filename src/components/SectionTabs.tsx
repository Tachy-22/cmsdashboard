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
  Button,
} from "@nextui-org/react";
import HeroForm from "@/components/forms/Hero";
import AboutForm from "@/components/forms/About";
import ProductsForm from "@/components/forms/Products";
import ContactForm from "@/components/forms/Contact";
import Testimonial from "@/components/forms/Testimonial";
import Footer from "@/components/forms/Footer";
import { useParams, useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { updateProject } from "@/lib/redux/projectSlice";
import { deleteProject } from "@/actions/projects/deleteProject";
import { useToast } from "./ui/use-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
} from "@nextui-org/react";
import DeleteButton from "./forms/DeleteButton";

function SectionTabs({ projectData }: { projectData: Project }) {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { project } = useAppSelector((state) => state.projectSlice);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const handleProjectDeletion = async () => {
    try {
      const res = await deleteProject(projectData, params?.id as string);

      if (res) {
        toast({ description: " Project has been deleted" });
        router.push("/dashboard");
      } else {
        toast({ description: " Project has not been deleted" });
      }
    } catch (error) {
      toast({
        description: "An error occured:  Project has not been deleted",
      });
    }
  };

  return (
    <section className="w-full max-w-[1304px] md:p-[2rem] p-[1rem] pt-[4rem] md:pt-[2rem] ">
      <Card className="max-w-[400px] ml-auto">
        <CardHeader className="flex gap-3">
          <span
            style={{ backgroundColor: project?.theme }}
            className={` w-[3rem] h-[3rem] rounded-full border `}
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
        <CardFooter className="flex justify-between">
          <Link isExternal showAnchorIcon href="#">
            Visit website to see live preview
          </Link>
          <Button
            onPress={onOpen}
            variant="bordered"
            className=" flex items-center border-red-500 text-red-500"
          >
            Delete
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Delete Project
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-small flex flex-col justify-center items-center  text-foreground text-center">
                      <span className="">
                        {" "}
                        Are you sure you wish to delete this project?
                      </span>
                      <span className=""> This action can not be undone.</span>
                    </p>{" "}
                  </ModalBody>
                  <ModalFooter className="flex items-center">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <form
                      action={handleProjectDeletion}
                      className="px-1 py-2 flex flex-col gap-4 justify-center"
                    >
                      <DeleteButton />
                    </form>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </CardFooter>
      </Card>
      <div className="flex mt-12 flex-wrap gap-4 w-full ">
        <Tabs aria-label="Tabs section " className=" mx-auto overflow-x-auto">
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
