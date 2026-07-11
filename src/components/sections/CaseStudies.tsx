import Image from "next/image";

const caseStudy = {
  title: "Educational platform. Full UX UI design.",
  tags: ["Web App", "Startup", "Industry"],
  problem:
    "Confusing interface & slow performance. Hard to use, low insights.",
  context:
    "Streamlined design, faster app, personalized experience. Intuitive UI + analytics-driven improvements. Optimized performance & tailored content.",
  services: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
  deliverables: "Website, Case Studies section",
  timeline: "2 Weeks",
  hours: "150+ hours",
  teamSize: "5+ team size",
};

export function CaseStudies() {
  return (
    <section className="flex flex-col items-center gap-8 bg-black px-6 py-16 sm:px-[100px] sm:py-[60px]">
      <div className="rounded-full border-[3px] border-brand-purple px-8 py-3 sm:px-11 sm:py-4">
        <span className="text-brand-gradient text-2xl font-medium sm:text-[45px]">
          Case Studies
        </span>
      </div>

      <div className="flex w-full max-w-[1200px] items-center justify-center gap-2 sm:gap-[19px]">
        <Image
          src="/images/arrow-left.svg"
          alt=""
          width={59}
          height={161}
          className="hidden h-24 w-auto shrink-0 sm:block"
        />
        <div className="flex flex-col items-center gap-3 py-5 text-center">
          <p className="text-2xl text-white sm:text-[32px]">
            Bubble No-Code Case Studies with Proven Business Results
          </p>
          <p className="max-w-[608px] text-base text-white sm:text-lg">
            Real case studies showcasing no-code success stories, project
            examples, and proven client results across industries.
          </p>
        </div>
        <Image
          src="/images/arrow-right.svg"
          alt=""
          width={59}
          height={161}
          className="hidden h-24 w-auto shrink-0 sm:block"
        />
      </div>

      <div className="flex w-full max-w-[1200px] flex-col overflow-hidden rounded-[25px] lg:flex-row">
        <div className="flex flex-col gap-10 bg-white p-8 sm:p-[50px]">
          <div className="flex flex-col gap-6">
            <h3 className="max-w-[410px] text-2xl font-medium text-black sm:text-[35px]">
              {caseStudy.title}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium tracking-[-0.3px] text-black sm:gap-[15px] sm:text-base">
              {caseStudy.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {i > 0 && <span className="text-black/40">|</span>}
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-5 font-medium sm:flex-row">
              <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-[270px]">
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Problem:
                </p>
                <p className="text-base tracking-[-0.3px] text-black">
                  {caseStudy.problem}
                </p>
              </div>
              <div className="flex w-full flex-col gap-1.5 rounded-[15px] bg-brand-surface px-5 py-2.5 sm:w-[270px]">
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Context:
                </p>
                <p className="text-base tracking-[-0.3px] text-black">
                  {caseStudy.context}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-x-16 gap-y-5 rounded-[15px] bg-gradient-to-r from-[#cde1ff]/50 to-[#d9daff]/50 px-5 py-3 font-medium sm:grid-cols-2">
              <div>
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Services
                </p>
                <p className="text-base tracking-[-0.3px] text-black">
                  {caseStudy.services}
                </p>
              </div>
              <div>
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Tools
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Image
                    src="/images/tool-bubble.svg"
                    alt="Bubble"
                    width={20}
                    height={22}
                  />
                  <Image
                    src="/images/tool-figma.svg"
                    alt="Figma"
                    width={17}
                    height={24}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Deliverables
                </p>
                <p className="text-base tracking-[-0.3px] text-black">
                  {caseStudy.deliverables}
                </p>
              </div>
              <div>
                <p className="text-sm tracking-[-0.27px] text-black/40">
                  Timeline
                </p>
                <p className="text-base tracking-[-0.3px] text-black">
                  {caseStudy.timeline}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-8 sm:gap-[118px]">
            <p className="text-lg text-black">{caseStudy.hours}</p>
            <p className="text-lg text-black">{caseStudy.teamSize}</p>
            <Image
              src="/images/dewie-logo.svg"
              alt="Dewie"
              width={113}
              height={32}
              className="h-8 w-auto"
            />
          </div>
        </div>
        <div className="relative h-[400px] w-full lg:h-auto lg:w-[540px] lg:min-h-[709px]">
          <Image
            src="/images/case-study-mockup.png"
            alt="Educational platform app screens"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
