import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookConsultationButton } from "@/components/BookConsultationButton";
import {
  ServicesActiveProvider,
  ServicesSidebar,
  ServicesContent,
} from "./ServicesExplorer";
import { AllServicesIncluded } from "./AllServicesIncluded";

export const metadata: Metadata = {
  title: "Services — Mind For Apps",
  description:
    "End-to-end no-code and AI development services. From product discovery and UX/UI design to Bubble development and scalable app growth.",
};

const buttonHoverGradient =
  "hover:bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))]";

export default function ServicesPage() {
  return (
    <>
      <div className="relative overflow-hidden bg-brand-surface pb-12.5">
        <Image
          src="/images/services/services-hero-wave.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top h-[130%]! min-[1451px]:h-full"
        />
        <div className="relative z-10">
          <Header />
          {/* <section className="flex flex-col items-center gap-8 px-6 py-16 text-center sm:px-10 sm:py-24"> */}
          <section className="flex flex-col items-center gap-8 px-6 py-16 text-center sm:px-10">
            <h1 className="max-w-225 text-black">
              <span className="mx-5 mt-0 block text-[40px] font-medium max-[800px]:text-[35px] max-[600px]:text-[30px]">
                One Team.
              </span>
              <span className="mx-5 mt-0 block text-[40px] font-medium max-[800px]:text-[35px] max-[600px]:text-[30px] leading-none">
                All the No-Code Services You Need.
              </span>
            </h1>
            <p className="max-w-177.5 text-[25px] font-normal text-black/70 max-[600px]:text-[22px]">
              End-to-end no-code and AI development services. From product
              discovery and UX/UI design to Bubble development and scalable
              app growth.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5">
              <BookConsultationButton
                // className={`flex h-18.75 min-w-55 max-w-100 items-center justify-center rounded-[20px] bg-black px-8 text-[25px] font-medium text-white transition-colors max-[805px]:text-[22px] ${buttonHoverGradient}`}
                className={`flex h-18.75 w-100 max-[410px]:w-87.5 max-[360px]:w-75 items-center justify-center rounded-[20px] bg-black px-8 text-[25px] font-medium text-white transition-colors max-[805px]:text-[22px] ${buttonHoverGradient}`}
              >
                Book a Free Discovery Call
              </BookConsultationButton>
              <Link
                href="/case-studies"
                // className={`flex h-18.75 min-w-55 max-w-100 items-center justify-center rounded-[20px] border border-black px-8 text-[25px] font-medium text-black transition-colors hover:border-transparent hover:text-white max-[805px]:text-[22px] ${buttonHoverGradient}`}
                className={`flex h-18.75 w-100 max-[410px]:w-87.5 max-[360px]:w-75 items-center justify-center rounded-[20px] border border-black px-8 text-[25px] font-medium text-black transition-colors hover:border-transparent hover:text-white max-[805px]:text-[22px] ${buttonHoverGradient}`}
              >
                View Our Work
              </Link>
            </div>
          </section>
        </div>
      </div>

      <main className="flex flex-1 flex-col">
        <section className="relative bg-black px-6 py-16 text-center sm:px-10">
          <div className="relative z-10 flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold text-white sm:text-[40px]">
              What We Build — And How We Do It
            </h2>
            <p className="max-w-175 text-base text-white/70 sm:text-lg">
              These are the foundational services that power each engagement
              — from first idea to live product.
            </p>
          </div>


        </section>
        <div className="bg-black h-30" />
      </main>

      <ServicesActiveProvider>
        <div className="relative z-10 mx-auto -mt-25 grid max-w-300 grid-cols-1 gap-8 px-6 text-left sm:px-10 lg:grid-cols-[282px_1fr] lg:gap-12 lg:px-0 lg:items-start">
          <div className="lg:sticky lg:top-5">
            <ServicesSidebar />
          </div>
          <ServicesContent />
        </div>
      </ServicesActiveProvider>

      <AllServicesIncluded />

      <Footer />
    </>
  );
}
