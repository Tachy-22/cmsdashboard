"use client";
import useIsMounted from "@/lib/useIsMounted";
import { Button, Skeleton } from "@nextui-org/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { bgStyle, textStyle } from "@/lib/twStyles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAdminAuthIsRequired from "@/lib/hooks/useAdminAuthIsRequired";

const SideMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState("static");
  const pathname = usePathname();
  const isAdmin = useAdminAuthIsRequired();
  const isMounted = useIsMounted();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Function to handle window resize
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 1024) {
        setPosition("absolute");
        setIsMobileMenuOpen(false);
      } else {
        setPosition("static");
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const links = [
    {
      text: "Dashboard",
      path: "",
      key: "dashboard",
    },
    ,
    {
      text: "Deployments",
      path: "deployments",
      key: "deployments",
    },
  ];

  return (
    <aside
      className={`   transition-all duration-500  h-full flex flex-col   backdrop-brightness-[96%] backdrop-blur-2xl  ${bgStyle}   dark:border-stone-900 border-stone-200 z-50  border-r   ${
        isMobileMenuOpen
          ? `  lg:w-[20rem] w-screen ${position} `
          : "-translate-x-full absolute left-0 z-50 "
      } `}
    >
      <Button
        variant="bordered"
        isIconOnly
        onPress={toggleMobileMenu}
        className={`rounded-md  absolute top-[1rem]  ${textStyle}  text-xl z-50 ${
          isMobileMenuOpen
            ? "right-[0.5rem] "
            : "md:translate-x-[3rem] translate-x-[3.5rem] right-0"
        }`}
      >
        <Skeleton className="rounded-md" isLoaded={isMounted}>
          {!isMobileMenuOpen ? <Menu /> : <X />}
        </Skeleton>
      </Button>

      <section
        className={` border-b dark:border-stone-900   w-full flex flex-col justify-center items-start gap-4 p-4 pb-5 h-fit`}
      >
        <h2 className="text-xl">Admin pannel</h2>
      </section>
      <section className="flex flex-col   h-full py-[2rem] gap-2">
        {links.map((link, index) => (
          <Link
            onClick={() =>
              position === "absolute" && setIsMobileMenuOpen(false)
            }
            key={index}
            href={`/dashboard/${link?.path}`}
            className={`p-4 dark:hover:backdrop-brightness-[10%] hover:backdrop-brightness-[80%] transition-all duration-100 border-r-5    ${
              pathname.split("/").at(-1) === link?.key
                ? "dark:backdrop-brightness-[70%] backdrop-brightness-[90%] border-r-5  border-primary "
                : "border-transparent"
            }`}
          >
            {link?.text}
          </Link>
        ))}
        {isAdmin && (
          <Link
            onClick={() =>
              position === "absolute" && setIsMobileMenuOpen(false)
            }
            href={`/dashboard/add-admin`}
            className={`p-4 dark:hover:backdrop-brightness-[10%] hover:backdrop-brightness-[80%] transition-all duration-100 border-r-5    ${
              pathname.split("/").at(-1) === "add-admin"
                ? "dark:backdrop-brightness-[70%] backdrop-brightness-[90%] border-r-5  border-primary "
                : "border-transparent"
            }`}
          >
            Add Admin
          </Link>
        )}
      </section>
    </aside>
  );
};

export default SideMenu;
