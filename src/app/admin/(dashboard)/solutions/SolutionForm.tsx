import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageUploadField } from "@/components/admin/MultiImageUploadField";
import { CheckboxGroup } from "@/components/admin/CheckboxGroup";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";
import { TextListRepeater } from "@/components/admin/TextListRepeater";
import { SolutionFeaturesRepeater } from "./SolutionFeaturesRepeater";

type LookupOption = { id: string; name: string };

type FeatureLabel = { title: string; color: string; bgColor: string };
type FeatureCategory = { name: string; labels: FeatureLabel[] };

type SolutionRow = {
  id: string;
  slug: string | null;
  title: string;
  title_long: string | null;
  title_for_cards: string | null;
  price_label: string | null;
  is_estimate_link: boolean;
  tags: string[];
  more_count: number;
  designed_for: string[];
  with_mfa: string[];
  without_mfa: string[];
  main_image_url: string | null;
  features_image_url: string | null;
  whats_included_icon_url: string | null;
  images: string[];
  images_cover: string[];
  text_0: string | null;
  text_1: string | null;
  text_2: string | null;
  text_3: string | null;
  text_4: string | null;
  text_5: string | null;
  text_6: string | null;
  text_7: string | null;
  text_8: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_published: boolean;
  sort_order: number;
};

export function SolutionForm({
  action,
  solution,
  tools,
  selectedToolIds,
  featureCategories,
}: {
  action: (formData: FormData) => void;
  solution?: SolutionRow;
  tools: LookupOption[];
  selectedToolIds: string[];
  featureCategories: FeatureCategory[];
}) {
  const s = solution;
  const idPrefix = s?.id ?? "new";

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Basics">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="title" label="Title (industry name)" defaultValue={s?.title} required />
          <TextField name="slug" label="Slug" defaultValue={s?.slug} required />
        </div>
        <TextField name="title_long" label="Title (long)" defaultValue={s?.title_long} />
        <TextAreaField
          name="title_for_cards"
          label="Title for cards (marketing paragraph)"
          defaultValue={s?.title_for_cards}
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField name="sort_order" label="Sort order" type="number" defaultValue={s?.sort_order ?? 0} />
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-black">
            <input type="checkbox" name="is_published" defaultChecked={s?.is_published ?? true} />
            Published
          </label>
        </div>
      </FormSection>

      <FormSection title="Pricing & Tags">
        <TextField
          name="price_label"
          label="Price label (e.g. Starting at 1500 USD)"
          defaultValue={s?.price_label}
        />
        <label className="flex items-center gap-2 text-sm font-medium text-black">
          <input
            type="checkbox"
            name="is_estimate_link"
            defaultChecked={s?.is_estimate_link ?? false}
          />
          Show &ldquo;Get Your Estimation&rdquo; link instead of price
        </label>
        <TextListRepeater name="tags" label="Tags" defaultValues={s?.tags} />
        <TextField
          name="more_count"
          label={'"+N" count'}
          type="number"
          defaultValue={s?.more_count ?? 0}
        />
        <TextListRepeater name="designed_for" label="Designed for" defaultValues={s?.designed_for} />
      </FormSection>

      <FormSection title="With MFA vs. Without MFA">
        <TextListRepeater name="with_mfa" label="With MFA" defaultValues={s?.with_mfa} />
        <TextListRepeater name="without_mfa" label="Without MFA" defaultValues={s?.without_mfa} />
      </FormSection>

      <FormSection title="Copy blocks">
        <TextAreaField name="text_0" label="Text 0" defaultValue={s?.text_0} />
        <TextAreaField name="text_1" label="Text 1" defaultValue={s?.text_1} />
        <TextAreaField name="text_2" label="Text 2" defaultValue={s?.text_2} />
        <TextAreaField name="text_3" label="Text 3" defaultValue={s?.text_3} />
        <TextAreaField name="text_4" label="Text 4" defaultValue={s?.text_4} />
        <TextAreaField name="text_5" label="Text 5" defaultValue={s?.text_5} />
        <TextAreaField name="text_6" label="Text 6 (what problem)" defaultValue={s?.text_6} />
        <TextAreaField name="text_7" label="Text 7 (you need)" defaultValue={s?.text_7} />
        <TextAreaField name="text_8" label="Text 8" defaultValue={s?.text_8} />
      </FormSection>

      <FormSection title="Media">
        <div className="grid grid-cols-3 gap-4">
          <ImageUploadField
            name="main_image_url"
            label="Main image"
            defaultValue={s?.main_image_url}
            pathPrefix={`solutions/${idPrefix}`}
          />
          <ImageUploadField
            name="features_image_url"
            label="Features image"
            defaultValue={s?.features_image_url}
            pathPrefix={`solutions/${idPrefix}`}
          />
          <ImageUploadField
            name="whats_included_icon_url"
            label="What's included icon"
            defaultValue={s?.whats_included_icon_url}
            pathPrefix={`solutions/${idPrefix}`}
          />
        </div>
        <MultiImageUploadField
          name="images"
          label="Images"
          defaultValues={s?.images}
          pathPrefix={`solutions/${idPrefix}/images`}
        />
        <MultiImageUploadField
          name="images_cover"
          label="Cover images"
          defaultValues={s?.images_cover}
          pathPrefix={`solutions/${idPrefix}/cover`}
        />
      </FormSection>

      <FormSection title="Tools">
        <CheckboxGroup name="tool_ids" label="Tools" options={tools} selectedIds={selectedToolIds} />
      </FormSection>

      <FormSection title="Feature Categories">
        <SolutionFeaturesRepeater defaultValues={featureCategories} />
      </FormSection>

      <FormSection title="SEO">
        <TextField name="seo_title" label="SEO title" defaultValue={s?.seo_title} />
        <TextAreaField name="seo_description" label="SEO description" defaultValue={s?.seo_description} />
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {s ? "Save changes" : "Create solution"}
      </button>
    </form>
  );
}
