import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookConsultationButton } from "@/components/BookConsultationButton";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center px-5">
        <div className="flex min-h-47.5 min-w-70 w-full max-w-none flex-col items-center gap-6 bg-brand-accent my-6.25 px-7.5 min-[675px]:flex-row min-[675px]:items-center min-[675px]:justify-between min-[800px]:max-w-300 min-[800px]:px-12.5 py-5">
          <div className="flex min-h-10 min-w-50 flex-col justify-center min-[450px]:min-w-70">
            <p className="mb-5 text-[22px] font-semibold text-[#59FBFA] min-[350px]:text-[25px] min-[850px]:text-[30px]">
              Not sure what to build yet?
              <br className="min-[1140px]:hidden" />{" "}
              <span className="text-white">Start with an audit.</span>
            </p>
            <div className="min-w-10 max-w-150">
              <p className="text-[16px] font-normal text-white min-[675px]:text-[18px]">
                30 minutes with us, looking at how your business actually
                runs — <strong>bookings, follow-ups, tools, lead flow.</strong>
              </p>
            </div>
          </div>

          <BookConsultationButton className="flex min-h-13.25 w-63.75 min-w-55 max-w-none shrink-0 items-center justify-center rounded-full bg-white px-6 text-center text-[18px] font-medium text-black transition-colors hover:bg-black hover:text-white min-[480px]:max-w-50 min-[800px]:max-w-63.75 min-[800px]:text-[20px]">
            Book a Free Audit
          </BookConsultationButton>
        </div>
      </main>
      <Footer openContactForm />
    </>
  );
}
