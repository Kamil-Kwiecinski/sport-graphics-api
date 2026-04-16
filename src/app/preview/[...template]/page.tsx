import { notFound } from "next/navigation";
import { getTemplate } from "@/templates/registry";

export const dynamic = "force-dynamic";

type Props = {
  params: { template: string[] };
  searchParams: { data?: string };
};

export default function PreviewPage({ params, searchParams }: Props) {
  const templateId = params.template.join("/");
  const def = getTemplate(templateId);
  if (!def) notFound();

  let raw: unknown = {};
  if (searchParams.data) {
    try {
      raw = JSON.parse(searchParams.data);
    } catch {
      return (
        <ErrorView
          title="Invalid JSON in ?data"
          detail="Szukamy JSON zakodowanego jako ?data=..."
        />
      );
    }
  }

  const parsed = def.schema.safeParse(raw);
  if (!parsed.success) {
    return (
      <ErrorView
        title={`Invalid data for ${templateId}`}
        detail={<pre>{JSON.stringify(parsed.error.issues, null, 2)}</pre>}
      />
    );
  }

  const Component = def.Component;
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Oswald:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { margin: 0; background: #111; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 40px 0; }
          .frame { transform-origin: top center; }
        `}</style>
      </head>
      <body>
        <div
          className="frame"
          style={{ width: def.defaultWidth, height: def.defaultHeight }}
        >
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Component {...(parsed.data as any)} />
        </div>
      </body>
    </html>
  );
}

function ErrorView({
  title,
  detail,
}: {
  title: string;
  detail: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 24,
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        background: "#1e1e1e",
        color: "#f55",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "#f99" }}>{title}</h2>
      <div style={{ color: "#ccc" }}>{detail}</div>
    </div>
  );
}
