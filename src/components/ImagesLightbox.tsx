"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export function ImagesLightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}) {
  const goPrev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  );
  const goNext = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 gap-y-5 flex flex-col bg-[rgba(0,0,0,0.7)] py-2 px-1"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-around">
        <span className="text-lg font-medium text-white">
          {index + 1}/{images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-9 items-center justify-center rounded-full bg-white text-black transition-opacity hover:opacity-80"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center">
        {images.length > 1 && (
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="flex shrink-0 items-center justify-center p-2 transition-opacity hover:opacity-70"
          >
            <span className="relative block size-6 sm:size-8">
              <Image
                unoptimized
                src="/images/lightbox-arrow-left.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </button>
        )}

        <div className="relative h-full w-full max-w-4xl">
          <Image
            src={images[index]}
            alt=""
            fill
            sizes="90vw"
            className="object-contain"
          />
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="flex shrink-0 items-center justify-center p-2 transition-opacity hover:opacity-70"
          >
            <span className="relative block size-6 sm:size-8">
              <Image
                unoptimized
                src="/images/lightbox-arrow-right.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}
