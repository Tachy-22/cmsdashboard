import React from "react";
import { Button, Input } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { useParams } from "next/navigation";
import { createContact } from "@/actions/contact/createContact";

function Contact() {
  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus()
  console.log(pending)
  const mutateContact = async (formData: FormData) => {

    try {
      const heroFormData = {
        projectId: projectId as string,
        address: formData.get("email") as string,
        location: formData.get("location") as string,
      };
     await createContact(heroFormData);
    } catch (err) {
      console.log(err);
    
    }
  };
  return (
    <div className="space-y-[10px]">
        <form action={mutateContact} >

  
      <Input type="email" isRequired name={"email"} label="Email Address" variant="flat" />
      <br/>
      <Input isRequired name={"location"} label="Location" variant="flat" />
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

export default Contact;
