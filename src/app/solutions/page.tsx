import type { Metadata } from "next";
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
        <section className="flex flex-col items-center gap-3 bg-brand-surface px-6 py-16 text-center sm:px-[100px]">
          <h1 className="max-w-[900px] text-3xl font-medium text-black sm:text-[45px]">
            Ready-Made App <span className="font-bold">Solutions</span>,
            Tailored to Your Industry
          </h1>
          <p className="max-w-[900px] text-base text-brand-gray sm:text-lg">
            Launch a production-ready app powered by our proprietary industry
            blueprints. We bridge the gap between rigid templates and costly
            custom development — combining a battle-tested functional core
            with your branding, workflows, and API integrations to get you
            live in under 3 weeks.
          </p>
        </section>

        <section className="bg-black px-6 py-16 sm:px-[100px]">
          {solutions.length === 0 ? (
            <p className="text-center text-white">No solutions published yet.</p>
          ) : (
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 sm:grid-cols-2">
              {solutions.map((solution) => (
                <SolutionCard key={solution.id} solution={solution} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
