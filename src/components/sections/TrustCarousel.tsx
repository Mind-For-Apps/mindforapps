"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { isSvgSrc } from "@/lib/is-svg-src";
import type { TrustBadge } from "@/lib/trust-badges";

function PillCard({ badge }: { badge: TrustBadge }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[108px] bg-white/60 px-6 py-4 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)]">
      <div className="leading-tight">
        <p className="text-sm font-semibold text-black/80 sm:text-base">
          {badge.text}
        </p>
        {badge.description && (
          <p className="text-xs font-medium text-black/60 sm:text-sm">
            {badge.description}
          </p>
        )}
      </div>
      {badge.iconUrl && (
        <Image
          unoptimized={isSvgSrc(badge.iconUrl)}
          src={badge.iconUrl}
          alt=""
          width={56}
          height={56}
          className="size-12 shrink-0"
        />
      )}
    </div>
  );
}

export function TrustCarousel({ badges }: { badges: TrustBadge[] }) {
  if (badges.length === 0) return null;

  return (
    <div className="w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <Swiper
        modules={[Autoplay, FreeMode]}
        loop
        loopAdditionalSlides={4}
        slidesPerView="auto"
        speed={800}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        allowTouchMove
      >
        {badges.map((badge) => (
          <SwiperSlide key={badge.id} style={{ width: "auto", padding: "15px" }}>
            <PillCard badge={badge} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
