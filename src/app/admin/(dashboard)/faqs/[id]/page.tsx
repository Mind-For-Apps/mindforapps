import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FaqForm } from "../FaqForm";
import { updateFaq } from "../actions";

export default async function EditFaqPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: faq } = await supabase
    .from("faqs")
    .select("*")
    .eq("id", id)
    .single();

  if (!faq) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit FAQ</h1>
      <FaqForm action={updateFaq.bind(null, id)} faq={faq} />
    </div>
  );
}
