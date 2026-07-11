import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { addLookupItem, deleteLookupItem, type LookupTable } from "./actions";

type LookupItem = {
  id: string;
  name: string;
  icon_url?: string | null;
};

export function LookupSection({
  table,
  title,
  items,
  hasIcon,
}: {
  table: LookupTable;
  title: string;
  items: LookupItem[];
  hasIcon: boolean;
}) {
  const addAction = addLookupItem.bind(null, table);

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-white p-6">
      <h2 className="text-lg font-semibold text-black">{title}</h2>

      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg bg-brand-surface px-4 py-2"
          >
            <div className="flex items-center gap-3">
              {hasIcon && item.icon_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.icon_url}
                  alt=""
                  className="size-6 object-contain"
                />
              )}
              <span className="text-sm text-black">{item.name}</span>
            </div>
            <form action={deleteLookupItem.bind(null, table, item.id)}>
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
          <li className="text-sm text-brand-gray">No items yet.</li>
        )}
      </ul>

      <form action={addAction} className="flex items-end gap-3 pt-2">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-sm font-medium text-black">Name</label>
          <input
            name="name"
            required
            className="rounded-lg border border-black/15 px-3 py-2 text-sm outline-none focus:border-brand-accent"
          />
        </div>
        {hasIcon && (
          <ImageUploadField
            name="icon_url"
            label="Icon"
            pathPrefix={`reference/${table}`}
          />
        )}
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
