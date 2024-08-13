import React from "react";
import { H5 } from "./ui/typography";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Image from "next/image";

export default function Press() {
  const press = [
    "/images/press/bloomberg.png",
    "/images/press/etretail.jpg",
    "/images/press/fashion_netwrork.jpg",
    "/images/press/fashion_united.png",
    "/images/press/forbes.png",
    "/images/press/hugo_boss.jpg",
    "/images/press/hyperbeast.png",
    "/images/press/india_retailing.jpg",
    "/images/press/indian_retailer.jpg",
    "/images/press/livemint.jpg",
    "/images/press/pet_product_news.png",
    "/images/press/wwd.png",
  ];

  return (
    <div className="container space-y-4 pb-4">
      <H5
        className={
          "border-primary/10 text-center font-medium uppercase tracking-wider"
        }
      >
        Press
      </H5>
      <div className="grid grid-cols-2 place-items-center gap-[1px] bg-gray-200 p-[1px] pb-[0.5px] pr-[0.5px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {press.map((img, key) => (
          <div
            key={key}
            className="flex w-full items-center justify-center bg-white"
          >
            <figure className="size-24">
              <Image
                src={img}
                width={500}
                height={500}
                alt={img.split("/")[-1]}
                className="aspect-video h-full w-full object-contain object-center"
              />
            </figure>
          </div>
        ))}
      </div>
    </div>
  );
}
