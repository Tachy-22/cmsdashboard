"use client";
import { Button } from "@nextui-org/react";
import React, { useCallback, useMemo, useState } from "react";
import { Chip, Input, User } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";

interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// ... (imports and interfaces)
 const dummySessionData = {
   id: 1,
   name: "John Doe",
   email: "john.doe@example.com",
   avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
 };

const ProjectAdmins: React.FC = () => {
 
  const [dummyUsers, setDummyUsers] = useState<UserData[]>([
    {
      id: 2,
      name: "jane Doe",
      email: "jane.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      id: 3,
      name: "joeseph Doe",
      email: "joeseph.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
    {
      id: 4,
      name: "jonathan Doe",
      email: "jonathan.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ]);

  const [admins, setAdmins] = useState<UserData[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ]);

  const [matchedUsers, setMatchedUsers] = useState<UserData[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleAdminAddition = useCallback((selectedUser: UserData) => {
    setAdmins((prevAdmins) => [...prevAdmins, selectedUser]);
    setMatchedUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.id)
    );
    setDummyUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== selectedUser.id)
    );
  }, []);

  const handleAdminRemoval = useCallback(
    (selectedAdmin: UserData) => {
      setAdmins((prevUsers) =>
        prevUsers.filter((user) => user.id !== selectedAdmin.id)
      );
      if (
        selectedAdmin.name.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        setMatchedUsers((prevUsers) => [...prevUsers, selectedAdmin]);
      }
    },
    [searchInput]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      if (e.target.value !== "") {
        const filteredUsers = dummyUsers.filter((user) =>
          user.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setMatchedUsers(filteredUsers);
      } else {
        setMatchedUsers([]);
      }
    },
    [dummyUsers]
  );
  const isOwner = useCallback(
    (user: UserData) => {
      const status = user.email === dummySessionData.email;
      return status;
    },
    [dummySessionData.email]
  );

  console.log("dummyUsers:", dummyUsers);

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
        {admins.map((admin) => (
          <div
            key={admin.id}
            className="flex w-full justify-between hover:backdrop-brightness-95 rounded-md px-2 py-3 items-center"
          >
            <User
              avatarProps={{
                src: admin.avatar,
              }}
              className="transition-transform cursor-pointer "
              description={admin.email}
              name={
                <h2 className="flex gap-2 justify-between">
                  {admin.name}
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
