import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getTemplate, listTemplates } from "@/templates/registry";
import { renderTemplateToHtml } from "@/lib/render-html";
import { screenshotHtml } from "@/lib/screenshot-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const RequestSchema = z.object({
  template: z.string().min(1),
  data: z.record(z.unknown()),
  width: z.number().int().positive().max(4000).optional(),
  height: z.number().int().positive().max(4000).optional(),
  filename: z.string().optional(),
});

export async function GET() {
  // Zwróć listę szablonów — pomocne do discovery
  return NextResponse.json({
    templates: listTemplates().map((t) => ({
      id: t.id,
      sport: t.sport,
      defaultWidth: t.defaultWidth,
      defaultHeight: t.defaultHeight,
    })),
  });
}

export async function POST(req: NextRequest) {
  const started = Date.now();

  // Opcjonalna autoryzacja przez X-API-Key
  const apiKey = process.env.API_KEY;
  if (apiKey) {
    const provided = req.headers.get("x-api-key");
    if (provided !== apiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { template, data, filename } = parsed.data;
  const def = getTemplate(template);
  if (!def) {
    return NextResponse.json(
      {
        error: `Unknown template: ${template}`,
        available: listTemplates().map((t) => t.id),
      },
      { status: 404 },
    );
  }

  const width = parsed.data.width ?? def.defaultWidth;
  const height = parsed.data.height ?? def.defaultHeight;

  const dataValidated = def.schema.safeParse(data);
  if (!dataValidated.success) {
    return NextResponse.json(
      {
        error: `Invalid data for template ${template}`,
        issues: dataValidated.error.issues,
      },
      { status: 400 },
    );
  }

  try {
    const html = renderTemplateToHtml(def.Component, dataValidated.data, {
      width,
      height,
    });
    const url = await screenshotHtml({ html, width, height, filename });
    return NextResponse.json({
      url,
      template,
      width,
      height,
      duration_ms: Date.now() - started,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
