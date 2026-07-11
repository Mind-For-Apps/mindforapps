// One-off data migration: imports the 7 real case studies (exported from the
// old Bubble.io app) into Supabase, re-uploading their images to Supabase
// Storage along the way.
//
// Requires SUPABASE_SERVICE_ROLE_KEY (Supabase Dashboard -> Project Settings
// -> API -> service_role secret) added temporarily to .env.local. Remove it
// again once the seed has run — it must never be committed or used client-side.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-case-studies.ts

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add SUPABASE_SERVICE_ROLE_KEY to .env.local temporarily and re-run.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

type RawCaseStudy = Record<string, string>;

function splitList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

async function uploadImage(
  bubbleUrl: string,
  path: string,
): Promise<string | null> {
  if (!bubbleUrl) return null;
  const url = bubbleUrl.startsWith("//") ? `https:${bubbleUrl}` : bubbleUrl;

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ! failed to fetch ${url} (${res.status})`);
    return null;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") ?? "image/jpeg";

  const { error } = await supabase.storage
    .from("case-study-media")
    .upload(path, buffer, { contentType, upsert: true });

  if (error) {
    console.warn(`  ! failed to upload ${path}: ${error.message}`);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("case-study-media").getPublicUrl(path);
  return publicUrl;
}

async function getOrCreateLookup(
  table: "tools" | "team_involvement_types",
  names: string[],
  cache: Map<string, string>,
): Promise<string[]> {
  const ids: string[] = [];
  for (const name of names) {
    if (cache.has(name)) {
      ids.push(cache.get(name)!);
      continue;
    }
    const { data: existing } = await supabase
      .from(table)
      .select("id")
      .eq("name", name)
      .maybeSingle();

    if (existing) {
      cache.set(name, existing.id);
      ids.push(existing.id);
      continue;
    }

    const { data: created, error } = await supabase
      .from(table)
      .insert({ name })
      .select("id")
      .single();

    if (error || !created) {
      console.warn(`  ! failed to create ${table} "${name}": ${error?.message}`);
      continue;
    }
    cache.set(name, created.id);
    ids.push(created.id);
  }
  return ids;
}

async function main() {
  const raw: RawCaseStudy[] = JSON.parse(
    readFileSync(new URL("./case-studies-data.json", import.meta.url), "utf8"),
  );

  const toolCache = new Map<string, string>();
  const teamCache = new Map<string, string>();

  for (const [i, item] of raw.entries()) {
    const slug = item["Slug"];
    const title = item["title"]?.trim();
    console.log(`[${i + 1}/${raw.length}] ${title} (${slug})`);

    const [mainImageUrl, logoUrl, clientPhotoUrl] = await Promise.all([
      uploadImage(item["Main image"], `case-studies/${slug}/main.png`),
      uploadImage(item["logo"], `case-studies/${slug}/logo.png`),
      uploadImage(item["client photo"], `case-studies/${slug}/client.png`),
    ]);

    const headerUrls = splitList(item["Header images"]);
    const headerImages = (
      await Promise.all(
        headerUrls.map((u, idx) =>
          uploadImage(u, `case-studies/${slug}/header/${idx}.jpg`),
        ),
      )
    ).filter((u): u is string => !!u);

    const progressUrls = splitList(item["Progress images"]);
    const progressImages = (
      await Promise.all(
        progressUrls.map((u, idx) =>
          uploadImage(u, `case-studies/${slug}/progress/${idx}.jpg`),
        ),
      )
    ).filter((u): u is string => !!u);

    const toolNames = splitList(item["Tools"]);
    const teamNames = splitList(item["Team Involvement"]);
    const toolIds = await getOrCreateLookup("tools", toolNames, toolCache);
    const teamIds = await getOrCreateLookup(
      "team_involvement_types",
      teamNames,
      teamCache,
    );

    const { data: caseStudy, error } = await supabase
      .from("case_studies")
      .upsert(
        {
          slug,
          title,
          subtitle: item["subtitle"] || null,
          problem: item["problem"] || null,
          context: item["context"] || null,
          solution: item["Solution"] || null,
          deliverables: item["Deliverables"] || null,
          timeline: item["time"] || null,
          hours: item["hours"] || null,
          team_size: item["team size"] || null,
          website_url: item["website"] || null,
          logo_url: logoUrl,
          main_image_url: mainImageUrl,
          client_name: item["client name"] || null,
          client_photo_url: clientPhotoUrl,
          client_feedback: item["client feedback"] || null,
          client_goal: splitList(item["Client Goal"]),
          the_challenge_was: splitList(item["The challenge was"]),
          project_based_collaboration: splitList(
            item["Project-based collaboration"],
          ),
          suitable_for: splitList(item["Suitable For"]),
          web_architecture: splitList(item["WEB architecture"]),
          header_images: headerImages,
          progress_images: progressImages,
          text_1: item["Text 1"] || null,
          text_2: item["Text 2"] || null,
          text_3: item["Text  3"] || null,
          text_4: item["Text 4"] || null,
          text_5: item["Text 5"] || null,
          text_6: item["Text 6 "] || null,
          text_features: item["Text Features"] || null,
          text_tools: item["Text tools"] || null,
          text_what_was_built: item["Text what was built"] || null,
          seo_title: item["SEO_title"] || null,
          is_published: true,
          sort_order: i,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (error || !caseStudy) {
      console.error(`  ! failed to insert case study: ${error?.message}`);
      continue;
    }

    await supabase.from("case_study_tools").delete().eq("case_study_id", caseStudy.id);
    if (toolIds.length > 0) {
      await supabase
        .from("case_study_tools")
        .insert(toolIds.map((tool_id) => ({ case_study_id: caseStudy.id, tool_id })));
    }

    await supabase
      .from("case_study_team_involvement")
      .delete()
      .eq("case_study_id", caseStudy.id);
    if (teamIds.length > 0) {
      await supabase.from("case_study_team_involvement").insert(
        teamIds.map((team_involvement_type_id) => ({
          case_study_id: caseStudy.id,
          team_involvement_type_id,
        })),
      );
    }

    console.log(`  ✓ saved (${headerImages.length} header, ${progressImages.length} progress images)`);
  }

  console.log(
    "\nDone. NOTE: 'services' and 'Key Features Delivered' were not seeded — " +
      "those Bubble fields reference tables not yet scanned. Re-run once you " +
      "share that data, or add them manually in /admin/case-studies.",
  );
}

main();
