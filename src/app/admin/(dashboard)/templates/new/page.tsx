import { TemplateForm } from "../TemplateForm";
import { createTemplate } from "../actions";
import { getTemplateLookupOptions } from "../lookups";

export default async function NewTemplatePage() {
  const { categories, featureTags } = await getTemplateLookupOptions();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-black">New Template</h1>
      <TemplateForm
        action={createTemplate}
        categories={categories}
        featureTags={featureTags}
        selectedCategoryIds={[]}
        selectedFeatureTagIds={[]}
      />
    </div>
  );
}
