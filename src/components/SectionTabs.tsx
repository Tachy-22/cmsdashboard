"use client";
import React, { useEffect, useState } from "react";
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
import Hero from "@/components/forms/Hero";
import About from "@/components/forms/About";
import Products from "@/components/forms/Products";
import Contact from "@/components/forms/Contact";
import Testimonial from "@/components/forms/Testimonial";
import Footer from "@/components/forms/Footer";
import { getHero } from "@/actions/hero/getHero";
import { useParams } from "next/navigation";
import { getAbout } from "@/actions/about/getAbout";
export type Thero = {
    title: string,
    button: string,
    description:string
}
export type Tabout = {
  description: string
}
function SectionTabs() {
  const params = useParams();
  const [hero, setHero] = useState<Thero>();
  const [about, setAbout] = useState<Tabout>();
  const [producst, setProducts] = useState();
  const [contact, setContact] = useState();
  useEffect(() => {
    getHero(params.id as string)
      .then((res: any) => {
        setHero(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
      getAbout(params.id as string).then((res: any)=>{
        setAbout(res)
      }).catch((err)=>{
        console.log(err)
      })
  }, []);

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
            <p className="text-md">Munros Collection</p>
            <p className="text-small text-default-500">John Adams</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-y-2 text-default-500">
          <div className="flex items-center gap-x-2">
            <p>Project Id:</p>
            <p>{params.id}</p>
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
          <Tab className="w-full block" title={"Hero"}>
            <Hero heroData={hero} setHero={setHero} />
          </Tab>

          <Tab className="w-full block" title={"About"}>
            <About
            data={about}
            setAbout={setAbout}
            />
          </Tab>

          <Tab className="w-full block" title={"Products"}>
            <Products />
          </Tab>

          <Tab className="w-full block" title={"Contact"}>
            <Contact />
          </Tab>

          <Tab className="w-full block" title={"Testimonial"}>
            <Testimonial />
          </Tab>

          <Tab className="w-full block" title={"Footer"}>
            <Footer />
          </Tab>
        </Tabs>
      </div>
      <div className="mt-10"></div>
    </section>
  );
}

export default SectionTabs;
