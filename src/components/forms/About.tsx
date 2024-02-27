import { Fragment } from "react";
import { Textarea } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { createAbout } from "@/actions/about/createAbout";
import { useAppSelector } from "@/lib/redux/hooks";
import SubmitButton from "./SubmitButton";

function AboutForm() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const { description } = project?.about;
  const params = useParams();

  const createAboutData = async (formData: FormData) => {
    try {
      const heroFormData = {
        projectId: params?.id as string,
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
    <Fragment>
      <form action={createAboutData}>
        <Textarea
          isRequired
          label="About description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
          name="description"
          defaultValue={description}
        />
        <SubmitButton />
      </form>
    </Fragment>
  );
}

export default AboutForm;
