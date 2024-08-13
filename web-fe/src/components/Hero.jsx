"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-[80%]">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={10}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop
      >
        {["/banners/1.webp", "/banners/2.webp", "/banners/3.webp"].map(
          (img, key) => (
            <SwiperSlide key={key}>
              <Image
                src={img}
                width={500}
                height={500}
                alt={`banner-${key}`}
                quality={100}
                className="aspect-video"
              />
            </SwiperSlide>
          ),
        )}
      </Swiper>
    </div>
  );
}
