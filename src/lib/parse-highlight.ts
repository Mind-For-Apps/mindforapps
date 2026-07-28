// Bubble-style pseudo-markup: `[b][size=4][color=rgb(...)]highlighted text[/color][/size][/b]`
// embedded inside an otherwise plain sentence. Splits it into plain/highlighted segments
// instead of using dangerouslySetInnerHTML.
const HIGHLIGHT_PATTERN =
  /\[b\]\[size=\d+\]\[color=([^\]]+)\]([\s\S]*?)\[\/color\]\[\/size\]\[\/b\]/g;

export type HighlightSegment = { text: string; color: string | null };

export function parseHighlight(raw: string | null): HighlightSegment[] {
  if (!raw) return [];
  const trimmed = raw.trim();
  const segments: HighlightSegment[] = [];
  let lastIndex = 0;

  for (const match of trimmed.matchAll(HIGHLIGHT_PATTERN)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ text: trimmed.slice(lastIndex, index), color: null });
    }
    segments.push({ text: match[2], color: match[1] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < trimmed.length) {
    segments.push({ text: trimmed.slice(lastIndex), color: null });
  }

  return segments;
}
