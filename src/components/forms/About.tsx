import React from 'react'
import { Button, Textarea } from '@nextui-org/react'
function About() {
    return (
        <React.Fragment>
      
        <Textarea
          isRequired
          label="About description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
        />
        <Button
          className="w-full max-w-[150px] ml-auto mt-3 block"
          color="primary"
          radius="sm"
        >
          Save
        </Button>
      </React.Fragment>
    )
}

export default About
