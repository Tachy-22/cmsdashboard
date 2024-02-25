"use client";
import React from "react";
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
import Hero from "@/components/forms/Hero";
import About from "@/components/forms/About";
import Products from "@/components/forms/Products";
import Contact from "@/components/forms/Contact";
import Testimonial from "@/components/forms/Testimonial";
import Footer from "@/components/forms/Footer";
import { createHero } from "@/actions/hero/createHero";
function page() {
  const tabs = [
    {
      title: "Hero",
      component: Hero,
    },
    {
      title: "About",
      component: About,
    },
    {
      title: "Products",
      component: Products,
    },
    {
      title: "Contact",
      component: Contact,
    },
    {
      title: "Testimonial",
      component: Testimonial,
    },
    {
      title: "Footer",
      component: Footer,
    },
  ];

  const handleHeroCreationDemo = async () => {
    const result = await createHero({
      title: "demo title",
      projectId: "65d8fc6b442a59889a567dd3",
      description: "demo description",
      button: "demo button",
      images: [""],
    });
    console.log({ result });
  };
  return (
    <section className="w-full max-w-[1304px] ">
      <Button onPress={handleHeroCreationDemo}>demo</Button>
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
            <p className="text-md">Munros Collection</p>
            <p className="text-small text-default-500">John Adams</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-y-2 text-default-500">
          <div className="flex items-center gap-x-2">
            <p>Project Id:</p>
            <p>456sbsbWbbc092db</p>
          </div>
          <div className="flex items-center gap-x-2">
            <p>Creation Date:</p>
            <p>20 Feb, 2024</p>
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
          {tabs.map((tab) => (
            <Tab className="w-full block" key={tab.title} title={tab.title}>
              <tab.component />
            </Tab>
          ))}
        </Tabs>
      </div>
      <div className="mt-10"></div>
    </section>
  );
}

export default page;
