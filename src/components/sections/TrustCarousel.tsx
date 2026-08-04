"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

type Pill = {
  title: string;
  subtitle?: string;
  icon?: string;
  stat?: string;
};

const pills: Pill[] = [
  { title: "Certified Bubble agency partner", icon: "/images/bubble-cert.svg" },
  { title: "Bubble Certified Agency", stat: "8+ Years" },
  { title: "Platforms Launched", stat: "50+ Platforms" },
  { title: "50+", subtitle: "apps created", icon: "/images/badges/apps-created.svg" },
  {
    title: "Worldwide launched startups in",
    subtitle: "HealthTech, Real Estate, Ed Tech",
    icon: "/images/badges/worldwide-startups.svg",
  },
  {
    title: "5x – 10x faster development",
    subtitle: "than traditional coding",
    icon: "/images/badges/faster-development.svg",
  },
  { title: "Full client ownership", icon: "/images/badges/client-ownership.svg" },
  { title: "65%", subtitle: "cheaper than custom dev", stat: "65% cheaper" },
  {
    title: "Post-launch",
    subtitle: "support included",
    icon: "/images/badges/post-launch-support.svg",
  },
  { title: "NDA-friendly", icon: "/images/badges/nda-friendly.svg" },
  { title: "Fixed-price projects", icon: "/images/badges/fixed-price.svg" },
];

function PillCard({ pill }: { pill: Pill }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[108px] bg-white/60 px-6 py-4 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)]">
      <div className="leading-tight">
        <p className="text-sm font-semibold text-black/80 sm:text-base">
          {pill.title}
        </p>
        {pill.subtitle && (
          <p className="text-xs font-medium text-black/60 sm:text-sm">
            {pill.subtitle}
          </p>
        )}
      </div>
      {pill.icon && (
        <Image
          src={pill.icon}
          alt=""
          width={56}
          height={56}
          className="size-12 shrink-0"
        />
      )}
      {pill.stat && (
        <span className="shrink-0 whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-accent sm:text-lg">
          {pill.stat}
        </span>
      )}
    </div>
  );
}

export function TrustCarousel() {
  return (
    <div className="w-full overflow-hidden pt-6 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop
        freeMode
        slidesPerView="auto"
        spaceBetween={16}
        speed={2000}
        autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove
      >
        {pills.map((pill, i) => (
          <SwiperSlide key={i} style={{ width: "auto" }}>
            <PillCard pill={pill} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
