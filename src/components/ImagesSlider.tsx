"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export function ImagesSlider({ images }: { images: string[] }) {
  return (
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
      slidesPerView={1.1}
      spaceBetween={12}
      breakpoints={{
        640: { slidesPerView: 1.8, spaceBetween: 20 },
        1000: { slidesPerView: 2.7, spaceBetween: 20 },
        1500: { slidesPerView: 3, spaceBetween: 20 },
      }}
      className="w-full! px-5!"
    >
      {images.map((url, i) => (
        <SwiperSlide key={url} className="max-w-137.5">
          <div className="relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded shadow-[1px_2px_8px_0px_rgba(170,170,170,0.5)]">
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
  );
}
