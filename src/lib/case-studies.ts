import { createClient } from "@/lib/supabase/server";

export type CaseStudySlide = {
  id: string;
  title: string;
  tags: string[];
  problem: string | null;
  context: string | null;
  serviceNames: string;
  tools: { name: string; icon_url: string | null }[];
  deliverables: string | null;
  timeline: string | null;
  hours: string | null;
  teamSize: string | null;
  logoUrl: string | null;
  clientName: string | null;
  mainImageUrl: string | null;
};

export async function getCaseStudySlides(): Promise<CaseStudySlide[]> {
  const supabase = await createClient();

  const { data: caseStudies } = await supabase
    .from("case_studies")
    .select(
      `*, case_study_services(services(name)), case_study_tools(tools(name, icon_url))`,
    )
    .eq("is_published", true)
    .order("sort_order");

  if (!caseStudies) return [];

  return caseStudies.map((caseStudy) => {
    const tags = (caseStudy.subtitle ?? "")
      .split("|")
      .map((t: string) => t.trim())
      .filter(Boolean);

    const serviceNames = (
      caseStudy.case_study_services as { services: { name: string } | null }[]
    )
      .map((row) => row.services?.name)
      .filter(Boolean)
      .join(", ");

    const tools = (
      caseStudy.case_study_tools as {
        tools: { name: string; icon_url: string | null } | null;
      }[]
    )
      .map((row) => row.tools)
      .filter((t): t is { name: string; icon_url: string | null } => !!t);

    return {
      id: caseStudy.id,
      title: caseStudy.title,
      tags,
      problem: caseStudy.problem,
      context: caseStudy.context,
      serviceNames,
      tools,
      deliverables: caseStudy.deliverables,
      timeline: caseStudy.timeline,
      hours: caseStudy.hours,
      teamSize: caseStudy.team_size,
      logoUrl: caseStudy.logo_url,
      clientName: caseStudy.client_name,
      mainImageUrl: caseStudy.main_image_url,
    };
  });
}
