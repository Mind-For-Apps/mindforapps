// One-off data migration: inserts (or updates) the 5 "Good to know" FAQ rows
// for the Free SEO Audit page and sets their free_seo_audit_sort_order.
// Upserts by question text, so re-running this script is safe.
//
// Requires SUPABASE_SERVICE_ROLE_KEY temporarily in .env.local (see
// seed-case-studies.ts for where to find it). Requires migration
// 0017_free_seo_audit_faqs.sql to have been run first.
//
// Run with:
//   node --env-file=.env.local --experimental-strip-types scripts/seed-free-seo-audit-faqs.ts

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

const FAQS = [
  {
    question: "What exactly will I walk away with?",
    answer:
      "You'll walk away with two or three specific, prioritized recommendations you can act on right away — not a vague list or a report you'll never open. You'll know what's costing you the most, what to fix first, and a clear path forward, whether or not you decide to work with us.",
  },
  {
    question: "Is the audit really free, or is there a catch?",
    answer:
      "Yes — the audit is completely free, with no card required and no catch. We offer it because being useful first is how we earn trust. Some of the businesses we audit go on to work with us; many don't, and that's fine. Either way, you keep the recommendations.",
  },
  {
    question: "What do you need from me to get started?",
    answer:
      "Just your website and the one thing frustrating you most — that's it. There are no documents to prepare and no data to pull together. The request form takes about two minutes, and Jay's team handles everything from there.",
  },
  {
    question:
      "My website is old and honestly a bit embarrassing — is that a problem?",
    answer:
      "Not at all — that's often when the audit is most useful. You won't be judged; you'll get a clear, practical read on what to fix first and what's actually worth your time. Most businesses we talk to know their site has fallen behind. The point of the call is to fix that.",
  },
  {
    question: "What is a GEO audit, and how is it different from SEO?",
    answer:
      "A GEO (generative engine optimization) audit checks whether AI assistants like ChatGPT, Claude, and Google's AI can find, understand, and recommend your business. SEO focuses on ranking in traditional search results; GEO focuses on being the option AI suggests. As more customers ask AI for recommendations, both decide whether people ever reach you.",
  },
];

async function main() {
  console.log(`Seeding ${FAQS.length} Free SEO Audit FAQs...`);

  for (const [i, faq] of FAQS.entries()) {
    const { data: existing } = await supabase
      .from("faqs")
      .select("id")
      .eq("question", faq.question)
      .maybeSingle();

    const payload = {
      question: faq.question,
      answer: faq.answer,
      free_seo_audit_sort_order: i + 1,
    };

    const { error } = existing
      ? await supabase.from("faqs").update(payload).eq("id", existing.id)
      : await supabase
          .from("faqs")
          .insert({ ...payload, show_on_index: false, sort_order: 0 });

    if (error) {
      console.error(`  ! failed to save "${faq.question}": ${error.message}`);
      continue;
    }

    console.log(`  ✓ ${i + 1}. ${faq.question}`);
  }

  console.log("\nDone.");
}

main();
