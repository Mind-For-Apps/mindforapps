"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

type Tool = { name: string; icon_url: string | null };

export function ToolsSlider({ tools }: { tools: Tool[] }) {
  return (
    <Swiper
      modules={[Autoplay]}
      loop
      loopAdditionalSlides={0}
      speed={800}
      autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true, }}
      slidesPerView={1.2}
      spaceBetween={20}
      breakpoints={{
        450: { slidesPerView: 1.5 },
        550: { slidesPerView: 2 },
        650: { slidesPerView: 2.5 },
        900: { slidesPerView: 3.5 },
        1200: { slidesPerView: 4.7 },
        1500: { slidesPerView: 5.2 },
        1650: { slidesPerView: 6 },
        1900: { slidesPerView: 7 },
      }}
      className="w-full!"
    >
      {tools.map((tool) => (
        <SwiperSlide key={tool.name}>
          <div className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6">
            {tool.icon_url && (
              <Image
                src={tool.icon_url}
                alt=""
                width={40}
                height={40}
                className="size-10 object-contain"
              />
            )}
            <div className="flex flex-col gap-1">
              <p className="text-xs text-black/50">Built with</p>
              <p className="text-sm font-semibold text-black">{tool.name}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
