// One-off data migration: seeds the shared "faqs" table from the client's
// real FAQ export (exported from the old Bubble.io app).
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0011_faqs.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-faqs.ts

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

type FaqRow = {
  question: string;
  answer: string;
  showOnIndex: boolean;
  realEstateNr: number | null;
};

async function main() {
  const faqs: FaqRow[] = JSON.parse(
    readFileSync(new URL("./faqs-data.json", import.meta.url), "utf8"),
  );

  console.log(`Seeding ${faqs.length} FAQs...`);
  for (const [i, faq] of faqs.entries()) {
    const { data: existing } = await supabase
      .from("faqs")
      .select("id")
      .eq("question", faq.question)
      .maybeSingle();

    const payload = {
      question: faq.question,
      answer: faq.answer,
      show_on_index: faq.showOnIndex,
      real_estate_sort_order: faq.realEstateNr,
      sort_order: i,
    };

    const { error } = existing
      ? await supabase.from("faqs").update(payload).eq("id", existing.id)
      : await supabase.from("faqs").insert(payload);

    if (error) {
      console.error(`  ! failed to save "${faq.question}": ${error.message}`);
      continue;
    }

    console.log(`  ✓ ${faq.question}`);
  }

  console.log("\nDone.");
}

main();
