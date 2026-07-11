"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const TABLES = ["services", "tools", "team_involvement_types"] as const;
export type LookupTable = (typeof TABLES)[number];

function assertTable(table: string): asserts table is LookupTable {
  if (!TABLES.includes(table as LookupTable)) {
    throw new Error(`Unknown lookup table: ${table}`);
  }
}

export async function addLookupItem(table: string, formData: FormData) {
  assertTable(table);
  const name = (formData.get("name") as string)?.trim();
  if (!name) return;
  const iconUrl = (formData.get("icon_url") as string) || null;

  const supabase = await createClient();
  await supabase
    .from(table)
    .insert(
      table === "team_involvement_types"
        ? { name }
        : { name, icon_url: iconUrl },
    );

  revalidatePath("/admin/reference");
}

export async function deleteLookupItem(table: string, id: string) {
  assertTable(table);
  const supabase = await createClient();
  await supabase.from(table).delete().eq("id", id);
  revalidatePath("/admin/reference");
}
