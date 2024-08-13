import React from "react";
import { H5 } from "./ui/typography";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function Brands() {
  const brands = [
    "/images/brands/boss.png",
    "/images/brands/dansam.png",
    "/images/brands/flamingo.png",
    "/images/brands/hettie.png",
    "/images/brands/hunter.png",
    "/images/brands/kanine.png",
    "/images/brands/max_molly.png",
    "/images/brands/milk_pepper.png",
    "/images/brands/tommy_hilfiger.png",
    "/images/brands/united_pets_milano.png",
  ];
  return (
    <div>
      <H5
        className={
          "border-primary/10 text-center font-medium uppercase tracking-wider"
        }
      >
        Brands
      </H5>
      <InfiniteMovingCards items={brands} />
    </div>
  );
}
