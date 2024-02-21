"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { findUser } from "@/actions/users/findUser";
import FormUi from "./ui/LoginFormUi";
import Input from "./ui/LoginInput";
import SubmitButton from "./ui/SubmitButton";
import Status from "./ui/LoginStatus";
import GoogleSignInButton from "./GoogleSignInButton";
import { Divider } from "@nextui-org/react";
import { Router } from "lucide-react";

export default function LoginCredentialsForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const { password, email } = Object.fromEntries(formData.entries());

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      console.log({ res });
      if (res?.error) {
        setStatus("Invalid Credentials");
        setIsLoading(false);
        return;
      }
      if (res?.ok) {
        const user = await findUser(email as string);
        setStatus("success");

        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      setStatus("An error occured, try again");

      setIsLoading(false);
    }
  };

  return (
    <FormUi onSubmit={handleSubmit}>
      <div className="flex w-full justify-center items-center gap-2 ">
        <span className="w-full bg-black h-[1px] dark:bg-white" /> or{" "}
        <span className="w-full dark:bg-white h-[1px] bg-black" />
      </div>
      <Input
        type="text"
        name="email"
        placeholder="example@email.com"
        isLoading={isLoading}
      />
      <Input placeholder="*****" name="password" isLoading={isLoading} />
      <SubmitButton isLoading={isLoading}>Login</SubmitButton>
      <Status status={status} />

      <div className="flex md:flex-row flex-col justify-between">
        <Link className="text-sm mt-3 text-left" href={"#"}>
          <span className="underline">
            ForgotPassword?
          </span>
        </Link>
        <Link className="text-sm mt-3 md:text-right" href={"#"}>
          Dont have an account?{" "}
          <span className="underline text-chestnut-950">
            Register
          </span>
        </Link>
      </div>
    </FormUi>
  );
}
