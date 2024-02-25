"use client";
import React, { SetStateAction, useState } from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import MultiImageUploadModal from "../MultiImageUploadModal";
import { createHero } from "@/actions/hero/createHero";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { Thero } from "../SectionTabs";

type heroTypes = {
  heroData: Thero,
  setHero : React.Dispatch<SetStateAction<Thero>>
}

function Hero({heroData, setHero}:heroTypes) {
  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus()
  const createHeroData = async (formData: FormData) => {

    try {
      const heroFormData = {
        title: formData.get("title") as string,
        projectId: projectId as string,
        description: formData.get("description") as string,
        button: formData.get("cta_name") as string,
        images: [""],
      };
    const success = await createHero(heroFormData);
    } catch (err) {
      console.log(err);
    
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    setHero((prev: Thero) => ({ ...prev, [name]: event.target.value }));
  };
  
  return (
    <React.Fragment>
      <MultiImageUploadModal  />
      <br />
      <form action={createHeroData}>
        <div className="flex gap-x-3">
          <Input onChange={(e)=>{handleChange(e, "title")}} isRequired label="Hero Title" name="title" value={heroData?.title} 
        
          variant="flat" />
          <Input
          value={heroData?.button}
            isRequired
            label="Button name"
            name="cta_name"
            variant="flat"
          />
        </div>
        <Textarea
          isRequired
          value={heroData?.description}
          label="Description"
          name="description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
        />
        <Button
          type="submit"
          className="w-full max-w-[150px] flex items-center gap-x-2 ml-auto mt-3 "
          color="primary"
          radius="sm"
          isLoading={pending}
        >
          {pending ? "Saving" : "Submit"}
        </Button>
      </form>
    </React.Fragment>
  );
}

export default Hero;
