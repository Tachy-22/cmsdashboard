import React, { SetStateAction } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { createAbout } from "@/actions/about/createAbout";
import { useAppSelector } from "@/lib/redux/hooks";
type aboutTypes = {
  data: TAbout;
  setAbout: React.Dispatch<SetStateAction<TAbout>>;
};
function About() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const aboutData = project?.about;
  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus();

  const createAboutData = async (formData: FormData) => {
    try {
      const heroFormData = {
        projectId: projectId as string,
        description: formData.get("description") as string,
      };
      const success = await createAbout(heroFormData);
      if (success) {
        console.log("The about content has been updated");
      } else {
        console.log("An error occured while updating the about content");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <form action={createAboutData}>
        <Textarea
          isRequired
          label="About description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
          name="description"
          defaultValue={aboutData?.description}
        />
        <Button
          className="w-full max-w-[150px] ml-auto mt-3 block"
          color="primary"
          radius="sm"
          type="submit"
          isLoading={pending}
        >
          Save
        </Button>
      </form>
    </React.Fragment>
  );
}

export default About;
