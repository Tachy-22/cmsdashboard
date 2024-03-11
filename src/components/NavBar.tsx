"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import UserMenuDropdown from "./UserMenuDropdown";
import ThemeToggle from "./ThemeToggle";
import { bgStyle } from "@/lib/twStyles";
import { usePathname } from "next/navigation";

export default function NavBar({ session }: { session: any | null }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "home", path: "/", key: "" },
    { name: "dashboard", path: "/dashboard", key: "dashboard" },
  ];

  return (
    <Navbar
      className={` backdrop-brightness-[96%] backdrop-blur-3xl ${bgStyle}  z-50  border-b dark:border-stone-900 border-stone-200 sticky top-0 `}
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image
              width={100}
              height={100}
              className="min-w-[4rem]"
              src="/demoLogo.png"
              alt="logo"
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden lg:flex gap-4" justify="center">
        {menuItems.map(({ name, path, key }, id) => (
          <NavbarItem key={id} isActive={pathname.split("/").at(-1) === key}>
            <Link
              color={
                pathname.split("/").at(-1) === key ? "primary" : "foreground"
              }
              href={path}
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {session ? (
          <div className=" flex gap-4 justify-center items-center ">
            <UserMenuDropdown session={session} />
            <ThemeToggle />
          </div>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="default" href="/login" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
