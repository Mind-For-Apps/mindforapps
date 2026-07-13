import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { addCategory, deleteCategory } from "./actions";

type Category = {
  id: string;
  title: string;
  short_title: string;
  icon_url: string | null;
};

export function CategoriesSection({ items }: { items: Category[] }) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6">
      <h2 className="text-lg font-semibold text-black">Categories</h2>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg bg-brand-surface px-4 py-2"
          >
            <div className="flex items-center gap-3">
              {item.icon_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.icon_url}
                  alt=""
                  className="size-6 object-contain"
                />
              )}
              <span className="text-sm text-black">{item.title}</span>
              <span className="text-xs text-brand-gray">({item.short_title})</span>
            </div>
            <form action={deleteCategory.bind(null, item.id)}>
              <button
                type="submit"
                className="text-sm text-brand-gray hover:text-red-600"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
        {items.length === 0 && (
          <li className="text-sm text-brand-gray">No categories yet.</li>
        )}
      </ul>

      <form action={addCategory} className="flex items-end gap-3 pt-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black">Title</label>
          <input
            name="title"
            required
            className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black">Short title</label>
          <input
            name="short_title"
            className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        <ImageUploadField name="icon_url" label="Icon" pathPrefix="reference/categories" />
        <button
          type="submit"
          className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Add
        </button>
      </form>
    </section>
  );
}
