"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ImagesLightbox } from "./ImagesLightbox";

const DEFAULT_BREAKPOINTS = {
  640: { slidesPerView: 1.8, spaceBetween: 20 },
  1000: { slidesPerView: 2.7, spaceBetween: 20 },
  1500: { slidesPerView: 3, spaceBetween: 20 },
};

export function ImagesSlider({
  images,
  slidesPerView = 1.1,
  spaceBetween = 12,
  breakpoints = DEFAULT_BREAKPOINTS,
  fadeInOnReady = false,
  slideMaxWidthClass = "max-w-137.5",
}: {
  images: string[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween?: number }>;
  fadeInOnReady?: boolean;
  // Caps each slide's CSS width regardless of the computed slidesPerView slot
  // width. Fine (effectively a no-op) at the default breakpoints, where the
  // computed slot never exceeds ~540px — but at wider breakpoints the slot
  // outgrows this cap while Swiper still spaces/translates slides using the
  // uncapped slot width, leaving a dead gap after every slide and breaking
  // the loop math. Pass "" to disable it for breakpoints that go wider.
  slideMaxWidthClass?: string;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [ready, setReady] = useState(false);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        loop
        loopAdditionalSlides={0}
        speed={800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        onInit={fadeInOnReady ? () => setReady(true) : undefined}
        className={
          fadeInOnReady
            ? `w-full! px-5! transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`
            : "w-full! px-5!"
        }
      >
        {images.map((url, i) => (
          <SwiperSlide key={url} className={slideMaxWidthClass}>
            <div
              onClick={() => setLightboxIndex(i)}
              className="relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded shadow-[1px_2px_8px_0px_rgba(170,170,170,0.5)]"
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="(min-width: 1500px) 33vw, (min-width: 1000px) 37vw, (min-width: 640px) 55vw, 90vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {lightboxIndex !== null && (
        <ImagesLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
