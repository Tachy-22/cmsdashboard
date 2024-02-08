"use client";
import useIsMounted from "@/lib/useIsMounted";
import { Button, Skeleton } from "@nextui-org/react";
import { Menu, X, XSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { textStyle } from "@/lib/twStyles";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [position, setPosition] = useState("static");
  const pathname = usePathname();

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
        setIsMobileMenuOpen(true);
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
      text: "Dashboard ",
      path: "",
      key: "dashboard",
    },
    {
      text: "Create Project",
      path: "create-project",
      key: "create-project",
    },
    {
      text: "Create Product",
      path: "create-product",
      key: "create-product",
    },
  ];

  return (
    <aside
      className={`   transition-all duration-500  backdrop-brightness-[96%] h-full flex flex-col  backdrop-blur-2xl  dark:bg-black-950/10 z-50  border-r dark:border-stone-900 border-stone-200   ${
        isMobileMenuOpen
          ? `  lg:w-[20rem] w-screen ${position} `
          : "-translate-x-full absolute left-0 z-50 "
      } `}
    >
      <Button
        variant="bordered"
        isIconOnly
        onPress={toggleMobileMenu}
        className={`rounded-md  absolute top-[0.5rem]  ${textStyle}  text-xl z-50 ${
          isMobileMenuOpen ? "right-[0.5rem] " : "translate-x-[3rem] right-0"
        }`}
      >
        <Skeleton className="rounded-md" isLoaded={isMounted}>
          {!isMobileMenuOpen ? <Menu /> : <X />}
        </Skeleton>
      </Button>

      <section
        className={`" border-b dark:border-stone-900   w-full flex flex-col justify-center items-start gap-4 p-4 h-fit`}
      >
        <h2 className="">Admin pannel</h2>
      </section>
      <section className="flex flex-col   h-full py-[2rem] gap-2">
        {links.map((link, index) => (
          <Link
            onClick={() =>
              position === "absolute" && setIsMobileMenuOpen(false)
            }
            key={index}
            href={`/dashboard/${link.path}`}
            className={`p-3 dark:hover:backdrop-brightness-[10%] hover:backdrop-brightness-[80%] transition-all duration-100 border-r-5    ${
              pathname.split("/").at(-1) === link.key
                ? "dark:backdrop-brightness-[70%] backdrop-brightness-[90%] border-r-5  border-primary "
                : "border-transparent"
            }`}
          >
            {link.text}
          </Link>
        ))}
      </section>
    </aside>
  );
};

export default SideMenu;
