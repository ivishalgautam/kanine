"use client";
import { H3, H5, H6 } from "./ui/typography";
import Spinner from "./Spinner";
import { useQuery } from "@tanstack/react-query";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import { Swiper, SwiperSlide } from "swiper/react";
import CategoryCard from "./cards/category";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "./ui/button";

const breakpoints = {
  1200: {
    slidesPerView: 6,
    spaceBetween: 24,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 20,
  },
  550: {
    slidesPerView: 3,
    spaceBetween: 12,
  },
  500: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  0: {
    slidesPerView: 2,
    spaceBetween: 12,
  },
};

export const fetchCategories = async () => {
  const { data } = await http().get(
    `${endpoints.categories.getAll}?featured=true`,
  );
  return data;
};

export default function FeaturedCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-categories"],
    queryFn: fetchCategories,
    enabled: false,
  });

  const categories = [
    {
      name: "Category 1",
      href: "/images/category/1.jpg",
      products: "50",
    },
    {
      name: "Category 2",
      href: "/images/category/2.jpg",
      products: "125",
    },
    {
      name: "Category 3",
      href: "/images/category/3.jpg",
      products: "70",
    },
    {
      name: "Category 4",
      href: "/images/category/4.jpg",
      products: "65",
    },
    {
      name: "Category 1",
      href: "/images/category/1.jpg",
      products: "50",
    },
    {
      name: "Category 2",
      href: "/images/category/2.jpg",
      products: "125",
    },
    {
      name: "Category 3",
      href: "/images/category/3.jpg",
      products: "70",
    },
    {
      name: "Category 4",
      href: "/images/category/4.jpg",
      products: "65",
    },
  ];

  return (
    <div className="container space-y-4">
      <H5 className={"text-center font-normal uppercase tracking-wider"}>
        shop by category
      </H5>
      <div className="">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          breakpoints={breakpoints}
          modules={[Navigation]}
          navigation
        >
          {categories.map((item, ind) => (
            <SwiperSlide key={ind}>
              <div className="flex flex-col items-center justify-center space-y-4">
                <figure className="relative size-44 overflow-hidden rounded-full transition-all">
                  <Image
                    src={item.href}
                    width={500}
                    height={500}
                    alt={item.href.split("/")[-1]}
                    quality={100}
                    className="h-full w-full object-cover object-center"
                  />
                </figure>
                <div className="space-y-1">
                  <H6 className={"text-center tracking-wider"}>{item.name}</H6>
                  <div className="text-center text-sm text-primary">
                    {item.products} Products
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="">
        {/* <Swiper
            spaceBetween={50}
            slidesPerView={1}
            breakpoints={breakpoints}
            modules={[Navigation]}
            navigation
          >
            {data?.map(({ id, slug, name, image }) => (
              <SwiperSlide key={id}>
                <CategoryCard slug={slug} name={name} image={image} />
              </SwiperSlide>
            ))}
          </Swiper> */}
      </div>
    </div>
  );
}
