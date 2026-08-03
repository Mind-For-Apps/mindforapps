import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";

type TestimonialRow = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  quote: string;
  photo_url: string | null;
  project_image_url: string | null;
  project_logo_url: string | null;
  is_published: boolean;
  sort_order: number;
};

export function TestimonialForm({
  action,
  testimonial,
}: {
  action: (formData: FormData) => void;
  testimonial?: TestimonialRow;
}) {
  const t = testimonial;
  const idPrefix = t?.id ?? "new";

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Testimonial">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="name" label="Name" defaultValue={t?.name} required />
          <TextField name="role" label="Role" defaultValue={t?.role} />
        </div>
        <TextField name="company" label="Company" defaultValue={t?.company} />
        <TextAreaField name="quote" label="Quote" defaultValue={t?.quote} />
        <ImageUploadField
          name="photo_url"
          label="Photo"
          defaultValue={t?.photo_url}
          pathPrefix={`testimonials/${idPrefix}`}
        />
      </FormSection>

      <FormSection title="Project showcase (optional)">
        <p className="text-sm text-brand-gray">
          Shown on the homepage Testimonials card alongside the company
          tagline above. Leave blank to hide it for this testimonial.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <ImageUploadField
            name="project_image_url"
            label="Project screenshot"
            defaultValue={t?.project_image_url}
            pathPrefix={`testimonials/${idPrefix}`}
          />
          <ImageUploadField
            name="project_logo_url"
            label="Client logo"
            defaultValue={t?.project_logo_url}
            pathPrefix={`testimonials/${idPrefix}`}
          />
        </div>
      </FormSection>

      <FormSection title="Publishing">
        <div className="grid grid-cols-2 gap-4">
          <TextField name="sort_order" label="Sort order" type="number" defaultValue={t?.sort_order ?? 0} />
          <label className="flex items-center gap-2 self-end pb-2 text-sm font-medium text-black">
            <input type="checkbox" name="is_published" defaultChecked={t?.is_published ?? true} />
            Published
          </label>
        </div>
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {t ? "Save changes" : "Create testimonial"}
      </button>
    </form>
  );
}
