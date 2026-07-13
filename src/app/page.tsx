import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Solutions } from "@/components/sections/Solutions";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { WithMindforapps } from "@/components/sections/WithMindforapps";
import { Services } from "@/components/sections/Services";
import { AddOns } from "@/components/sections/AddOns";
import { Templates } from "@/components/sections/Templates";

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
      </main>
    </>
  );
}
