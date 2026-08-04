import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCategories } from "@/lib/categories";
import { getFeatureTags, getTemplateCards } from "@/lib/templates";
import { TemplatesPageBrowser } from "./TemplatesPageBrowser";

export const metadata: Metadata = {
  title: "Bubble & No-Code App Templates — Mind For Apps",
  description:
    "Ready-made Bubble templates and no-code app templates designed for fast product launch and easy customization.",
};

export default async function TemplatesPage() {
  const [categories, featureTags, templates] = await Promise.all([
    getCategories(),
    getFeatureTags(),
    getTemplateCards(),
  ]);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-3 bg-brand-surface px-6 py-16 text-center sm:px-25">
          <h1 className="text-3xl font-bold text-black sm:text-[45px]">
            Bubble &amp; No-Code App Templates
          </h1>
          <p className="max-w-150 text-base text-black/60 sm:text-lg">
            Ready-made Bubble templates and no-code app templates designed for
            fast product launch and easy customization.
          </p>
        </section>

        <section className="bg-brand-surface px-6 pb-16 sm:px-25">
          <TemplatesPageBrowser
            categories={categories}
            featureTags={featureTags}
            templates={templates}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
