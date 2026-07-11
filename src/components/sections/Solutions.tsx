type SolutionCard = {
  title: string;
  priceLabel?: string;
  estimateLink?: boolean;
  tags: string[];
  moreCount: number;
};

const solutions: SolutionCard[] = [
  {
    title: "Real Estate",
    priceLabel: "Starting at 1500 USD",
    tags: ["Rental Marketplace", "Agent CRM"],
    moreCount: 6,
  },
  {
    title: "EdTech",
    estimateLink: true,
    tags: ["Online Academy", "Kids Courses", "Coaching"],
    moreCount: 5,
  },
  {
    title: "HealthTech",
    estimateLink: true,
    tags: ["Therapy & Coaching", "Kids Courses"],
    moreCount: 5,
  },
];

export function Solutions() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 pt-16 sm:px-[100px]">
      <div className="rounded-full border-[3px] border-brand-purple px-8 py-3 sm:px-11 sm:py-4">
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
            key={solution.title}
            className="flex flex-col gap-6 rounded-t-[25px] bg-black px-8 py-9"
          >
            <div className="flex flex-col gap-1">
              <p className="text-3xl font-bold tracking-[-0.77px] text-white">
                {solution.title}
              </p>
              {solution.priceLabel && (
                <p className="text-xl font-medium tracking-[-0.55px] text-white">
                  {solution.priceLabel}
                </p>
              )}
              {solution.estimateLink && (
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
              <span className="text-lg font-medium tracking-[-0.396px] text-white">
                +{solution.moreCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
