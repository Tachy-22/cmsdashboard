import React, { SetStateAction } from 'react'
import { Button, Textarea } from '@nextui-org/react'
import { useParams } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { createAbout } from '@/actions/about/createAbout';
type aboutTypes = {
  data: TAbout,
  setAbout: React.Dispatch<SetStateAction<TAbout>>
}
function About({data, setAbout}:aboutTypes) {
  const params = useParams();
  const projectId = params?.id;
  const { pending } = useFormStatus()
  const createAboutData = async (formData: FormData) => {

    try {
      const heroFormData = {
        projectId: projectId as string,
        description: formData.get("description") as string,
      };
    const success = await createAbout(heroFormData);
    } catch (err) {
      console.log(err);
    
    }
  };
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setAbout((prev: TAbout) => ({ ...prev, description: e.target.value }));
  }
    return (
        <React.Fragment>
      <form action={createAboutData}>


        <Textarea
          isRequired
          label="About description"
          placeholder="Enter your business description"
          className="mt-3"
          minRows={20}
          name='description'
          onChange={(e)=>{handleChange(e)}}
          value={data?.description}
        />
        <Button
          className="w-full max-w-[150px] ml-auto mt-3 block"
          color="primary"
          radius="sm"
          type='submit'
          isLoading={pending}
        >
          Save
        </Button>
        </form>
      </React.Fragment>

    )
}

export default About
