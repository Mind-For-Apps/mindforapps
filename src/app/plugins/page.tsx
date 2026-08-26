import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getPluginCards, getPluginCategories } from "@/lib/plugins";
import { PluginsBrowser } from "./PluginsBrowser";

export const metadata: Metadata = {
  title: "No-Code Plugins for Bubble.io — Mind For Apps",
  description:
    "Powerful no-code plugins for Bubble.io applications. Boost functionality, improve user experience, and save development time with our ready-to-use plugins.",
};

export default async function PluginsPage() {
  const [categories, plugins] = await Promise.all([
    getPluginCategories(),
    getPluginCards(),
  ]);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-3 bg-brand-surface px-6 py-16 text-center sm:px-25">
          <h1 className="text-3xl font-bold text-black sm:text-[45px]">
            Plugins
          </h1>
          <p className="max-w-150 text-base text-black/60 sm:text-lg">
            Powerful No-Code Plugins for Bubble.io Applications
            <br />
            Boost functionality, improve user experience, and save
            development time with our ready-to-use plugins
          </p>
        </section>

        <section className="bg-brand-surface px-6 pb-16 sm:px-25">
          <PluginsBrowser categories={categories} plugins={plugins} />
        </section>
      </main>
      <Footer />
    </>
  );
}
