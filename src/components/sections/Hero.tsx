import Image from "next/image";
import { TrustCarousel } from "./TrustCarousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-[100px] lg:flex lg:h-[725px] lg:items-center lg:py-0">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="-scale-x-100 object-cover object-bottom"
          priority
        />
      </div>
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-8">
        <div className="flex max-w-[560px] flex-col items-start gap-6">
          <h1 className="text-4xl font-semibold leading-[1.2] text-black sm:text-[55px]">
            Launch Your Startup MVP App Without Code
          </h1>
          <p className="text-lg font-medium leading-[1.3] text-brand-gray sm:text-[22px]">
            From idea to a live MVP Application in weeks — we help design and
            develop on Bubble, focused on getting real users and feedback
            fast.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button className="bg-brand-gradient flex h-[60px] items-center rounded-full px-[30px] text-lg font-medium text-white transition-opacity hover:opacity-90 sm:text-[25px]">
              Start Your MVP
            </button>
            <button className="flex h-[60px] items-center rounded-full border border-black bg-black px-[30px] text-lg font-medium text-white transition-opacity hover:opacity-90">
              Book a Consultation
            </button>
          </div>
        </div>
        <TrustCarousel />
      </div>
    </section>
  );
}
