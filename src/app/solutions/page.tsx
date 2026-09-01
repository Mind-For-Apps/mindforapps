import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SolutionCard } from "@/components/sections/SolutionCard";
import { getSolutionCards } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions — Mind For Apps",
  description:
    "Launch a production-ready app powered by our proprietary industry blueprints. We bridge the gap between rigid templates and costly custom development — combining a battle-tested functional core with your branding, workflows, and API integrations to get you live in under 3 weeks.",
};

export default async function SolutionsPage() {
  const solutions = await getSolutionCards();

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-4.75 bg-brand-surface px-6 pt-10 pb-15 text-center sm:px-25">
          <h1 className="text-3xl font-normal text-black sm:text-[40px]">
            Ready-Made App <span className="font-bold">Solutions</span>,
            Tailored to Your Industry
          </h1>
          <p className="max-w-240 text-base text-[rgb(51,51,51)]">
            Launch a production-ready app powered by our proprietary industry
            blueprints. We bridge the gap between rigid templates and costly
            custom development — combining a battle-tested functional core
            with your branding, workflows, and API integrations to get you
            live in under 3 weeks.
          </p>
        </section>

        {/* <section className="bg-black px-6 py-16 sm:px-25"> */}
        <section className="bg-black px-6 pt-20 pb-12">
          {solutions.length === 0 ? (
            <p className="text-center text-white">No solutions published yet.</p>
          ) : (
            <div className="mx-auto grid max-w-300 grid-cols-1 gap-8 min-[800px]:grid-cols-2">
              {solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>
          )}
        </section>

        <section className="flex justify-center bg-brand-surface px-6 py-8">
          <div className="flex w-full max-w-300 min-h-63.75 flex-col items-start justify-between gap-6 rounded-[20px] bg-white p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:p-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-medium text-black sm:text-[40px]">
                Didn&rsquo;t find what suits you best?
              </h2>
              <p className="text-base text-black/60 sm:text-[22px] font-medium">
                Find the appropriate service for you.
              </p>
            </div>
            <Link
              href="/services"
              className="flex h-21.75 w-61.75 shrink-0 items-center justify-center gap-3 rounded-full bg-black px-8 text-[20px] font-medium text-white transition-colors hover:bg-[linear-gradient(45deg,rgb(31,120,255),rgb(65,62,207),rgb(111,47,239))]"
            >
              Services
              <Image
                src="/images/services/nav/arrow-right-white.svg"
                alt=""
                width={13}
                height={15}
              />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
