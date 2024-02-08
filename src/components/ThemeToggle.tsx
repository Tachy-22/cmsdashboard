"use client";
import { useTheme } from "next-themes";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Skeleton,
} from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import useIsMounted from "@/lib/useIsMounted";
import { textStyle } from "@/lib/twStyles";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMounted = useIsMounted();

  const ThemeIcon = () => {
    return (
      <div className={textStyle}>
        {theme === "light" ? <SunIcon /> : <MoonIcon />}
      </div>
    );
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
          <Skeleton className="rounded-md" isLoaded={isMounted}>
            <ThemeIcon />
          </Skeleton>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Action event example"
        onAction={(key: any) => setTheme(key)}
      >
        <DropdownItem key="light">light</DropdownItem>
        <DropdownItem key="dark">dark</DropdownItem>
        <DropdownItem key="system">default</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeToggle;
