import Image from "next/image";

const painPoints = [
  "Don't know where to start",
  "No clear structure for the app",
  "Expensive dev quotes that take months",
  "Too many tools, no direction",
  "Slow progress and no visible results",
  "No technical partner to rely on",
];

const outcomes = [
  "App structure and template chosen for your needs",
  "Fully customized design and logic",
  "Fast delivery thanks to low-code",
  "Clear communication and a dedicated manager",
  "A real, working product ready to launch",
  "A long-term partner for updates and scaling",
  "Fully customized design and logic",
];

export function WhyUs() {
  return (
    <section className="relative flex flex-col items-center gap-8 overflow-hidden bg-white px-6 py-16 sm:px-25">
      <Image
        src="/images/why-us/wave-bg-illustration.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none rotate-180 object-cover opacity-70"
      />

      <div className="relative flex flex-col items-center gap-3 text-center">
        <h2 className="text-3xl font-bold text-black sm:text-[40px]">
          Why Us
        </h2>
        <p className="max-w-150 text-base text-black sm:text-lg">
          An experienced no-code team with certified Bubble developers,
          transparent processes, and proven expertise.
        </p>
      </div>

      <div className="relative w-full max-w-300 rounded-sm bg-[rgba(233,233,233,0.7)] p-4 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-6 rounded-sm bg-white p-6 sm:p-9">
            <div className="flex items-center gap-4">
              <Image
                unoptimized
                src="/images/why-us/pin-before.svg"
                alt=""
                width={25}
                height={34}
                className="shrink-0"
              />
              <p className="text-xl font-semibold text-black">
                BEFORE | POINT A
              </p>
            </div>
            <div className="border-t border-black/50" />
            <p className="text-2xl font-semibold text-black">
              Your Current Situation
            </p>
            <ul className="flex flex-col gap-4">
              {painPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-4 text-lg text-black/80"
                >
                  <Image
                    unoptimized
                    src="/images/why-us/x-icon.svg"
                    alt=""
                    width={27}
                    height={27}
                    className="shrink-0"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="text-lg text-black">
              You have the idea — but no roadmap.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-sm bg-white p-6 sm:p-9">
            <div className="flex items-center gap-4">
              <Image
                unoptimized
                src="/images/why-us/pin-after.svg"
                alt=""
                width={25}
                height={34}
                className="shrink-0"
              />
              <p className="text-xl font-semibold text-black">
                AFTER | POINT B
              </p>
            </div>
            <div className="border-t border-black/50" />
            <p className="text-2xl font-semibold text-black">
              Where We Bring You
            </p>
            <ul className="flex flex-col gap-4">
              {outcomes.map((outcome, index) => (
                <li
                  key={`${outcome}-${index}`}
                  className="flex items-start gap-4 text-lg text-black/80"
                >
                  <Image
                    unoptimized
                    src="/images/why-us/check-icon.svg"
                    alt=""
                    width={27}
                    height={27}
                    className="shrink-0"
                  />
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
