"use client";
import React, { useMemo, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import AddHeroImagesModal from "../AddHeroImagesModal";
import { createHero } from "@/actions/hero/createHero";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Hero } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import { useAppSelector } from "@/lib/redux/hooks";
import { useToast } from "../ui/use-toast";

function HeroForm() {
  const { toast } = useToast();
  const { project } = useAppSelector((state) => state.projectSlice);
  const heroData: Hero = project?.hero as Hero;
  const params = useParams();
  const projectId = params?.id;

  const [images, setImages] = useState<string[]>([]);

  const getImageUrl = (url: string) => {
    setImages((prev) => [...prev, url]);
  };
  const uniqueImages = useMemo(
    () => Array.from(new Set([...(heroData?.images || []), ...images])) || [],
    [heroData, images]
  );

  const createHeroData = async (formData: FormData) => {
    try {
      const heroFormData = {
        title: formData.get("title") as string,
        projectId: projectId as string,
        description: formData.get("description") as string,
        button: formData.get("cta_name") as string,
        images: [...(heroData?.images || []), ...images] as string[],
      };
      const success = await createHero(heroFormData);
      if (success) {
        toast({ description: "Hero content updated successfully" });
      } else {
        toast({
          description: "An error occured, Hero content was not updated !",
        });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <div className="w-full  gap-4  flex flex-col justify-between">
        <div className="w-full flex gap-4">
          {uniqueImages?.map((image, id) => (
            <div key={id} className="h-full">
              <Image
                src={image}
                height={100}
                width={100}
                alt={`image-${id}`}
                className="h-[6rem]  w-[6rem] rounded-lg "
              />
            </div>
          ))}
        </div>
        <AddHeroImagesModal getImageUrl={getImageUrl} />
      </div>

      <br />
      <form action={createHeroData}>
        <div className="flex gap-x-3">
          <Input
            isRequired
            label="Hero Title"
            name="title"
            defaultValue={heroData?.title}
            variant="flat"
          />
          <Input
            defaultValue={heroData?.button}
            isRequired
            label="Button name"
            name="cta_name"
            variant="flat"
          />
        </div>
        <Textarea
          isRequired
          defaultValue={heroData?.description}
          label="Description"
          name="description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
        />
        <br />

        <SubmitButton />
      </form>
    </React.Fragment>
  );
}

export default HeroForm;
