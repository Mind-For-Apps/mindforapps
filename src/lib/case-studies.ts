import { createClient } from "@/lib/supabase/server";

export type CaseStudySlide = {
  id: string;
  slug: string;
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
  headerImages: string[];
};

export type CaseStudyDetail = {
  slug: string;
  title: string;
  tags: string[];
  problem: string | null;
  context: string | null;
  solution: string | null;
  deliverables: string | null;
  timeline: string | null;
  hours: string | null;
  teamSize: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  mainImageUrl: string | null;
  clientName: string | null;
  clientPhotoUrl: string | null;
  clientFeedback: string | null;
  clientGoal: string[];
  theChallengeWas: string[];
  projectBasedCollaboration: string[];
  suitableFor: string[];
  webArchitecture: { label: string; iconUrl: string | null }[];
  headerImages: string[];
  progressImages: string[];
  text1: string | null;
  text2: string | null;
  text3: string | null;
  text4: string | null;
  text5: string | null;
  text6: string | null;
  textFeatures: string | null;
  textTools: string | null;
  textWhatWasBuilt: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoImageUrl: string | null;
  serviceNames: string[];
  tools: { name: string; icon_url: string | null }[];
  keyFeatures: { label: string; iconUrl: string | null }[];
  teamInvolvement: string[];
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
      slug: caseStudy.slug,
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
      headerImages: caseStudy.header_images ?? [],
    };
  });
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDetail | null> {
  const supabase = await createClient();

  const { data: caseStudy } = await supabase
    .from("case_studies")
    .select(
      `*, case_study_services(services(name)), case_study_tools(tools(name, icon_url)), case_study_key_features(label, icon_url, sort_order), case_study_team_involvement(team_involvement_types(name, sort_order)), case_study_web_architecture(label, icon_url, sort_order)`,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!caseStudy) return null;

  const tags = (caseStudy.subtitle ?? "")
    .split("|")
    .map((t: string) => t.trim())
    .filter(Boolean);

  const serviceNames = (
    caseStudy.case_study_services as { services: { name: string } | null }[]
  )
    .map((row) => row.services?.name)
    .filter((name): name is string => !!name);

  const tools = (
    caseStudy.case_study_tools as {
      tools: { name: string; icon_url: string | null } | null;
    }[]
  )
    .map((row) => row.tools)
    .filter((t): t is { name: string; icon_url: string | null } => !!t);

  const keyFeatures = (
    caseStudy.case_study_key_features as {
      label: string;
      icon_url: string | null;
      sort_order: number;
    }[]
  )
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({ label: row.label, iconUrl: row.icon_url }));

  const teamInvolvement = (
    caseStudy.case_study_team_involvement as {
      team_involvement_types: { name: string; sort_order: number } | null;
    }[]
  )
    .map((row) => row.team_involvement_types)
    .filter((t): t is { name: string; sort_order: number } => !!t)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((t) => t.name);

  const webArchitecture = (
    caseStudy.case_study_web_architecture as {
      label: string;
      icon_url: string | null;
      sort_order: number;
    }[]
  )
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({ label: row.label, iconUrl: row.icon_url }));

  return {
    slug: caseStudy.slug,
    title: caseStudy.title,
    tags,
    problem: caseStudy.problem,
    context: caseStudy.context,
    solution: caseStudy.solution,
    deliverables: caseStudy.deliverables,
    timeline: caseStudy.timeline,
    hours: caseStudy.hours,
    teamSize: caseStudy.team_size,
    websiteUrl: caseStudy.website_url,
    logoUrl: caseStudy.logo_url,
    mainImageUrl: caseStudy.main_image_url,
    clientName: caseStudy.client_name,
    clientPhotoUrl: caseStudy.client_photo_url,
    clientFeedback: caseStudy.client_feedback,
    clientGoal: caseStudy.client_goal ?? [],
    theChallengeWas: caseStudy.the_challenge_was ?? [],
    projectBasedCollaboration: caseStudy.project_based_collaboration ?? [],
    suitableFor: caseStudy.suitable_for ?? [],
    webArchitecture,
    headerImages: caseStudy.header_images ?? [],
    progressImages: caseStudy.progress_images ?? [],
    text1: caseStudy.text_1,
    text2: caseStudy.text_2,
    text3: caseStudy.text_3,
    text4: caseStudy.text_4,
    text5: caseStudy.text_5,
    text6: caseStudy.text_6,
    textFeatures: caseStudy.text_features,
    textTools: caseStudy.text_tools,
    textWhatWasBuilt: caseStudy.text_what_was_built,
    seoTitle: caseStudy.seo_title,
    seoDescription: caseStudy.seo_description,
    seoImageUrl: caseStudy.seo_image_url,
    serviceNames,
    tools,
    keyFeatures,
    teamInvolvement,
  };
}
