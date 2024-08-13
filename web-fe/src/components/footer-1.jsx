import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white lg:grid lg:grid-cols-5">
      <div className="relative flex h-32 items-start justify-center py-16 lg:col-span-1 lg:h-full">
        <figure className="size-20">
          <Image
            src="/logo.avif"
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-contain object-center"
          />
        </figure>
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-4 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <div className="space-y-2">
              <p>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {" "}
                  Call us{" "}
                </span>

                <Link
                  href="#"
                  className="block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl"
                >
                  8800524995
                </Link>
              </p>

              <div>
                Kanine Pets World India Private Limited. 80P, Sector 34,
                Gurgaon, Haryana-122001.
              </div>
            </div>

            <ul className="mt-8 flex gap-6">
              <li>
                <IconBrandFacebook className="cursor-pointer transition-colors hover:text-primary" />
              </li>
              <li>
                <IconBrandInstagram className="cursor-pointer transition-colors hover:text-primary" />
              </li>
              <li>
                <IconBrandLinkedin className="cursor-pointer transition-colors hover:text-primary" />
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="font-medium text-gray-900">Quick Shop</p>

              <ul className="mt-6 space-y-4 text-sm">
                {[
                  {
                    name: "BOSS Dog Accessories",
                    href: "#",
                  },
                  {
                    name: "Tommy Hilfiger",
                    href: "#",
                  },
                  {
                    name: "Kanine",
                    href: "#",
                  },
                  {
                    name: "Milk & Pepper",
                    href: "#",
                  },
                  {
                    name: "Hunter",
                    href: "#",
                  },
                  {
                    name: "Max and Molly",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-gray-700 transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-medium text-gray-900">Useful links</p>

              <ul className="mt-6 space-y-4 text-sm">
                {[
                  {
                    name: "About us",
                    href: "#",
                  },
                  {
                    name: "Contact",
                    href: "#",
                  },
                  {
                    name: "Privacy Policy",
                    href: "#",
                  },
                  {
                    name: "Shipping Policy",
                    href: "#",
                  },
                  {
                    name: "Refund Policy",
                    href: "#",
                  },
                  {
                    name: "Terms of Service",
                    href: "#",
                  },
                ].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="text-gray-700 transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-12">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              {[
                { name: "Terms & Conditions", href: "#" },
                { name: "Privacy Policy", href: "#" },
                { name: "Cookies", href: "#" },
              ].map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className="text-gray-500 transition hover:opacity-75"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-gray-500 sm:mt-0">
              &copy; {new Date().getFullYear()}. Kanine. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
