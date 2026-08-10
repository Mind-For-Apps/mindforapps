// Converts Bubble.io's bracket-tag rich text export format into clean,
// trusted HTML for the blog. Only handles the tag set actually seen in
// the client's blog export (`[highlight]`, `[color]`, `[b]`, `[h3]/[h4]`,
// `[size]`, `[url]`, `[ml]/[ol]/[ul]/[li]`) — not a general BBCode parser.
//
// The output is stored once at seed time and rendered with
// dangerouslySetInnerHTML, so it must never include untrusted input.

const OLD_SITE_HOST = "mindforapps.com";

function rewriteUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === OLD_SITE_HOST || parsed.hostname === `www.${OLD_SITE_HOST}`) {
      return "/templates";
    }
  } catch {
    // not an absolute URL — leave as-is
  }
  return url;
}

export function convertBubbleRichText(raw: string): string {
  let text = raw
    // stray BOM / mojibake artifacts from the Bubble CSV export
    .replace(/ï»¿/g, "")
    .replace(/\r\n/g, "\n");

  // Pure no-op wrapper tags — remove, keep inner content.
  text = text
    .replace(/\[highlight=[^\]]*\]/g, "")
    .replace(/\[\/highlight\]/g, "")
    .replace(/\[color=[^\]]*\]/g, "")
    .replace(/\[\/color\]/g, "");

  // "[ml]" is Bubble's multi-line-list wrapper. When it already wraps an
  // [ol]/[ul], just unwrap it; when it directly wraps bare [li] items with
  // no list tag at all (seen in this dataset), treat it as an implicit
  // bulleted list.
  text = text
    .replace(/\[ml\]\[ol\]/g, "[ol]")
    .replace(/\[\/ol\]\[\/ml\]/g, "[/ol]")
    .replace(/\[ml\]\[ul\]/g, "[ul]")
    .replace(/\[\/ul\]\[\/ml\]/g, "[/ul]")
    .replace(/\[ml\]/g, "[ul]")
    .replace(/\[\/ml\]/g, "[/ul]");

  // "[size=N][b]Text[/b][/size]" is used as a sub-heading in this dataset.
  text = text.replace(
    /\[size=\d+\]\s*\[b\]([\s\S]*?)\[\/b\]\s*\[\/size\]/g,
    "<h3>$1</h3>",
  );
  // Any remaining bare [size=N] wrapper — strip, keep inner text.
  text = text.replace(/\[size=\d+\]/g, "").replace(/\[\/size\]/g, "");

  // Headings, with or without a redundant inner [b].
  text = text
    .replace(/\[h4\]\s*\[b\]([\s\S]*?)\[\/b\]\s*\[\/h4\]/g, "<h4>$1</h4>")
    .replace(/\[h4\]([\s\S]*?)\[\/h4\]/g, "<h4>$1</h4>")
    .replace(/\[h3\]\s*\[b\]([\s\S]*?)\[\/b\]\s*\[\/h3\]/g, "<h3>$1</h3>")
    .replace(/\[h3\]([\s\S]*?)\[\/h3\]/g, "<h3>$1</h3>");

  // Links — old-site template links become /templates, everything else
  // is kept verbatim.
  text = text.replace(
    /\[url=([^\]]+)\]([\s\S]*?)\[\/url\]/g,
    (_match, url: string, label: string) =>
      `<a href="${rewriteUrl(url)}" class="text-brand-accent underline hover:no-underline">${label}</a>`,
  );
  // Collapse the empty/whitespace-only anchors this produces (Bubble
  // often wraps a stray space in its own [url] right before the real one).
  text = text.replace(/<a[^>]*>\s*<\/a>/g, " ");

  // Remaining bold.
  text = text.replace(/\[b\]([\s\S]*?)\[\/b\]/g, "<strong>$1</strong>");

  // Lists.
  text = text
    .replace(/\[li[^\]]*\]([\s\S]*?)\[\/li\]/g, "<li>$1</li>")
    .replace(/\[ul\]([\s\S]*?)\[\/ul\]/g, "<ul>$1</ul>")
    .replace(/\[ol\]([\s\S]*?)\[\/ol\]/g, "<ol>$1</ol>");

  // Drop empty list items (trailing blank [li] left over in the source).
  text = text.replace(/<li>\s*<\/li>/g, "");

  // Anything left over is an unrecognized tag — drop it rather than leak
  // raw bracket markup onto the page.
  text = text.replace(/\[[^\]]*\]/g, "");

  // Split around already-converted block elements so they're kept as-is,
  // and wrap everything else (plain text, possibly still glued directly
  // against a block element with no blank line in between) in <p>.
  const BLOCK_TAG = /(<h[34]>[\s\S]*?<\/h[34]>|<ul>[\s\S]*?<\/ul>|<ol>[\s\S]*?<\/ol>)/g;
  const html = text
    .split(BLOCK_TAG)
    .map((part) => {
      if (/^<(h3|h4|ul|ol)[\s>]/.test(part)) return part;
      return part
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `<p>${p.replace(/\n+/g, " ")}</p>`)
        .join("\n");
    })
    .filter(Boolean)
    .join("\n");

  return html;
}
