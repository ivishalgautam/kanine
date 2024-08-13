"use client";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { MdOutlineShoppingCart } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { MainContext } from "@/store/context";
import Search from "./Search";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { Button, buttonVariants } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const navList = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Contact", href: "/contact" },
];

const fetchTempCart = async () => {
  const { data } = await http().get(endpoints.cart.getAll);
  return data;
};

export default function Header() {
  const { user } = useContext(MainContext);

  const { data } = useQuery({
    queryFn: fetchTempCart,
    queryKey: ["cart-items"],
    enabled: !!user,
  });

  return (
    <header>
      <div className="container space-y-1 p-4">
        {/* <HeaderTop user={user} /> */}
        <Navbar data={data} user={user} />
      </div>
    </header>
  );
}

export const HeaderTop = ({ user }) => {
  return (
    <div className="bg-secondary py-2.5">
      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <FaPhone />
          <span>+91 9811632400</span>
        </div>
        <Link
          href={user ? "/customer/profile" : "/login"}
          className="capitalize"
        >
          {user ? `${user?.first_name} ${user?.last_name}` : "Log In / Sign Up"}
        </Link>
      </div>
    </div>
  );
};

export const Navbar = ({ data, user }) => {
  return (
    <div className="">
      <div className="flex items-center justify-between gap-2">
        <div className="flex-1 md:hidden">
          <NavigateSheet />
        </div>

        <div className="hidden flex-1 md:block">
          <NavList />
        </div>

        <div className="flex-1">
          <Link href={"/"}>
            <Image
              width={100}
              height={100}
              src={"/logo.avif"}
              alt="logo"
              className="w-[5rem] object-contain object-center"
            />
          </Link>
        </div>

        {user ? (
          <div className="flex items-center justify-center gap-4">
            <Link href={"/cart"} className="relative">
              {data?.length ? (
                <span className="absolute -right-4 -top-4 flex size-6 items-center justify-center rounded-full bg-primary text-sm text-white">
                  {data?.length}
                </span>
              ) : (
                <></>
              )}
              <MdOutlineShoppingCart size={30} />
            </Link>
            <Link href={"/customer/overview"}>
              <FiUser size={30} />
            </Link>
          </div>
        ) : (
          <Link
            href={"/login"}
            className={`${buttonVariants("primary")} !rounded-lg`}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export function NavList() {
  const pathname = usePathname();
  return (
    <nav className="">
      <ul className="flex items-center justify-start gap-4">
        {navList.map(({ title, href }) => (
          <li
            key={title}
            className={cn(
              "rounded-md px-4 py-1 transition-all hover:text-primary",
              {
                "border border-primary bg-primary text-white hover:text-white":
                  title.toLowerCase() === "home"
                    ? pathname === "/"
                    : pathname.includes(href),
              },
            )}
          >
            <Link href={href} className={cn("text-sm")}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNavList() {
  return (
    <nav className="">
      <ul className="flex flex-col items-center justify-start">
        {navList.map(({ title, href }) => (
          <li
            key={title}
            className="w-full rounded-lg hover:bg-primary hover:text-white"
          >
            <Link
              href={href}
              className="block h-full w-full p-4 text-sm font-semibold"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function NavigateSheet() {
  return (
    <Sheet>
      <SheetTrigger
        className={`${buttonVariants({ variant: "outline" })}`}
        size="icon"
      >
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent side="left" className="h-full w-full bg-white">
        <SheetHeader>
          <SheetTitle>
            <div className="size-16">
              <Image
                src={"/logo.avif"}
                width={100}
                height={100}
                alt="Kanine"
                className="aspect-video h-full w-full object-contain object-center"
              />
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <MobileNavList />
        </div>
      </SheetContent>
    </Sheet>
  );
}
