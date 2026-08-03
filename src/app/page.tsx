import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Solutions } from "@/components/sections/Solutions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WithMindforapps } from "@/components/sections/WithMindforapps";
import { Services } from "@/components/sections/Services";
import { AddOns } from "@/components/sections/AddOns";
import { Templates } from "@/components/sections/Templates";
import { WhyUs } from "@/components/sections/WhyUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <CaseStudies />
        <Solutions />
        <FeatureGrid />
        <WithMindforapps />
        <Services />
        <AddOns />
        <Templates />
        <WhyUs />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
