"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { Chip, Input, User } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
}
type TProjectAdmins = {
  searchInput: string;
  isOwner: (user: UserData) => boolean;
  admins: UserData[];
  matchedUsers: UserData[];
  handleAdminAddition: (user: UserData) => void;
  handleAdminRemoval: (selectedAdmin: UserData) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// ... (imports and interfaces)

const ProjectAdmins = ({
  searchInput,
  isOwner,
  admins,
  matchedUsers,
  handleAdminAddition,
  handleAdminRemoval,
  handleSearchChange,
}: TProjectAdmins) => {
  console.log("myAdmins:", admins);

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="project_name" className="font- text-md">
        Admins
      </label>
      <Input
        type="text"
        label=""
        labelPlacement={`outside`}
        placeholder="Add admin by email or name..."
        description={""}
        classNames={{
          inputWrapper: ["bg-white", "dark:bg-stone-700"],
        }}
        variant="faded"
        startContent={<SearchIcon size={18} />}
        value={searchInput}
        onChange={handleSearchChange}
      />
      <div className=" flex gap-3 overflow-hidden w-full ">
        {matchedUsers.map((user) => (
          <div
            onClick={() => handleAdminAddition(user)}
            key={user.id}
            className="flex flex-col gap-1 cursor-pointer my-2  hover:backdrop-brightness-[90%] border  p-2 rounded-lg"
          >
            <p className="text-sm"> {user.name}</p>
            <p className=" font-light text-xs text-gray-500"> {user.email}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col  w-full justify-between items-start ">
        {admins?.map((admin) => (
          <div
            key={admin?.id}
            className="flex w-full justify-between hover:backdrop-brightness-95 rounded-md px-2 py-3 items-center"
          >
            <User
              avatarProps={{
                src: admin?.image,
              }}
              className="transition-transform cursor-pointer "
              description={admin?.email}
              name={
                <h2 className="flex gap-2 justify-between">
                  {admin?.name}
                  {isOwner(admin) && (
                    <Chip
                      size="sm"
                      className="flex justify-center items-center text-xs"
                      variant="flat"
                    >
                      you
                    </Chip>
                  )}
                </h2>
              }
            />
            {!isOwner(admin) && (
              <Button
                onPress={() => handleAdminRemoval(admin)}
                size="sm"
                color="danger"
                variant="bordered"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAdmins;
