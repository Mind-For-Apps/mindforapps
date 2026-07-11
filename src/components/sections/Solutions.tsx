import { createClient } from "@/lib/supabase/server";

export async function Solutions() {
  const supabase = await createClient();
  const { data: solutions } = await supabase
    .from("solutions")
    .select("*")
    .eq("is_published", true)
    .order("sort_order");

  if (!solutions || solutions.length === 0) return null;

  return (
    <section className="flex flex-col items-center gap-8 px-6 pt-16 sm:px-[100px]">
      <div className="flex h-[87px] items-center rounded-full border-[3px] border-brand-purple px-8 sm:px-11">
        <span className="text-brand-gradient text-2xl font-medium sm:text-[45px]">
          Solutions
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <p className="max-w-[962px] text-2xl text-black sm:text-[32px]">
          Industry-specific MVP App Solutions built to launch fast
        </p>
        <p className="max-w-[608px] text-base text-black sm:text-lg">
          Select your industry framework, apply your branding, connect your
          tools and integrations and go live within 3 weeks
        </p>
      </div>

      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-3">
        {solutions.map((solution) => (
          <div
            key={solution.id}
            className="flex flex-col gap-6 rounded-t-[25px] bg-black px-8 py-9"
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
              {(solution.tags ?? []).map((tag: string) => (
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
    </section>
  );
}
