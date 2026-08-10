import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SolutionsCarousel } from "./SolutionsCarousel";

export async function Solutions() {
  const supabase = await createClient();
  const { data: solutions } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 pt-16">
      <div className="flex flex-col items-center gap-8 px-6 sm:px-25">
        <div className="flex h-15 items-center rounded-full border-[3px] border-brand-purple px-8 sm:px-7 max-w-51">
          <Link
            href="/solutions"
            className="text-brand-gradient cursor-pointer text-2xl font-medium sm:text-[31px]"
          >
            Solutions
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <p className="max-w-240.5 text-2xl text-black sm:text-[32px]">
            Industry-specific MVP App Solutions built to launch fast
          </p>
          <p className="max-w-152 text-base text-black sm:text-lg">
            Select your industry framework, apply your branding, connect your
            tools and integrations and go live within 3 weeks
          </p>
        </div>
      </div>

      <SolutionsCarousel
        solutions={solutions.map((solution) => ({
          id: solution.id,
          title: solution.title,
          price_label: solution.price_label,
          is_estimate_link: solution.is_estimate_link,
          tags: solution.tags ?? [],
          more_count: solution.more_count,
        }))}
      />
    </section>
  );
}
