"use client";

import Image from "next/image";
import googleLogo from "../../public/google.png";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center font-semibold justify-center h-14 px-6 mt-4 md:text-xl  transition-colors duration-300 bg-white border-2 border-black/20 text-black rounded-lg focus:shadow-outline hover:bg-slate-200"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-4">Continue with Google</span>
    </button>
  );
}


