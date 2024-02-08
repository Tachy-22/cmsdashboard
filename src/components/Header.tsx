import React from "react";
import UserButton from "./UserButton";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <div className="flex justify-between items-center h-[5rem] py-3 px-[4rem] w-full ">
      <div className=" w-[30rem]  ">
        {" "}
        <Input
          type="email"
          placeholder="Enter search text here..."
          labelPlacement="outside"
          classNames={{
            base: ["max-w-[40rem]"],
            inputWrapper: ["bg-white", "dark:bg-stone-700"],
          }}
          radius="full"
          isClearable
          variant="faded"
          startContent={<SearchIcon size={18} />}
        />
      </div>
      <div className=" flex gap-4 justify-center items-center ">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
