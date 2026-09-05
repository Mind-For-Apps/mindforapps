import { TextField, SelectField, FormSection } from "@/components/admin/FormField";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type TrustBadgeRow = {
  id: string;
  text: string;
  description: string | null;
  icon_url: string | null;
  type: string;
  sort_order: number;
};

export function TrustBadgeForm({
  action,
  badge,
}: {
  action: (formData: FormData) => void;
  badge?: TrustBadgeRow;
}) {
  const b = badge;

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Trust Badge">
        <TextField name="text" label="Text (bold headline)" defaultValue={b?.text} required />
        <TextField
          name="description"
          label="Description (subtitle, optional)"
          defaultValue={b?.description ?? ""}
        />
        <ImageUploadField
          name="icon_url"
          label="Icon (optional)"
          defaultValue={b?.icon_url}
          pathPrefix="trust-badges"
        />
        <SelectField
          name="type"
          label="Show on"
          defaultValue={b?.type ?? "both"}
          options={["both", "index", "solutions"]}
        />
        <TextField
          name="sort_order"
          label="Sort order"
          type="number"
          defaultValue={b?.sort_order ?? 0}
        />
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {b ? "Save changes" : "Create Trust Badge"}
      </button>
    </form>
  );
}
