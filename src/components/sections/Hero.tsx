import { TrustCarousel } from "./TrustCarousel";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 sm:px-25 lg:flex lg:h-170 lg:items-center lg:py-0">
      <div className="pointer-events-none absolute inset-0"  
            style={{
              backgroundImage: 'url(/images/Frame.png)', 
              maxWidth: 'unset', 
              maxHeight: 'unset', 
              backgroundColor: 'rgba(255, 255, 255, 0)', 
              backgroundRepeat: 'no-repeat', 
              backgroundPosition: 'center center', 
              backgroundSize: 'cover', 
              height: 'auto',
              top: '-100px'
              }}>
      </div>
      <div className="relative mx-auto flex max-w-300 flex-col gap-2">
        <div className="flex max-w-150 flex-col items-start gap-0">
          <h1 className="text-4xl font-semibold leading-[1.1] text-black sm:text-[55px]">
            A Software Partner For Small Businesses And Founders
          </h1>
          <p className="text-lg font-medium leading-[1.5] text-brand-gray sm:text-[19px]">
            Custom apps and business tools — designed, built, and launched in
            weeks. From booking systems and client portals to internal tools
            and full products. Built using Bubble, AI, and modern no-code
            tools.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-5">
            <a
              href="#start-your-project"
              className="bg-brand-gradient flex h-15 items-center rounded-full border-2 border-transparent px-7.5 text-lg font-medium text-white transition-colors duration-300 hover:border-[#314ce2] hover:bg-none hover:text-[#314ce2] hover:select-none sm:text-[25px]"
            >
              Start Your Project
            </a>
            <a
              href="#start-your-project"
              className="flex h-15 items-center rounded-full border-2 border-black bg-black px-7.5 text-lg font-medium text-white transition-colors duration-300 hover:border-2 hover:border-[#314ce2] hover:bg-transparent hover:text-[#314ce2] hover:select-none"
            >
              Book a Consultation
            </a>
          </div>
        </div>
        <TrustCarousel />
      </div>
    </section>
  );
}
