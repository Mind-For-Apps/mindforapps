import Image from "next/image";
import Link from "next/link";

const valueProps = [
  {
    title: "Launch in 3 Weeks",
    description:
      "Go from concept to market-ready in record time. Speed is your edge.",
  },
  {
    title: "Cost-Efficient Package",
    description:
      "Enterprise-grade tech + professional service at a fraction of custom dev costs.",
  },
  {
    title: "Your Technical Partner",
    description:
      "We handle the complex integrations and scaling while you focus on the business.",
  },
];

export function WithMindforapps() {
  return (
    <>
      {/* <section className="relative flex flex-col items-center gap-6 overflow-hidden bg-linear-to-b from-black to-[#0c0c0c] px-6 pt-14 pb-10 sm:px-25 -top-7.5"> */}
      <section className="relative flex flex-col items-center gap-6 bg-linear-to-b from-black to-[#0c0c0c] px-6 pt-14 pb-30 sm:px-25 -top-7.5">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/cta-wave-bg-3.png"
            alt=""
            fill
            className="object-cover h-auto!"
          />
        </div>

        <div className="relative flex flex-col items-center gap-6 text-center">
          <div className="flex size-27 items-center justify-center rounded-full bg-white">
            <Image
              src="/images/checkmark-icon.svg"
              alt=""
              width={38}
              height={27}
            />
          </div>
          <h2 className="text-3xl font-semibold text-white sm:text-[40px]">
            With Mindforapps
          </h2>
          <p className="text-lg text-white sm:text-xl">
            Tailored features built specifically for your niche, not a
            generic template.
          </p>
        </div>
      </section>

      {/* <div className="relative z-10 -mt-16 flex flex-col items-center gap-8 px-6 pb-14 sm:px-25"> */}
      <div className="relative z-10 -mt-25 flex flex-col items-center gap-8 px-6 sm:px-25">
        <div className="flex w-full max-w-287.5 flex-wrap gap-10.25 rounded-[25px] bg-white px-8 py-10 shadow-[0px_4px_9.65px_rgba(0,0,0,0.14)] sm:px-15">
          {valueProps.map((item) => (
            <div
              key={item.title}
              className="flex min-h-23.75 min-w-50 flex-1 flex-col items-start gap-3 border-l-4 border-brand-accent pl-6 text-left"
            >
              <p className="text-xl font-semibold tracking-[-0.253px] text-black sm:text-[23px]">
                {item.title}
              </p>
              <p className="text-base tracking-[-0.198px] text-black sm:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="relative rounded-[30px] bg-linear-to-r from-black to-[#0c0c0c] px-8 py-2.5 text-lg font-medium tracking-[-0.38px] text-white transition-[background] duration-300 hover:bg-linear-45 hover:from-brand-blue hover:via-brand-indigo hover:to-brand-purple"
        >
          Start Your MVP
        </Link>
      </div>
    </>
  );
}
