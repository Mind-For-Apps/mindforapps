import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { MultiImageUploadField } from "@/components/admin/MultiImageUploadField";
import { CheckboxGroup } from "@/components/admin/CheckboxGroup";
import {
  TextField,
  TextAreaField,
  SelectField,
  FormSection,
} from "@/components/admin/FormField";

type LookupOption = { id: string; name: string };

type TemplateRow = {
  id: string;
  slug: string;
  title: string;
  description_short: string | null;
  description_long_1: string | null;
  description_long_2: string | null;
  images: string[];
  design_images: string[];
  new_images: string[];
  demo_accounts_url: string | null;
  demo_preview_url: string | null;
  documentation_url: string | null;
  shop_url: string | null;
  platform_type: string | null;
  user_roles: string | null;
  price: number | null;
  is_public: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_image_url: string | null;
  youtube_video: string | null;
  sort_order: number;
};

const PLATFORM_TYPES = [
  "Marketplace",
  "Booking System",
  "Directory",
  "Membership Platform",
  "SaaS Platform",
  "CRM-Based",
  "Internal Tool",
];

const USER_ROLES = [
  "Multi-Role System",
  "Admin + Users",
  "Single Role",
  "Two-Sided Marketplace",
];

export function TemplateForm({
  action,
  template,
  categories,
  featureTags,
  selectedCategoryIds,
  selectedFeatureTagIds,
}: {
  action: (formData: FormData) => void;
  template?: TemplateRow;
  categories: LookupOption[];
  featureTags: LookupOption[];
  selectedCategoryIds: string[];
  selectedFeatureTagIds: string[];
}) {
  const t = template;
  const idPrefix = t?.id ?? "new";

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Basics">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="title" label="Title" defaultValue={t?.title} required />
          <TextField name="slug" label="Slug" defaultValue={t?.slug} required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <TextField name="price" label="Price (USD)" type="number" defaultValue={t?.price} />
          <TextField name="sort_order" label="Sort order" type="number" defaultValue={t?.sort_order ?? 0} />
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-black">
            <input type="checkbox" name="is_public" defaultChecked={t?.is_public ?? true} />
            Public
          </label>
        </div>
      </FormSection>

      <FormSection title="Content">
        <TextAreaField
          name="description_short"
          label="Short description"
          defaultValue={t?.description_short}
        />
        <TextAreaField
          name="description_long_1"
          label="Long description 1"
          defaultValue={t?.description_long_1}
          rows={5}
        />
        <TextAreaField
          name="description_long_2"
          label="Long description 2"
          defaultValue={t?.description_long_2}
          rows={8}
        />
      </FormSection>

      <FormSection title="Media">
        <MultiImageUploadField
          name="images"
          label="Images"
          defaultValues={t?.images}
          pathPrefix={`templates/${idPrefix}/images`}
        />
        <MultiImageUploadField
          name="design_images"
          label="Design images"
          defaultValues={t?.design_images}
          pathPrefix={`templates/${idPrefix}/design`}
        />
        <MultiImageUploadField
          name="new_images"
          label="New images"
          defaultValues={t?.new_images}
          pathPrefix={`templates/${idPrefix}/new-images`}
        />
      </FormSection>

      <FormSection title="Links">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="shop_url" label="Shop URL" defaultValue={t?.shop_url} />
          <TextField name="demo_preview_url" label="Demo preview URL" defaultValue={t?.demo_preview_url} />
          <TextField name="demo_accounts_url" label="Demo accounts URL" defaultValue={t?.demo_accounts_url} />
          <TextField name="documentation_url" label="Documentation URL" defaultValue={t?.documentation_url} />
          <TextField name="youtube_video" label="YouTube video ID" defaultValue={t?.youtube_video} />
        </div>
      </FormSection>

      <FormSection title="Classification">
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            name="platform_type"
            label="Platform type"
            defaultValue={t?.platform_type}
            options={PLATFORM_TYPES}
          />
          <SelectField
            name="user_roles"
            label="User roles"
            defaultValue={t?.user_roles}
            options={USER_ROLES}
          />
        </div>
        <CheckboxGroup
          name="category_ids"
          label="Categories"
          options={categories}
          selectedIds={selectedCategoryIds}
        />
        <CheckboxGroup
          name="feature_tag_ids"
          label="Features"
          options={featureTags}
          selectedIds={selectedFeatureTagIds}
        />
      </FormSection>

      <FormSection title="SEO">
        <TextField name="seo_title" label="SEO title" defaultValue={t?.seo_title} />
        <TextAreaField name="seo_description" label="SEO description" defaultValue={t?.seo_description} />
        <ImageUploadField
          name="seo_image_url"
          label="SEO image"
          defaultValue={t?.seo_image_url}
          pathPrefix={`templates/${idPrefix}`}
        />
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {t ? "Save changes" : "Create template"}
      </button>
    </form>
  );
}
