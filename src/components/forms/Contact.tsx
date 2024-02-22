import React from "react";
import { Button, Input } from "@nextui-org/react";
function Contact() {
  return (
    <div className="space-y-[10px]">
        
      <Input isRequired label="Email Address" variant="flat" />
      <Input isRequired label="Location" variant="flat" />
      <Button
        className="w-full max-w-[150px] ml-auto mt-3 block"
        color="primary"
        radius="sm"
      >
        Submit
      </Button>
    </div>
  );
}

export default Contact;
