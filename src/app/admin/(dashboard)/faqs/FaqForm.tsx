import { TextField, TextAreaField, FormSection } from "@/components/admin/FormField";

type FaqRow = {
  id: string;
  question: string;
  answer: string;
  show_on_index: boolean;
  real_estate_sort_order: number | null;
  service_booking_sort_order: number | null;
  sort_order: number;
};

export function FaqForm({
  action,
  faq,
}: {
  action: (formData: FormData) => void;
  faq?: FaqRow;
}) {
  const f = faq;

  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="FAQ">
        <TextField name="question" label="Question" defaultValue={f?.question} required />
        <TextAreaField name="answer" label="Answer" defaultValue={f?.answer} />
        <label className="flex items-center gap-2 text-sm font-medium text-black">
          <input
            type="checkbox"
            name="show_on_index"
            defaultChecked={f?.show_on_index ?? false}
          />
          Show on homepage
        </label>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="real_estate_sort_order"
            label="Real Estate solution — position (leave blank to hide there)"
            type="number"
            defaultValue={f?.real_estate_sort_order ?? ""}
          />
          <TextField
            name="service_booking_sort_order"
            label="Service Booking solution — position (leave blank to hide there)"
            type="number"
            defaultValue={f?.service_booking_sort_order ?? ""}
          />
        </div>
        <TextField
          name="sort_order"
          label="Sort order (main FAQ page / homepage)"
          type="number"
          defaultValue={f?.sort_order ?? 0}
        />
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {f ? "Save changes" : "Create FAQ"}
      </button>
    </form>
  );
}
