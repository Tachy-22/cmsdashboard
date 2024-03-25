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
import { X } from "lucide-react";
import { updateHeroImages } from "@/actions/hero/updateHeroImages";
import DeleteButton from "./DeleteButton";
import { useEdgeStore } from "@/lib/edgestore";

function HeroForm() {
  const { edgestore } = useEdgeStore();

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

  const handleImageDeletion = async (url: string) => {
    const newImages = uniqueImages.filter((image) => image !== url);
    const success = await updateHeroImages(newImages, heroData.id as string);
    if (success) {
      await edgestore.publicFiles.delete({
        url: url,
      });
      toast({
        title: "Image deletion !",
        description: "Hero content updated successfully",
      });
    } else {
      toast({
        title: "Image deletion !",
        description: "An error occured, Hero content was not updated !",
      });
      return;
    }
  };

  return (
    <React.Fragment>
      <div className="w-full  gap-4  flex flex-col justify-between">
        <div className="w-full flex gap-4">
          {uniqueImages?.map((image, id) => (
            <form
              action={async () => {
                await handleImageDeletion(image);
              }}
              key={id}
              className="h-full relative group hover:brightness-75"
            >
              <Image
                src={image}
                height={100}
                width={100}
                alt={`image-${id}`}
                className="h-[6rem]  w-[6rem] rounded-lg "
              />
              <DeleteButton
                isIconOnly
                variant="flat"
                className="absolute -top-2  -right-2 group-hover:flex hidden bg-transparent border-0 text-black  justify-center "
              >
                <X
                  size={18}
                  className="   rounded-full hover:border-red-600 border border-white hover:text-red-600 w-fit"
                />
              </DeleteButton>
            </form>
          ))}
        </div>
        <AddHeroImagesModal getImageUrl={getImageUrl} />
      </div>

      <br />
      <form action={createHeroData}>
        <div className="flex md:flex-row flex-col gap-3">
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
