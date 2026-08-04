import Image from "next/image";

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
    <section className="relative flex flex-col items-center gap-10 overflow-hidden bg-gradient-to-b from-black to-[#0c0c0c] px-6 py-20 sm:px-25">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/cta-wave-bg.png"
          alt=""
          fill
          className="rotate-180 object-cover opacity-30"
        />
      </div>

      <div className="relative flex flex-col items-center gap-8 text-center">
        <div className="flex size-[108px] items-center justify-center rounded-full bg-white">
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
          Tailored features built specifically for your niche, not a generic
          template.
        </p>
      </div>

      <div className="relative flex w-full max-w-[1150px] flex-col items-center gap-10 rounded-[25px] bg-white px-8 py-10 shadow-[0px_4px_9.65px_rgba(0,0,0,0.14)] sm:flex-row sm:justify-center sm:gap-[41px] sm:px-[60px]">
        {valueProps.map((item, i) => (
          <div key={item.title} className="flex items-center gap-[41px]">
            {i > 0 && (
              <Image
                src="/images/divider-2.svg"
                alt=""
                width={1}
                height={117}
                className="hidden h-[117px] sm:block"
              />
            )}
            <div className="flex w-[270px] flex-col items-start gap-[19px] text-left">
              <p className="text-xl font-semibold tracking-[-0.253px] text-black sm:text-[23px]">
                {item.title}
              </p>
              <p className="text-base tracking-[-0.198px] text-black sm:text-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="relative rounded-[30px] bg-gradient-to-r from-black to-[#0c0c0c] px-8 py-2.5 text-lg font-medium tracking-[-0.38px] text-white transition-opacity hover:opacity-90">
        Start Your MVP
      </button>
    </section>
  );
}
