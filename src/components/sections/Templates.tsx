import { getCategories } from "@/lib/categories";
import { getTemplateCards } from "@/lib/templates";
import { TemplatesBrowser } from "./TemplatesBrowser";

export async function Templates() {
  const [categories, templates] = await Promise.all([
    getCategories(),
    getTemplateCards(),
  ]);

  if (categories.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 bg-black px-6 py-16 sm:px-[100px]">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-[45px]">
          Templates
        </h2>
        <p className="max-w-[700px] text-base text-white/70 sm:text-lg">
          Ready-made Bubble templates and no-code app templates designed for
          fast product launch and easy customization.
        </p>
      </div>

      <TemplatesBrowser categories={categories} templates={templates} />
    </section>
  );
}
