import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
function Hero() {
  return (
    <React.Fragment>
      <div className="flex gap-x-3">
        <Input isRequired label="Hero Title" variant="flat" />
        <Input isRequired label="Button name" variant="flat" />
      </div>
      <Textarea
        isRequired
        label="Description"
        placeholder="Enter your business description"
        className="mt-3"
        minRows={20}
      />
      <Button
        className="w-full max-w-[150px] ml-auto mt-3 block"
        color="primary"
        radius="sm"
      >
        Submit
      </Button>
    </React.Fragment>
  );
}

export default Hero;
