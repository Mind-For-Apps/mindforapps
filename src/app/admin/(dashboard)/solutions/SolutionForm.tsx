import { TextField, FormSection } from "@/components/admin/FormField";
import { TextListRepeater } from "@/components/admin/TextListRepeater";

type SolutionRow = {
  title: string;
  price_label: string | null;
  is_estimate_link: boolean;
  tags: string[];
  more_count: number;
  is_published: boolean;
  sort_order: number;
};

export function SolutionForm({
  action,
  solution,
}: {
  action: (formData: FormData) => void;
  solution?: SolutionRow;
}) {
  return (
    <form action={action} className="flex flex-col gap-6">
      <FormSection title="Solution">
        <TextField name="title" label="Title" defaultValue={solution?.title} required />
        <TextField
          name="price_label"
          label="Price label (e.g. Starting at 1500 USD)"
          defaultValue={solution?.price_label}
        />
        <label className="flex items-center gap-2 text-sm font-medium text-black">
          <input
            type="checkbox"
            name="is_estimate_link"
            defaultChecked={solution?.is_estimate_link ?? false}
          />
          Show &ldquo;Get Your Estimation&rdquo; link instead of price
        </label>
        <TextListRepeater name="tags" label="Tags" defaultValues={solution?.tags} />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            name="more_count"
            label={'"+N" count'}
            type="number"
            defaultValue={solution?.more_count ?? 0}
          />
          <TextField
            name="sort_order"
            label="Sort order"
            type="number"
            defaultValue={solution?.sort_order ?? 0}
          />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-black">
          <input
            type="checkbox"
            name="is_published"
            defaultChecked={solution?.is_published ?? true}
          />
          Published
        </label>
      </FormSection>

      <button
        type="submit"
        className="bg-brand-gradient self-start rounded-full px-8 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        {solution ? "Save changes" : "Create solution"}
      </button>
    </form>
  );
}
