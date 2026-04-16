const DEFAULT_URL =
  "https://screenshot-service-production-85f1.up.railway.app/screenshot";

type Opts = {
  html: string;
  width: number;
  height: number;
  filename?: string;
};

export async function screenshotHtml({
  html,
  width,
  height,
  filename,
}: Opts): Promise<string> {
  const url = process.env.SCREENSHOT_SERVICE_URL ?? DEFAULT_URL;
  const user = process.env.SCREENSHOT_AUTH_USER;
  const pass = process.env.SCREENSHOT_AUTH_PASS;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (user && pass) {
    const creds = Buffer.from(`${user}:${pass}`).toString("base64");
    headers["Authorization"] = `Basic ${creds}`;
  }

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ html, width, height, filename }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `screenshot-service ${res.status}: ${text.slice(0, 200)}`,
    );
  }

  const data = (await res.json()) as { url?: string };
  if (!data.url) throw new Error("screenshot-service: missing url in response");
  return data.url;
}
