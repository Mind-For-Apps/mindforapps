import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { isSvgSrc } from "@/lib/is-svg-src";
import { ImagesSlider } from "@/components/ImagesSlider";
import { ToolsSlider } from "@/components/ToolsSlider";
import { BulletSection } from "./BulletSection";
import { HighlightText } from "./HighlightText";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return {
    title: caseStudy.seoTitle || `${caseStudy.title} — Mind For Apps`,
    description: caseStudy.seoDescription || caseStudy.context || undefined,
    openGraph: caseStudy.seoImageUrl
      ? { images: [caseStudy.seoImageUrl] }
      : undefined,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) notFound();

  const highlightStats = [
    caseStudy.text1,
    caseStudy.text2,
    caseStudy.text3,
    caseStudy.text4,
    caseStudy.text5,
    caseStudy.text6,
  ].filter((text): text is string => !!text);

  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center gap-11 bg-brand-surface px-6 pt-12 pb-10 text-center sm:px-25">
          <h1 className="max-w-225 text-3xl font-medium text-black sm:text-[40px]">
            {caseStudy.title}
          </h1>
          {caseStudy.tags.length > 0 && (
            // <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-black sm:gap-3.75 sm:text-base">
            <div className="flex flex-wrap items-center justify-center text-sm font-medium text-black sm:text-base">
              {caseStudy.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {i > 0 && <span className="text-black/80">&nbsp;&nbsp;|</span>}
                  {tag}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-wrap items-start justify-between gap-8 bg-black px-6 pt-10 pb-16 sm:px-41">
          {caseStudy.serviceNames.length > 0 && (
            <div>
              <p className="text-sm font-medium text-white/40">Services</p>
              <p className="mt-1 max-w-85 text-lg font-medium text-white">
                {caseStudy.serviceNames.join(", ")}
              </p>
            </div>
          )}
          {caseStudy.deliverables && (
            <div>
              <p className="text-sm font-medium text-white/40">Deliverables</p>
              <p className="mt-1 max-w-54 text-lg font-medium text-white">
                {caseStudy.deliverables}
              </p>
            </div>
          )}
          {caseStudy.tools.length > 0 && (
            <div>
              <p className="text-sm font-medium text-white/40">Tools</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {caseStudy.tools
                  .filter(
                    (tool) => tool.name === "Figma" || tool.name === "Bubble.io",
                  )
                  .map((tool) => {
                    const iconUrl = tool.icon_white_url || tool.icon_url;
                    return (
                      iconUrl && (
                        <Image
                          key={tool.name}
                          unoptimized={isSvgSrc(iconUrl)}
                          src={iconUrl}
                          alt={tool.name}
                          width={24}
                          height={24}
                          className="size-6 object-contain"
                        />
                      )
                    );
                  })}
              </div>
            </div>
          )}
          {caseStudy.timeline && (
            <div>
              <p className="text-sm font-medium text-white/40">Timeline</p>
              <p className="mt-1 text-lg font-medium text-white">
                {caseStudy.timeline}
              </p>
            </div>
          )}
          {caseStudy.websiteUrl && (
            <a
              href={caseStudy.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11.25 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-lg font-medium text-black transition-opacity hover:opacity-90 max-[640px]:w-full max-[640px]:justify-center"
            >
              Live website
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          )}
        </section>

        {caseStudy.headerImages.length > 0 && (
          <section className="bg-brand-surface">
            <div className="bg-[#000000] w-full h-100 max-[1000px]:h-80 max-[800px]:h-60"></div>
            <section className="-mt-100 max-[1000px]:-mt-80 max-[800px]:-mt-60">
            <ImagesSlider
              images={caseStudy.headerImages}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                550: { slidesPerView: 1.5 },
                1300: { slidesPerView: 1.8 },
                1500: { slidesPerView: 2 },
                1600: { slidesPerView: 2.5 },
                2000: { slidesPerView: 3 },
                2300: { slidesPerView: 3.5 },
              }}
              slideMaxWidthClass=""
              fadeInOnReady
            />
            </section>
          </section>
        )}

        {(caseStudy.problem ||
          caseStudy.context ||
          caseStudy.theChallengeWas.length > 0 ||
          caseStudy.projectBasedCollaboration.length > 0 ||
          caseStudy.clientGoal.length > 0 ||
          caseStudy.solution) && (
          <section className="bg-brand-surface px-6 py-16 sm:px-25">
            <div className="mx-auto grid max-w-300 grid-cols-1 gap-10 lg:grid-cols-[300px_2fr]">
              <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
                <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
                  Problem &amp; Context
                </h2>
                <p className="max-w-105 text-base text-black/70 sm:text-lg">
                  {[caseStudy.problem, caseStudy.context]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              </div>
              <div className="flex flex-col gap-14">
                <BulletSection
                  heading="The challenge was"
                  items={caseStudy.theChallengeWas}
                  illustrationSrc="/images/case-study-detail/illustration-challenge.svg"
                />
                <BulletSection
                  heading="Project-based collaboration"
                  items={caseStudy.projectBasedCollaboration}
                  illustrationSrc="/images/case-study-detail/illustration-collaboration.svg"
                />
                <BulletSection
                  heading="Client Goal"
                  items={caseStudy.clientGoal}
                  illustrationSrc="/images/case-study-detail/illustration-goal.svg"
                />
                {caseStudy.solution && (
                  <div className="p-1.25 rounded-md bg-linear-to-b from-[#0165fd] via-[#2e2d99] to-[#070f67]">

                  <div className="flex flex-col gap-6 rounded bg-[#e9e9e9] p-6 sm:p-8 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-1 flex-col gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-brand-accent sm:text-[32px]">
                          Solution
                        </h3>
                        <span className="mt-2 block h-1 w-10 rounded-full bg-brand-accent" />
                      </div>
                      <p className="rounded-2xl bg-white px-6 py-4 text-base text-black">
                        {caseStudy.solution}
                      </p>
                    </div>
                    <div className="relative hidden h-44 w-64 shrink-0 opacity-90 xl:block">
                      <Image
                        src="/images/case-study-detail/solution-target.avif"
                        alt=""
                        fill
                        sizes="256px"
                        className="pointer-events-none object-contain"
                      />
                    </div>
                  </div>
                </div>
                )}
              </div>
            </div>
          </section>
        )}

        {caseStudy.webArchitecture.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-black px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-3xl font-semibold text-white sm:text-[40px]">
                What Was Built
              </h2>
              {caseStudy.textWhatWasBuilt && (
                <p className="text-base text-white/70 sm:text-lg">
                  {caseStudy.textWhatWasBuilt}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-300 grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {caseStudy.webArchitecture.map((item) => (
                <div key={item.label} className="flex min-w-0 flex-col items-center gap-4">
                  <div className="flex size-16 items-center justify-center rounded-full bg-[rgb(217,225,255)]">
                    {item.iconUrl && (
                      <Image
                        unoptimized={isSvgSrc(item.iconUrl)}
                        src={item.iconUrl}
                        alt=""
                        width={28}
                        height={28}
                        className="size-7 object-contain"
                      />
                    )}
                  </div>
                  <p className="w-full wrap-break-word text-sm text-white sm:text-lg">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {caseStudy.keyFeatures.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
                Key Features Delivered
              </h2>
              {caseStudy.textFeatures && (
                <p className="max-w-175 text-base text-black/60 sm:text-lg">
                  {caseStudy.textFeatures}
                </p>
              )}
            </div>
            <div className="grid w-full max-w-300 grid-cols-2 gap-4 sm:grid-cols-4">
              {caseStudy.keyFeatures.map((feature) => (
                <div
                  key={feature.label}
                  className="flex min-w-0 min-h-50 justify-around flex-col items-start gap-10 rounded-3xl border border-solid border-transparent bg-white p-6 text-left transition-colors hover:border-black"
                >
                  {feature.iconUrl ? (
                    <Image
                      unoptimized={isSvgSrc(feature.iconUrl)}
                      src={feature.iconUrl}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11"
                    />
                  ) : (
                    <div className="size-8" />
                  )}
                  <p className="w-full text-lg font-semibold wrap-break-word text-black">
                    {feature.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {caseStudy.progressImages.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface pt-16 pb-10 text-center">
            <h2 className="text-3xl mb-10 font-semibold text-black sm:text-[40px]">
              Design in Progress
            </h2>
            <ImagesSlider
              images={caseStudy.progressImages}
              slidesPerView={1}
              spaceBetween={20}
              breakpoints={{
                550: { slidesPerView: 1.5 },
                1300: { slidesPerView: 1.8 },
                1500: { slidesPerView: 2 },
                1600: { slidesPerView: 2.5 },
                2000: { slidesPerView: 3 },
                2300: { slidesPerView: 3.5 },
              }}
              slideMaxWidthClass=""
              fadeInOnReady
            />
          </section>
        )}

        {caseStudy.tools.length > 0 && (
          <section className="flex flex-col items-center gap-10 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <div className="flex flex-col items-center gap-3">
              <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
                Platform &amp; Tools Used
              </h2>
              {caseStudy.textTools && (
                <p className="max-w-175 text-base text-black/60 sm:text-lg">
                  {caseStudy.textTools}
                </p>
              )}
            </div>
            <div className="w-full max-w-300">
              <ToolsSlider
                tools={caseStudy.tools}
                slidesPerView={1}
                spaceBetween={20}
                breakpoints={{
                  550: { slidesPerView: 1.5 },
                  1300: { slidesPerView: 1.8 },
                  1500: { slidesPerView: 2 },
                  1600: { slidesPerView: 2.5 },
                  2000: { slidesPerView: 3 },
                  2300: { slidesPerView: 3.5 },
                }}
                fadeInOnReady
              />
            </div>
          </section>
        )}

        {highlightStats.length > 0 && (
          <section className="bg-brand-surface px-6 py-16 sm:px-25">
            <div className="mx-auto flex max-w-300 flex-col gap-10 lg:flex-row lg:items-start">
              <h2 className="shrink-0 text-3xl font-semibold text-black sm:text-[40px] lg:w-65">
                Outcome &amp; Impact
              </h2>
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlightStats.map((raw, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/15 px-6 py-5 text-base text-black"
                  >
                    <HighlightText raw={raw} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.clientFeedback && (
          <section className="relative overflow-hidden bg-black px-6 py-16 sm:px-25">
            <Image
              src="/images/case-study-detail/feedback-background.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="relative z-10 mx-auto flex max-w-300 flex-col gap-10 lg:flex-row lg:items-center">
              <h2 className="shrink-0 text-3xl font-semibold text-white sm:text-[40px] lg:w-70">
                Client Feedback
              </h2>
              <div className="flex w-full flex-col gap-6 rounded-[25px] border border-white/15 bg-[#123250]/95 p-8 sm:p-10">
                <div className="flex items-center gap-4">
                  {caseStudy.clientPhotoUrl ? (
                    <Image
                      src={caseStudy.clientPhotoUrl}
                      alt={caseStudy.clientName ?? ""}
                      width={64}
                      height={64}
                      className="size-16 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]">
                      <Image
                        unoptimized
                        src="/images/icons/profiles.svg"
                        alt=""
                        width={20}
                        height={34}
                        className="opacity-60"
                      />
                    </div>
                  )}
                  {caseStudy.clientName && (
                    <p className="text-2xl font-medium text-white">
                      {caseStudy.clientName}
                    </p>
                  )}
                </div>
                <p className="border-l-2 border-white/25 pl-5 text-lg leading-relaxed text-white">
                  {caseStudy.clientFeedback}
                </p>
                {(caseStudy.mainImageUrl || caseStudy.logoUrl) && (
                  <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                    {caseStudy.mainImageUrl && (
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={caseStudy.mainImageUrl}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-1">
                      {caseStudy.logoUrl && (
                        <div className="relative h-6 w-22.5">
                          <Image
                            unoptimized={isSvgSrc(caseStudy.logoUrl)}
                            src={caseStudy.logoUrl}
                            alt=""
                            fill
                            sizes="90px"
                            className="object-contain object-left"
                          />
                        </div>
                      )}
                      <p className="text-base font-medium text-white">
                        {caseStudy.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {caseStudy.teamInvolvement.length > 0 && (
          <section className="bg-brand-surface px-6 py-16 sm:px-25">
            <div className="mx-auto grid max-w-300 grid-cols-1 gap-10 lg:grid-cols-[275px_1fr]">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
                  Team Involvement
                </h2>
                <Image
                  unoptimized
                  src="/images/case-study-detail/illustration-team.svg"
                  alt=""
                  width={275}
                  height={160}
                  className="hidden lg:block"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {caseStudy.teamInvolvement.map((item) => (
                  <div
                    key={item}
                    className="flex min-w-0 items-center justify-center wrap-break-word rounded-2xl bg-white px-6 py-10 text-center text-lg font-medium text-black"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {caseStudy.suitableFor.length > 0 && (
          <section className="flex flex-col items-center gap-8 bg-brand-surface px-6 py-16 text-center sm:px-25">
            <h2 className="text-3xl font-semibold text-black sm:text-[40px]">
              Suitable For:
            </h2>
            <div className="grid w-full max-w-225 grid-cols-1 gap-4 sm:grid-cols-2">
              {caseStudy.suitableFor.map((item) => (
                <div
                  key={item}
                  className="min-w-0 wrap-break-word rounded-[30px] border border-black px-6 py-5 text-base font-medium text-black sm:text-lg"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
