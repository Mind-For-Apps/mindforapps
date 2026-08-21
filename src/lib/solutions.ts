import { createClient } from "@/lib/supabase/server";

export type SolutionCardData = {
  id: string;
  slug: string | null;
  title: string;
  titleForCards: string | null;
  tags: string[];
  tools: { name: string; icon_url: string | null }[];
  imagesCover: string[];
};

export async function getSolutionCards(): Promise<SolutionCardData[]> {
  const supabase = await createClient();

  const { data: solutions } = await supabase
    .from("solutions")
    .select(`*, solution_tools(tools(name, icon_url))`)
    .eq("is_published", true)
    .order("sort_order");

  if (!solutions) return [];

  return solutions.map((solution) => {
    const tools = (
      solution.solution_tools as {
        tools: { name: string; icon_url: string | null } | null;
      }[]
    )
      .map((row) => row.tools)
      .filter((t): t is { name: string; icon_url: string | null } => !!t);

    return {
      id: solution.id,
      slug: solution.slug,
      title: solution.title,
      titleForCards: solution.title_for_cards,
      tags: solution.tags ?? [],
      tools,
      imagesCover: solution.images_cover ?? [],
    };
  });
}

export type SolutionFeatureLabel = {
  title: string;
  color: string | null;
  bgColor: string | null;
};

export type SolutionFeatureCategory = {
  name: string;
  images: string[];
  labels: SolutionFeatureLabel[];
};

export type SolutionIncludedFeature = {
  iconUrl: string | null;
  title: string;
  subtitle: string | null;
  tags: string[];
};

export type SolutionDetail = {
  slug: string;
  title: string;
  titleLong: string | null;
  titleForCards: string | null;
  tags: string[];
  priceLabel: string | null;
  mainImageUrl: string | null;
  featuresImageUrl: string | null;
  whatsIncludedIconUrl: string | null;
  images: string[];
  imagesCover: string[];
  designedFor: string[];
  withMfa: string[];
  withoutMfa: string[];
  buildPriceLow: number | null;
  buildPriceHigh: number | null;
  buildChecklist: string[];
  text0: string | null;
  text1: string | null;
  text2: string | null;
  text3: string | null;
  text4: string | null;
  text5: string | null;
  text6: string | null;
  text7: string | null;
  text8: string | null;
  tools: { name: string; icon_url: string | null }[];
  featureCategories: SolutionFeatureCategory[];
  includedFeatures: SolutionIncludedFeature[];
};

export async function getSolutionBySlug(
  slug: string,
): Promise<SolutionDetail | null> {
  const supabase = await createClient();

  const { data: solution } = await supabase
    .from("solutions")
    .select(
      `*, solution_tools(tools(name, icon_url)), solution_feature_categories(name, images, sort_order, solution_feature_labels(title, color, bg_color, sort_order)), solution_included_features(icon_url, title, subtitle, tags, sort_order)`,
    )
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!solution) return null;

  const tools = (
    solution.solution_tools as {
      tools: { name: string; icon_url: string | null } | null;
    }[]
  )
    .map((row) => row.tools)
    .filter((t): t is { name: string; icon_url: string | null } => !!t);

  const featureCategories = (
    solution.solution_feature_categories as {
      name: string;
      images: string[];
      sort_order: number;
      solution_feature_labels: {
        title: string;
        color: string | null;
        bg_color: string | null;
        sort_order: number;
      }[];
    }[]
  )
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((cat) => ({
      name: cat.name,
      images: cat.images ?? [],
      labels: cat.solution_feature_labels
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((l) => ({ title: l.title, color: l.color, bgColor: l.bg_color })),
    }));

  const includedFeatures = (
    solution.solution_included_features as {
      icon_url: string | null;
      title: string;
      subtitle: string | null;
      tags: string[];
      sort_order: number;
    }[]
  )
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((f) => ({
      iconUrl: f.icon_url,
      title: f.title,
      subtitle: f.subtitle,
      tags: f.tags ?? [],
    }));

  return {
    slug: solution.slug,
    title: solution.title,
    titleLong: solution.title_long,
    titleForCards: solution.title_for_cards,
    tags: solution.tags ?? [],
    priceLabel: solution.price_label,
    mainImageUrl: solution.main_image_url,
    featuresImageUrl: solution.features_image_url,
    whatsIncludedIconUrl: solution.whats_included_icon_url,
    images: solution.images ?? [],
    imagesCover: solution.images_cover ?? [],
    designedFor: solution.designed_for ?? [],
    withMfa: solution.with_mfa ?? [],
    withoutMfa: solution.without_mfa ?? [],
    buildPriceLow: solution.build_price_low,
    buildPriceHigh: solution.build_price_high,
    buildChecklist: solution.build_checklist ?? [],
    text0: solution.text_0,
    text1: solution.text_1,
    text2: solution.text_2,
    text3: solution.text_3,
    text4: solution.text_4,
    text5: solution.text_5,
    text6: solution.text_6,
    text7: solution.text_7,
    text8: solution.text_8,
    tools,
    featureCategories,
    includedFeatures,
  };
}
