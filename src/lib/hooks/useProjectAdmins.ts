import { Session } from "next-auth";
import React, { useCallback, useState } from "react";

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string;
}

const useProjectAdmins = (session: Session | null) => {
  const [dummyUsers, setDummyUsers] = useState<UserData[]>([
    {
      id: "2",
      name: "jane Doe",
      email: "jane.doe@example.com",
      image: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
  ]);

  const [admins, setAdmins] = useState<UserData[]>([session?.user as UserData]);

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
        setDummyUsers((prevUsers) => [...prevUsers, selectedAdmin]);
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
      const status = user.email === session?.user?.email;
      return status;
    },
    [session?.user?.email]
  );
  return {
    searchInput,
    isOwner,
    admins,
    matchedUsers,
    handleAdminAddition,
    handleAdminRemoval,
    handleSearchChange,
  };
};

export default useProjectAdmins;
