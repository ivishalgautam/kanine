"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

let imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_DOMAIN;

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export default function ProductSlideshow({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)],
  );

  return (
    <div className="space-y-4">
      <div ref={sliderRef} className="keen-slider">
        {images?.map((img, ind) => (
          <div key={ind} className="keen-slider__slide rounded-xl">
            <Image
              src={`${imageBaseUrl}/${img}`}
              width={1000}
              height={1000}
              alt={`slide-${ind}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
        {loaded && instanceRef.current && (
          <Arrows currentSlide={currentSlide} instanceRef={instanceRef} />
        )}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {images?.map((img, ind) => (
          <div
            key={ind}
            className={`keen-slider__slide number-slide${ind + 1} rounded-xl`}
          >
            <Image
              src={`${imageBaseUrl}/${img}`}
              width={500}
              height={500}
              alt={`slide-${ind}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export function Arrows({ instanceRef, currentSlide }) {
  return (
    <>
      <div className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white p-1 text-primary transition-all hover:bg-primary hover:text-white">
        <ChevronLeft
          size={40}
          onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
          disabled={currentSlide === 0}
        />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2  cursor-pointer rounded-full bg-white p-1 text-primary transition-all hover:bg-primary hover:text-white">
        <ChevronRight
          size={40}
          onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
          disabled={
            currentSlide === instanceRef.current.track.details.slides.length - 1
          }
        />
      </div>
    </>
  );
}
