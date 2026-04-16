import { createElement, type ComponentType } from "react";

const FONT_LINKS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">`;

const FONT_WAIT_SCRIPT = `<script>document.fonts.ready.then(function(){document.body.classList.add("fonts-ready")});</script>`;

type Opts = {
  width: number;
  height: number;
};

// Dynamic import of react-dom/server — Next.js static analyzer blocks
// top-level imports of react-dom/server in any module reachable from /app.
// This runs ONLY inside POST /api/render (runtime: "nodejs"), so it's safe.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function renderTemplateToHtml<P extends Record<string, any>>(
  Component: ComponentType<P>,
  data: P,
  { width, height }: Opts,
): Promise<string> {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const body = renderToStaticMarkup(createElement(Component, data));
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
${FONT_LINKS}
<style>
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; width: ${width}px; height: ${height}px; overflow: hidden; font-family: Inter, "Segoe UI", sans-serif; }
  img { display: block; }
</style>
</head>
<body>${body}
${FONT_WAIT_SCRIPT}
</body>
</html>`;
}
