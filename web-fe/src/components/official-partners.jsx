import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";
import Image from "next/image";
import { H5 } from "./ui/typography";

export function OfficialPartners() {
  const features = [
    {
      title: "BOSS",
      description: "hugo boss partners with kanine to product premium dog wear",
      icon: "/images/brands/boss.png",
    },
    {
      title: "TOMMY HILFIGER",
      description: "tommy hilfiger to launch collection for dogs.",
      icon: "/images/brands/tommy_hilfiger.png",
    },
    {
      title: "HUNTER",
      description: "hunter to launch dog apparel with kanine.",
      icon: "/images/brands/hunter.png",
    },
    {
      title: "HETTIE",
      description: "hettie to launch dog apparel with kanine.",
      icon: "/images/brands/hettie.png",
    },
  ];
  return (
    <div>
      <H5 className={"text-center font-normal uppercase tracking-wider"}>
        official kanine partners
      </H5>
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "group/feature relative flex  flex-col py-10 lg:border-r",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b",
      )}
    >
      {index < 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-t from-primary/10 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      {index >= 4 && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition duration-200 group-hover/feature:opacity-100" />
      )}
      <div className="relative z-10 mb-4 px-10 text-neutral-600">
        <Image src={icon} width={100} height={100} alt={icon.split("/")[-1]} />
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-primary dark:bg-neutral-700" />
        <span className="inline-block text-neutral-800 transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm capitalize text-neutral-600">
        {description}
      </p>
    </div>
  );
};
