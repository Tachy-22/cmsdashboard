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
      case "profile":
        // Call the function for the "profile" key
        // For example: handleProfileAction();
        break;
      case "settings":
        // Call the function for the "settings" key
        // For example: handleSettingsAction();
        break;
      case "team_settings":
        // Call the function for the "team_settings" key
        // For example: handleTeamSettingsAction();
        break;
      case "analytics":
        // Call the function for the "analytics" key
        // For example: handleAnalyticsAction();
        break;
      case "system":
        // Call the function for the "system" key
        // For example: handleSystemAction();
        break;
      case "configurations":
        // Call the function for the "configurations" key
        // For example: handleConfigurationsAction();
        break;
      case "help_and_feedback":
        // Call the function for the "help_and_feedback" key
        // For example: handleHelpAndFeedbackAction();
        break;
      case "logout":
        signOut();
        break;
      default:
        // Handle the default case if none of the above keys match
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
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
