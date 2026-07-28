"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getTextArray(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .map((v) => (v as string).trim())
    .filter(Boolean);
}

function getCaseStudyFields(formData: FormData) {
  return {
    slug: (formData.get("slug") as string)?.trim(),
    title: (formData.get("title") as string)?.trim(),
    subtitle: (formData.get("subtitle") as string) || null,
    problem: (formData.get("problem") as string) || null,
    context: (formData.get("context") as string) || null,
    solution: (formData.get("solution") as string) || null,
    deliverables: (formData.get("deliverables") as string) || null,
    timeline: (formData.get("timeline") as string) || null,
    hours: (formData.get("hours") as string) || null,
    team_size: (formData.get("team_size") as string) || null,
    website_url: (formData.get("website_url") as string) || null,
    logo_url: (formData.get("logo_url") as string) || null,
    main_image_url: (formData.get("main_image_url") as string) || null,
    client_name: (formData.get("client_name") as string) || null,
    client_photo_url: (formData.get("client_photo_url") as string) || null,
    client_feedback: (formData.get("client_feedback") as string) || null,
    client_goal: getTextArray(formData, "client_goal"),
    the_challenge_was: getTextArray(formData, "the_challenge_was"),
    project_based_collaboration: getTextArray(
      formData,
      "project_based_collaboration",
    ),
    suitable_for: getTextArray(formData, "suitable_for"),
    header_images: getTextArray(formData, "header_images"),
    progress_images: getTextArray(formData, "progress_images"),
    text_1: (formData.get("text_1") as string) || null,
    text_2: (formData.get("text_2") as string) || null,
    text_3: (formData.get("text_3") as string) || null,
    text_4: (formData.get("text_4") as string) || null,
    text_5: (formData.get("text_5") as string) || null,
    text_6: (formData.get("text_6") as string) || null,
    text_features: (formData.get("text_features") as string) || null,
    text_tools: (formData.get("text_tools") as string) || null,
    text_what_was_built:
      (formData.get("text_what_was_built") as string) || null,
    seo_title: (formData.get("seo_title") as string) || null,
    seo_description: (formData.get("seo_description") as string) || null,
    seo_image_url: (formData.get("seo_image_url") as string) || null,
    is_published: formData.get("is_published") === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
}

async function syncRelations(caseStudyId: string, formData: FormData) {
  const supabase = await createClient();

  const serviceIds = formData.getAll("service_ids") as string[];
  const toolIds = formData.getAll("tool_ids") as string[];
  const teamIds = formData.getAll("team_involvement_ids") as string[];
  const featureLabels = formData.getAll("key_feature_label") as string[];
  const featureIcons = formData.getAll("key_feature_icon") as string[];
  const webArchitectureLabels = formData.getAll(
    "web_architecture_label",
  ) as string[];
  const webArchitectureIcons = formData.getAll(
    "web_architecture_icon",
  ) as string[];

  await Promise.all([
    supabase
      .from("case_study_services")
      .delete()
      .eq("case_study_id", caseStudyId),
    supabase.from("case_study_tools").delete().eq("case_study_id", caseStudyId),
    supabase
      .from("case_study_team_involvement")
      .delete()
      .eq("case_study_id", caseStudyId),
    supabase
      .from("case_study_key_features")
      .delete()
      .eq("case_study_id", caseStudyId),
    supabase
      .from("case_study_web_architecture")
      .delete()
      .eq("case_study_id", caseStudyId),
  ]);

  if (serviceIds.length > 0) {
    await supabase.from("case_study_services").insert(
      serviceIds.map((service_id) => ({ case_study_id: caseStudyId, service_id })),
    );
  }
  if (toolIds.length > 0) {
    await supabase.from("case_study_tools").insert(
      toolIds.map((tool_id) => ({ case_study_id: caseStudyId, tool_id })),
    );
  }
  if (teamIds.length > 0) {
    await supabase.from("case_study_team_involvement").insert(
      teamIds.map((team_involvement_type_id) => ({
        case_study_id: caseStudyId,
        team_involvement_type_id,
      })),
    );
  }

  const features = featureLabels
    .map((label, i) => ({ label: label.trim(), icon_url: featureIcons[i] || null }))
    .filter((f) => f.label);
  if (features.length > 0) {
    await supabase.from("case_study_key_features").insert(
      features.map((f, i) => ({
        case_study_id: caseStudyId,
        label: f.label,
        icon_url: f.icon_url,
        sort_order: i,
      })),
    );
  }

  const webArchitecture = webArchitectureLabels
    .map((label, i) => ({
      label: label.trim(),
      icon_url: webArchitectureIcons[i] || null,
    }))
    .filter((item) => item.label);
  if (webArchitecture.length > 0) {
    await supabase.from("case_study_web_architecture").insert(
      webArchitecture.map((item, i) => ({
        case_study_id: caseStudyId,
        label: item.label,
        icon_url: item.icon_url,
        sort_order: i,
      })),
    );
  }
}

export async function createCaseStudy(formData: FormData) {
  const supabase = await createClient();
  const fields = getCaseStudyFields(formData);

  const { data, error } = await supabase
    .from("case_studies")
    .insert(fields)
    .select("id")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Failed to create case study");
  }

  await syncRelations(data.id, formData);

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  redirect("/admin/case-studies");
}

export async function updateCaseStudy(id: string, formData: FormData) {
  const supabase = await createClient();
  const fields = getCaseStudyFields(formData);

  const { error } = await supabase
    .from("case_studies")
    .update(fields)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  await syncRelations(id, formData);

  revalidatePath("/admin/case-studies");
  revalidatePath("/");
  redirect("/admin/case-studies");
}

export async function deleteCaseStudy(id: string) {
  const supabase = await createClient();
  await supabase.from("case_studies").delete().eq("id", id);
  revalidatePath("/admin/case-studies");
  revalidatePath("/");
}
