"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type SolutionPill = {
  id: string;
  title: string;
  price_label: string | null;
  is_estimate_link: boolean;
  tags: string[];
  more_count: number;
};

const AUTOPLAY_INTERVAL_MS = 3500;
const ANIMATION_DURATION_MS = 500;

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function SolutionsCarousel({
  solutions,
}: {
  solutions: SolutionPill[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const didDragRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  function getStep() {
    const el = scrollRef.current;
    if (!el) return 400;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = 24;
    return card ? card.getBoundingClientRect().width + gap : 400;
  }

  // Animates scrollLeft manually (rather than the native `scrollBy`/`scrollTo`
  // smooth behavior, which browsers can throttle for script-initiated scrolls
  // that don't originate from a user gesture, e.g. a setInterval tick) so
  // autoplay animates reliably regardless of how it was triggered.
  function animateScrollTo(target: number) {
    const el = scrollRef.current;
    if (!el) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const start = el.scrollLeft;
    const distance = target - start;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
      const el2 = scrollRef.current;
      if (!el2) return;
      el2.scrollLeft = start + distance * easeInOutQuad(progress);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
      }
    }

    animationFrameRef.current = requestAnimationFrame(step);
  }

  function scrollByStep(direction: 1 | -1) {
    const el = scrollRef.current;
    if (!el) return;
    animateScrollTo(el.scrollLeft + direction * getStep());
  }

  // Autoplay: the interval runs for the component's whole lifetime and just
  // checks pausedRef each tick, so brief hover/drag pauses don't reset the
  // countdown (a state-driven effect dependency would tear down and restart
  // the timer on every pause toggle, meaning it could never reach a full
  // interval if paused/resumed in quick succession).
  useEffect(() => {
    if (solutions.length < 2) return;

    const id = setInterval(() => {
      if (pausedRef.current || isDraggingRef.current) return;
      const el = scrollRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
      animateScrollTo(atEnd ? 0 : el.scrollLeft + getStep());
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [solutions.length]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  function handlePointerDown(e: React.MouseEvent) {
    const el = scrollRef.current;
    if (!el) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    isDraggingRef.current = true;
    didDragRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollLeftRef.current = el.scrollLeft;
  }

  function handlePointerMove(e: React.MouseEvent) {
    if (!isDraggingRef.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 3) didDragRef.current = true;
    el.scrollLeft = dragStartScrollLeftRef.current - delta;
  }

  function endDrag() {
    isDraggingRef.current = false;
  }

  function handleCardClickCapture(e: React.MouseEvent) {
    // Suppress the click that follows a drag so links aren't accidentally
    // triggered when the user was just dragging the carousel.
    if (didDragRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        endDrag();
        pausedRef.current = false;
      }}
    >
      <div
        ref={scrollRef}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={endDrag}
        onClickCapture={handleCardClickCapture}
        className="scrollbar-hide flex w-full cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-6 select-none active:cursor-grabbing sm:px-25"
      >
        {solutions.map((solution) => (
          <div
            key={solution.id}
            data-card
            className="flex w-75 shrink-0 snap-start flex-col gap-6 rounded-t-[25px] bg-black px-8 py-9 sm:w-95"
          >
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold tracking-[-0.77px] text-white">
                {solution.title}
              </p>
              {solution.price_label && (
                <p className="text-xl font-medium tracking-[-0.55px] text-white">
                  {solution.price_label}
                </p>
              )}
              {solution.is_estimate_link && (
                <p className="text-lg font-medium tracking-[-0.22px] text-brand-accent underline">
                  Get Your Estimation
                </p>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {solution.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#e9e9e9] px-4 py-2 text-sm font-medium tracking-[-0.165px] text-black"
                >
                  {tag}
                </span>
              ))}
              {solution.more_count > 0 && (
                <span className="text-lg font-medium tracking-[-0.396px] text-white">
                  +{solution.more_count}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollByStep(-1)}
        aria-label="Previous solution"
        disabled={solutions.length < 2}
        className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] disabled:opacity-30 sm:block"
      >
        <Image src="/images/nav-arrow-left.svg" alt="" width={20} height={20} className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollByStep(1)}
        aria-label="Next solution"
        disabled={solutions.length < 2}
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow-[0px_4px_19.3px_0px_rgba(0,0,0,0.14)] disabled:opacity-30 sm:block"
      >
        <Image src="/images/nav-arrow-right.svg" alt="" width={20} height={20} className="size-5 -scale-x-100" />
      </button>
    </div>
  );
}
