import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import GoogleSignInButton from "./GoogleSignInButton";
import LoginCredentialsForm from "./LoginCredentialsForm";
import Image from "next/image";

export default async function LogInForm() {
  const session = await getServerSession(authOptions);

  console.log("Session: ", session);

  if (session) return redirect("/dashboard");

  return (
    <div className="w-[90vw] sm:w-[60vw] lg:w-[50vw] max-w-[50rem] flex flex-col items-center justify-center min-h-fit py-2 px-6 lg:px-0 md:pt-0 pt-[4rem] gap-5">
      <div className="flex justify-center items-center py-2 ">
        <Image
          width={242}
          height={120}
          alt=" application logo"
          className=" w-[8rem]  "
          src="/demoLogo.png"
        />
      </div>
      <div className=" w-full ">
        <GoogleSignInButton />
      </div>
      <LoginCredentialsForm />
    </div>
  );
}
