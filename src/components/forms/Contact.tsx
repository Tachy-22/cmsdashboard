import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { useParams } from "next/navigation";
import { createContact } from "@/actions/contact/createContact";
import { useAppSelector } from "@/lib/redux/hooks";
import { Contact } from "@prisma/client";

function ContactForm() {
  const { project } = useAppSelector((state) => state.projectSlice);
  const { location, adress } = project?.contact as Contact;

  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus();
  console.log(pending);

  const mutateContact = async (formData: FormData) => {
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
      <form action={mutateContact}>
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
        <Button
          className="w-full max-w-[150px] ml-auto mt-3 block"
          color="primary"
          radius="sm"
          type="submit"
          isLoading={pending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
