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
