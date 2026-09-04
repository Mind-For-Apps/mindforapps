// `next.config.ts` has `images.dangerouslyAllowSVG: true` (needed so remote
// SVG icons from Supabase Storage load through next/image at all) — but that
// flag also disables Next's own built-in "auto-unoptimize SVG src" shortcut
// (see node_modules/next/dist/shared/lib/get-img-props.js), so every SVG we
// render still gets routed through the paid Vercel Image Optimization
// pipeline for no visual benefit (a vector icon never needs raster resizing).
// Pass `unoptimized={isSvgSrc(url)}` on any <Image> whose src comes from the
// database/Storage (so it isn't guaranteed to be .svg) to opt back out.
export function isSvgSrc(src: string | null | undefined): boolean {
  if (!src) return false;
  return src.split("?")[0].toLowerCase().endsWith(".svg");
}
