"use client";

import { useState } from "react";
import Image from "next/image";

const HOVER_ZONE_COUNT = 4;

function captionFor(title: string, index: number) {
  return index === 0 ? `${title} Main Image` : `${title} Image ${index}`;
}

export function TemplateGalleryImage({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div
      className="relative aspect-video w-full overflow-hidden bg-brand-surface"
      onMouseLeave={() => setActiveIndex(0)}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={captionFor(title, index)}
          title={captionFor(title, index)}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-150 ease-out ${
            index === activeIndex ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute inset-0 z-20 flex">
          {Array.from({ length: HOVER_ZONE_COUNT }, (_, i) => i + 1).map(
            (zoneIndex) => (
              <div
                key={zoneIndex}
                className="relative h-full flex-1"
                onMouseEnter={() =>
                  images[zoneIndex] && setActiveIndex(zoneIndex)
                }
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1.75 bg-[#154adccc] transition-opacity duration-150 ease-out ${
                    activeIndex === zoneIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}
