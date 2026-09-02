const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function linkifyLine(line: string, lineKey: number) {
  const parts = line.split(URL_PATTERN);
  return parts.map((part, i) =>
    URL_PATTERN.test(part) ? (
      <a
        key={`${lineKey}-${i}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent hover:underline"
      >
        {part}
      </a>
    ) : (
      <span key={`${lineKey}-${i}`}>{part}</span>
    ),
  );
}

export function linkifyText(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => (
    <span key={i}>
      {linkifyLine(line, i)}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}
