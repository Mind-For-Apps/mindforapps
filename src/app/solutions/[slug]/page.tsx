import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TrustCarousel } from "@/components/sections/TrustCarousel";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { getSolutionBySlug } from "@/lib/solutions";
import { getTestimonials } from "@/lib/testimonials";
import { getRealEstateFaqs } from "@/lib/faqs";
import { StickyNav } from "./StickyNav";
import { FeaturesBrowser } from "./FeaturesBrowser";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { CalendlyWidget } from "@/components/CalendlyWidget";

const AUDIENCE_ICONS = ["onboarding", "community", "roles", "map"];
const INCLUDED_FEATURE_ICONS = [
  "reports",
  "community",
  "roles",
  "search",
  "payments",
  "messaging",
  "admin",
  "listings",
  "security",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolutionBySlug(slug);
  if (!solution) return {};

  return {
    title: `${solution.title} — Mind For Apps`,
    description: solution.text0 ?? undefined,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [solution, testimonials] = await Promise.all([
    getSolutionBySlug(slug),
    getTestimonials(),
  ]);

  if (!solution) notFound();

  const faqs = slug === "real-estate" ? await getRealEstateFaqs() : [];

  const buildPriceRange =
    solution.buildPriceLow && solution.buildPriceHigh
      ? `$${solution.buildPriceLow.toLocaleString()} – $${solution.buildPriceHigh.toLocaleString()}`
      : solution.priceLabel;

  return (
    <>
      <Header />
      <main id="top" className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 sm:px-25">
          <div className="mx-auto grid w-full max-w-300 grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-semibold leading-[1.2] text-black sm:text-[50px]">
                {solution.titleLong ?? solution.title}
              </h1>
              {solution.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {solution.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#e0e4ff] px-4 py-2 text-sm font-medium text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {solution.text0 && (
                <p className="max-w-135 text-lg text-black/70">
                  {solution.text0}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#pricing"
                  className="bg-brand-gradient flex h-15 items-center rounded-full px-8 text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  Book a Free Strategy Call
                </a>
                <a
                  href="#pricing"
                  className="flex h-15 items-center rounded-full bg-black px-8 text-base font-medium text-white transition-opacity hover:opacity-90"
                >
                  Pricing
                </a>
              </div>
            </div>
            {solution.mainImageUrl && (
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-white">
                <Image
                  src={solution.mainImageUrl}
                  alt={solution.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </section>

        <TrustCarousel />

        <StickyNav />

        {(solution.text1 || solution.designedFor.length > 0) && (
          <section
            id="why-us"
            className="relative overflow-hidden bg-brand-surface px-6 py-16 sm:px-25"
          >
            <Image
              src="/images/solution-ribbon-bg.png"
              alt=""
              width={1500}
              height={620}
              className="pointer-events-none absolute right-0 top-0 hidden w-[55%] max-w-225 opacity-90 lg:block"
            />
            <div className="relative mx-auto flex max-w-300 flex-col gap-8">
              <div className="flex flex-col gap-3">
                {solution.text1 && (
                  <>
                    <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                      Who it&rsquo;s built for
                    </p>
                    <h2 className="max-w-175 text-3xl font-bold text-black sm:text-[40px]">
                      {solution.text1}
                    </h2>
                  </>
                )}
                {solution.text2 && (
                  <p className="max-w-150 text-base text-black/70 sm:text-lg">
                    {solution.text2}
                  </p>
                )}
              </div>

              {solution.designedFor.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {solution.designedFor.map((item, i) => (
                    <div
                      key={item}
                      className="flex flex-col gap-3 rounded-2xl bg-white p-6"
                    >
                      <Image
                        src={`/images/icons/${AUDIENCE_ICONS[i % AUDIENCE_ICONS.length]}.svg`}
                        alt=""
                        width={28}
                        height={28}
                        className="size-7"
                      />
                      <p className="font-semibold text-black">{item}</p>
                    </div>
                  ))}
                </div>
              )}

              {solution.imagesCover.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {solution.imagesCover.map((url, i) => (
                    <div
                      key={url}
                      className="relative aspect-4/3 overflow-hidden rounded-2xl bg-white"
                    >
                      <Image
                        src={url}
                        alt={`${solution.title} preview ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="bg-brand-surface px-6 pb-16 sm:px-25">
          <div className="mx-auto flex max-w-300 flex-col items-start gap-4 rounded-[25px] bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold text-brand-accent">
                Building for clients?
              </p>
              <p className="text-base text-black/70">
                Our platform is built for white-labelling — resell it under
                your own brand, domain, and colour scheme. Ask us how on the{" "}
                <a
                  href="#start-your-project"
                  className="font-medium text-brand-accent underline"
                >
                  strategy call
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {(solution.text6 || solution.withMfa.length > 0) && (
          <section className="flex flex-col items-center gap-10 bg-black px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-4">
              {solution.text6 && (
                <h2 className="max-w-200 text-3xl font-bold text-white sm:text-[40px]">
                  {solution.text6}
                </h2>
              )}
              {solution.text3 && (
                <p className="max-w-175 text-base text-white/70 sm:text-lg">
                  {solution.text3}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-250 grid-cols-1 gap-6 sm:grid-cols-2">
              {solution.withoutMfa.length > 0 && (
                <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-br from-[#7a3d5e] to-[#3d2a4a] p-6 text-left">
                  <p className="text-lg font-semibold text-white">
                    ✕ Without MindForApps
                  </p>
                  <ul className="flex flex-col gap-3">
                    {solution.withoutMfa.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/90"
                      >
                        <span>✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {solution.withMfa.length > 0 && (
                <div className="flex flex-col gap-4 rounded-2xl bg-linear-to-br from-[#3d5ea3] to-[#4fb8d8] p-6 text-left">
                  <p className="text-lg font-semibold text-white">
                    ✓ With MindForApps
                  </p>
                  <ul className="flex flex-col gap-3">
                    {solution.withMfa.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-white/90"
                      >
                        <span>✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {solution.featureCategories.length > 0 && (
          <section
            id="features"
            className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25"
          >
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                {solution.text7 ?? "Everything you need."}{" "}
                <span className="text-brand-accent">One solution.</span>
              </h2>
              {solution.text4 && (
                <p className="max-w-175 text-base text-black/60 sm:text-lg">
                  {solution.text4}
                </p>
              )}
            </div>
            <FeaturesBrowser categories={solution.featureCategories} />
          </section>
        )}

        <section className="relative overflow-hidden bg-brand-surface px-6 py-16 sm:px-25">
          <Image
            src="/images/solution-ribbon-bg.png"
            alt=""
            width={1500}
            height={620}
            className="pointer-events-none absolute -left-32 bottom-0 hidden w-[60%] max-w-225 rotate-180 opacity-80 lg:block"
          />
          <div className="relative mx-auto flex max-w-300 flex-col items-center gap-10 text-center">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                Real platforms. Real results.
              </p>
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                Numbers we&rsquo;ve shipped — not estimates.
              </h2>
              <p className="max-w-125 text-base text-black/60">
                Metrics from real projects. Not projections.
              </p>
            </div>
            <div className="grid w-full max-w-225 grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: "4 weeks", label: "Average time to launch" },
                {
                  value: "65%",
                  label: "Average time and budget saving vs custom development",
                },
                { value: "100%", label: "Client ownership of the created platform" },
                { value: "$50K+", label: "Average saving vs hiring a dev team" },
              ].map((stat) => (
                <div
                  key={stat.value}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5"
                >
                  <span className="rounded-full bg-brand-accent px-5 py-2 text-lg font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-black/70">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-surface px-6 pb-16 sm:px-25">
          <div className="mx-auto flex max-w-300 flex-col items-start gap-4 rounded-[25px] bg-white p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xl font-bold text-brand-accent">
              Want to speak to a past client before committing?
            </p>
            <a
              href="#start-your-project"
              className="bg-brand-gradient shrink-0 rounded-full px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Book a Free Strategy Call
            </a>
          </div>
        </section>

        <section
          id="process"
          className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25"
        >
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
              Our process
            </p>
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              From brief to live in 3 steps.
            </h2>
            <p className="max-w-150 text-base text-black/60">
              Three steps. Clarity and support on each step. Every stage has a
              clear deliverable. You always know what comes next.
            </p>
          </div>
          <div className="flex w-full max-w-300 flex-col gap-4">
            {[
              {
                n: 1,
                duration: "1–2 days",
                title: "Strategy",
                description:
                  "We scope your niche, user flows, and feature requirements together. You come with an idea — and leave with a plan.",
                outcome: "You have a locked scope and a fixed price",
                checklist: [
                  "Feature list agreed",
                  "Budget confirmed",
                  "Start date set",
                ],
                bg: "bg-[#dbeafe]",
              },
              {
                n: 2,
                duration: "4 weeks",
                title: "Build & brand",
                description: `We configure your ${solution.title} platform, brand it to your identity, connect your tools, and QA everything.`,
                outcome: "You have a tested, branded, ready-to-launch platform",
                checklist: [
                  "Platform live in staging",
                  "Integrations connected",
                  "Full QA completed",
                ],
                bg: "bg-[#e3ddfa]",
              },
              {
                n: 3,
                duration: "Ongoing",
                title: "Launch & support",
                description:
                  "We go live together. Then we stay on — for bug fixes, new features, and scaling as you grow.",
                outcome: "You're live — with a long-term technical partner",
                checklist: [
                  "Platform live on your domain",
                  "Team onboarded and trained",
                  "Support channel open",
                ],
                bg: "bg-[#d8cef7]",
              },
            ].map((step) => (
              <div
                key={step.n}
                className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-white text-left lg:grid-cols-2"
              >
                <div className="flex flex-col gap-3 p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand-accent text-sm font-bold text-white">
                      {step.n}
                    </span>
                    <span className="rounded-full bg-brand-accent/10 px-4 py-1.5 text-sm font-medium text-brand-accent">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xl font-bold text-black">{step.title}</p>
                  <p className="text-base text-black/60">{step.description}</p>
                </div>
                <div className={`flex flex-col gap-3 p-8 ${step.bg}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/50">
                    After this step
                  </p>
                  <p className="text-base font-semibold text-black">
                    {step.outcome}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {step.checklist.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-black/80"
                      >
                        <span className="text-brand-accent">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {solution.tools.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                Built with
              </p>
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                Tools you can trust. Stack you own.
              </h2>
              <p className="max-w-150 text-base text-black/60">
                Every tool in your platform is enterprise-grade, widely
                supported, and fully transferable.
              </p>
            </div>
            <div className="grid w-full max-w-300 grid-cols-2 gap-4 sm:grid-cols-4">
              {solution.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex flex-col items-center gap-4 rounded-2xl bg-white p-6"
                >
                  {tool.icon_url && (
                    <Image
                      src={tool.icon_url}
                      alt=""
                      width={40}
                      height={40}
                      className="size-10 object-contain"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-black/50">Built with</p>
                    <p className="text-sm font-semibold text-black">
                      {tool.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {solution.includedFeatures.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-accent">
                What&rsquo;s included
              </p>
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                Everything ready on day one.
              </h2>
              {solution.text8 && (
                <p className="max-w-150 text-base text-black/60">
                  No loose ends, no setup left for you to figure out. Your
                  platform launches complete.
                </p>
              )}
            </div>
            <div className="grid w-full max-w-300 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solution.includedFeatures.map((feature, i) => (
                <div
                  key={feature.title}
                  className="flex flex-col items-start gap-3 rounded-2xl bg-white p-6 text-left"
                >
                  {feature.iconUrl ? (
                    <Image
                      src={feature.iconUrl}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                  ) : (
                    <Image
                      src={`/images/icons/${INCLUDED_FEATURE_ICONS[i % INCLUDED_FEATURE_ICONS.length]}.svg`}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7"
                    />
                  )}
                  <p className="font-semibold text-black">{feature.title}</p>
                  {feature.subtitle && (
                    <p className="text-sm text-black/50">{feature.subtitle}</p>
                  )}
                  {feature.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-brand-surface px-3 py-1 text-xs font-medium text-black/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {testimonials.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-black px-6 py-16 text-center sm:px-25">
            <h2 className="max-w-175 text-3xl font-bold text-white sm:text-[40px]">
              What our clients say about working with us:
            </h2>
            <TestimonialsCarousel items={testimonials} />
          </section>
        )}

        {faqs.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 sm:px-25">
            <div className="flex flex-col items-center gap-3 text-center">
              <h2 className="text-3xl font-bold text-black sm:text-[40px]">
                FAQ
              </h2>
              <p className="max-w-150 text-base text-black/60">
                Clear answers about no-code app development, Bubble services,
                timelines, pricing, and scalability.
              </p>
            </div>
            <FAQAccordion items={faqs} />
          </section>
        )}

        <section
          id="pricing"
          className="flex flex-col items-center gap-10 bg-white px-6 py-16 text-center sm:px-25"
        >
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              Transparent pricing. No surprises.
            </h2>
            <p className="max-w-150 text-base text-black/60">
              Two tracks — one for getting your platform live, one for
              growing it after launch. Every quote is fixed and confirmed in
              writing before we start.
            </p>
          </div>
          <div className="grid w-full max-w-250 grid-cols-1 gap-6 bg-linear-to-br from-[#e0e4ff] to-[#dff0ff] p-1 sm:grid-cols-2">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 text-left">
              <span className="w-fit rounded-full bg-[#e0e4ff] px-4 py-1.5 text-sm font-medium text-brand-accent">
                Build track
              </span>
              <p className="text-xl font-bold text-black">
                Launch your platform
              </p>
              <p className="text-sm text-black/60">
                A fully configured, branded {solution.title} platform — live
                in weeks. One-time fixed price, scoped before we start.
              </p>
              {buildPriceRange && (
                <p className="text-3xl font-bold text-black">
                  {buildPriceRange}{" "}
                  <span className="text-base font-normal text-black/50">
                    / one-time
                  </span>
                </p>
              )}
              {solution.buildChecklist.length > 0 && (
                <ul className="flex flex-col gap-2 border-t border-black/10 pt-4">
                  {solution.buildChecklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-black/70"
                    >
                      <span className="text-brand-accent">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              <a
                href="#start-your-project"
                className="bg-brand-gradient mt-auto flex h-14 items-center justify-center rounded-full text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Book a Free Strategy Call
              </a>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl bg-white p-8 text-left">
              <span className="w-fit rounded-full bg-[#e0e4ff] px-4 py-1.5 text-sm font-medium text-brand-accent">
                Grow track
              </span>
              <p className="text-xl font-bold text-black">
                Keep growing after launch
              </p>
              <p className="text-sm text-black/60">
                Monthly retainer for ongoing support, new features, and
                platform iterations. Start when you&rsquo;re ready — no
                lock-in.
              </p>
              <p className="text-3xl font-bold text-black">
                $300 – $600{" "}
                <span className="text-base font-normal text-black/50">
                  / month
                </span>
              </p>
              <ul className="flex flex-col gap-2 border-t border-black/10 pt-4">
                {[
                  "Bug fixes and platform maintenance",
                  "Feature iterations and improvements",
                  "Priority response and turnaround",
                  "New integration and automation scoping",
                  "Monthly review call and roadmap planning",
                  "Scope and pricing confirmed monthly in writing",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-black/70"
                  >
                    <span className="text-brand-accent">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#start-your-project"
                className="mt-auto flex h-14 items-center justify-center rounded-full border border-brand-accent text-sm font-medium text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
              >
                Ask us about Grow Track
              </a>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden bg-brand-surface px-6 py-16 sm:px-25"
        >
          <Image
            src="/images/solution-cta-ribbon.webp"
            alt=""
            width={800}
            height={800}
            className="pointer-events-none absolute -left-20 bottom-0 hidden w-75 lg:block"
          />
          <Image
            src="/images/solution-cta-ribbon.webp"
            alt=""
            width={800}
            height={800}
            className="pointer-events-none absolute -right-20 top-0 hidden w-75 scale-x-[-1] lg:block"
          />
          <div className="relative mx-auto flex max-w-200 flex-col items-center gap-3 text-center">
            <h2 className="text-3xl font-bold text-black sm:text-[40px]">
              Ready to launch your {solution.title} platform?
            </h2>
            <p className="text-base text-black/60">
              Tell us about your project — we&rsquo;ll map the full scope.
            </p>
          </div>
          <div className="relative mx-auto mt-10 max-w-175">
            <CalendlyWidget />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
