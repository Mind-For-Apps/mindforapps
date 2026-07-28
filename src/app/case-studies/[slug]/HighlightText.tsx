import { parseHighlight } from "@/lib/parse-highlight";

export function HighlightText({ raw }: { raw: string }) {
  const segments = parseHighlight(raw);

  return (
    <>
      {segments.map((segment, i) =>
        segment.color ? (
          <strong
            key={i}
            style={{ color: segment.color }}
            className="font-semibold"
          >
            {segment.text}
          </strong>
        ) : (
          <span key={i}>{segment.text}</span>
        ),
      )}
    </>
  );
}
