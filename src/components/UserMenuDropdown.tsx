"use client";
import React, { useCallback } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function UserMenuDropdown({ session }: { session: any | null }) {
  const handleActions = useCallback((key: string) => {
    switch (key) {
      case "help_and_feedback":
        break;
      case "logout":
        signOut();
        break;
      default:
        break;
    }
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: `${session?.user?.image as string}`,
            }}
            className="transition-transform"
            description={session?.user?.email as string}
            name={session?.user?.name as string}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          onAction={(key: any) => handleActions(key)}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{session?.user?.name as string}</p>
          </DropdownItem>

          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
