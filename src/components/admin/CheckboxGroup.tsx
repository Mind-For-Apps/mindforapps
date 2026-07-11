type Option = { id: string; name: string };

export function CheckboxGroup({
  name,
  label,
  options,
  selectedIds,
}: {
  name: string;
  label: string;
  options: Option[];
  selectedIds: string[];
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-black">{label}</span>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {options.map((option) => (
          <label
            key={option.id}
            className="flex items-center gap-1.5 text-sm text-black"
          >
            <input
              type="checkbox"
              name={name}
              value={option.id}
              defaultChecked={selectedIds.includes(option.id)}
            />
            {option.name}
          </label>
        ))}
        {options.length === 0 && (
          <p className="text-sm text-brand-gray">
            No options yet — add some under Reference Data.
          </p>
        )}
      </div>
    </div>
  );
}
