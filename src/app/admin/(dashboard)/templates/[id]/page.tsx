import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TemplateForm } from "../TemplateForm";
import { updateTemplate } from "../actions";
import { getTemplateLookupOptions } from "../lookups";

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [
    { data: template },
    { data: templateCategories },
    { data: templateFeatures },
    lookupOptions,
  ] = await Promise.all([
    supabase.from("templates").select("*").eq("id", id).single(),
    supabase.from("template_categories").select("category_id").eq("template_id", id),
    supabase.from("template_features").select("feature_tag_id").eq("template_id", id),
    getTemplateLookupOptions(),
  ]);

  if (!template) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">Edit Template</h1>
      <TemplateForm
        action={updateTemplate.bind(null, id)}
        template={template}
        categories={lookupOptions.categories}
        featureTags={lookupOptions.featureTags}
        selectedCategoryIds={(templateCategories ?? []).map((c) => c.category_id)}
        selectedFeatureTagIds={(templateFeatures ?? []).map((f) => f.feature_tag_id)}
      />
    </div>
  );
}
