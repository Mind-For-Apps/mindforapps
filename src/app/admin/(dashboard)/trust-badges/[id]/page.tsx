import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TrustBadgeForm } from "../TrustBadgeForm";
import { updateTrustBadge } from "../actions";

export default async function EditTrustBadgePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: badge } = await supabase
    .from("trust_badges")
    .select("*")
    .eq("id", id)
    .single();

  if (!badge) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit Trust Badge</h1>
      <TrustBadgeForm action={updateTrustBadge.bind(null, id)} badge={badge} />
    </div>
  );
}
