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
    <div className="w-[90vw] sm:w-[60vw] lg:w-[50vw] max-w-[55rem] flex flex-col items-center justify-center min-h-fit  gap-5 bg-white/70 dark:bg-secondary  p-6 rounded-md shadow-lg">
      <div className="flex justify-center items-center py-2 ">
        <Image
          width={242}
          height={120}
          alt=" application logo"
          className=" w-[8rem] scale-[90%] "
          src="/demoLogo.png "
        />
      </div>
      <div className=" w-full ">
        <GoogleSignInButton />
      </div>
      <LoginCredentialsForm />
    </div>
  );
}
