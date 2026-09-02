// One-off data migration: sets service_booking_sort_order on the 7 existing
// general FAQ rows (already seeded by seed-faqs.ts) that should show on the
// Service Booking solution page, in the order given by the client.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0016_service_booking_faqs.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-service-booking-faqs.ts

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add SUPABASE_SERVICE_ROLE_KEY to .env.local temporarily and re-run.",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const QUESTIONS_IN_ORDER = [
  "What is MindForApps and what do you build?",
  "What makes MindForApps different from other Bubble.io agencies?",
  "Why should I choose a no-code agency over a traditional development agency?",
  "What kinds of applications can MindForApps build on Bubble.io?",
  "Can you build my Bubble.io project from scratch, or do you only modify existing apps?",
  "How does MindForApps start a new no-code project?",
  "Will I own my Bubble.io app once the project is completed?",
];

async function main() {
  console.log(`Setting service_booking_sort_order on ${QUESTIONS_IN_ORDER.length} FAQs...`);

  for (const [i, question] of QUESTIONS_IN_ORDER.entries()) {
    const { data: existing } = await supabase
      .from("faqs")
      .select("id")
      .eq("question", question)
      .maybeSingle();

    if (!existing) {
      console.error(`  ! not found: "${question}"`);
      continue;
    }

    const { error } = await supabase
      .from("faqs")
      .update({ service_booking_sort_order: i + 1 })
      .eq("id", existing.id);

    if (error) {
      console.error(`  ! failed to update "${question}": ${error.message}`);
      continue;
    }

    console.log(`  ✓ ${i + 1}. ${question}`);
  }

  console.log("\nDone.");
}

main();
