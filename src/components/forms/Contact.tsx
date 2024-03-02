import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { useParams } from "next/navigation";
import { createContact } from "@/actions/contact/createContact";
import { useAppSelector } from "@/lib/redux/hooks";
import { Contact } from "@prisma/client";
import SubmitButton from "./SubmitButton";

function ContactForm() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const { location, adress } = (project?.contact as Contact) || {
    location: "",
    adress: "",
  };

  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus();

  const handleFormSubmission = async (formData: FormData) => {
    try {
      const contactData = {
        projectId: projectId as string,
        address: formData.get("email") as string,
        location: formData.get("location") as string,
      };
      await createContact(contactData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-[10px]">
      <form action={handleFormSubmission}>
        <Input
          defaultValue={adress}
          type="email"
          isRequired
          name={"email"}
          label="Email Address"
          variant="flat"
        />
        <br />
        <Input
          defaultValue={location}
          isRequired
          name={"location"}
          label="Location"
          variant="flat"
        />
        <br/>
       <SubmitButton/>
      </form>
    </div>
  );
}

export default ContactForm;
