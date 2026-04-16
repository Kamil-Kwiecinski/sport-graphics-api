import { listTemplates } from "@/templates/registry";

export default function HomePage() {
  const templates = listTemplates();
  return (
    <main
      style={{
        fontFamily: "ui-monospace, SFMono-Regular, monospace",
        padding: 32,
        maxWidth: 900,
        margin: "0 auto",
        color: "#222",
      }}
    >
      <h1 style={{ marginBottom: 8 }}>Sport Graphics API</h1>
      <p style={{ color: "#666" }}>
        POST <code>/api/render</code> z JSON-em{" "}
        <code>{`{ template, data, width?, height?, filename? }`}</code> żeby
        wygenerować grafikę.
      </p>

      <h2 style={{ marginTop: 32 }}>Dostępne szablony</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={th}>Template ID</th>
            <th style={th}>Sport</th>
            <th style={th}>Rozmiar</th>
            <th style={th}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((t) => (
            <tr key={t.id}>
              <td style={td}>
                <code>{t.id}</code>
              </td>
              <td style={td}>{t.sport}</td>
              <td style={td}>
                {t.defaultWidth}×{t.defaultHeight}
              </td>
              <td style={td}>
                <a
                  href={`/preview/${t.id}?data=${encodeURIComponent(
                    JSON.stringify(sampleFor(t.id)),
                  )}`}
                  style={{ color: "#0070f3" }}
                >
                  /preview/{t.id}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 32 }}>Przykład</h2>
      <pre style={pre}>{example}</pre>
    </main>
  );
}

const th: React.CSSProperties = {
  border: "1px solid #ddd",
  padding: "8px 12px",
  textAlign: "left",
  background: "#f9f9f9",
};
const td: React.CSSProperties = {
  border: "1px solid #eee",
  padding: "8px 12px",
  verticalAlign: "top",
};
const pre: React.CSSProperties = {
  background: "#0a0a0a",
  color: "#e0e0e0",
  padding: 16,
  borderRadius: 6,
  fontSize: 13,
  overflow: "auto",
};

const example = `curl -X POST https://<your-domain>/api/render \\
  -H "Content-Type: application/json" \\
  -d '{
    "template": "football/result-post",
    "data": {
      "kolejka": "Kolejka 1",
      "grupa": "Senior",
      "liga": { "name": "Liga", "primary_color": "#ffffff" },
      "team_home": { "name": "Pogoń Szczecin", "primary_color": "#004aad" },
      "team_away": { "name": "Wisła Kraków", "primary_color": "#7922bd" },
      "score": {
        "goals_home": 3, "goals_away": 1,
        "half_home": 1, "half_away": 0,
        "scorers_home": [{"name":"Kowalski","minute":12}],
        "scorers_away": [{"name":"Messi","minute":45}]
      },
      "sponsorzy": []
    }
  }'`;

function sampleFor(id: string): unknown {
  const base = {
    kolejka: "Kolejka 1",
    grupa: "Senior",
    liga: { name: "Liga", primary_color: "#ffffff" },
    team_home: { name: "Pogoń Szczecin", primary_color: "#004aad" },
    team_away: { name: "Wisła Kraków", primary_color: "#7922bd" },
    sponsorzy: [],
  };
  if (id.startsWith("football"))
    return {
      ...base,
      score: {
        goals_home: 3,
        goals_away: 1,
        half_home: 1,
        half_away: 0,
        scorers_home: [{ name: "Kowalski", minute: 12 }],
        scorers_away: [{ name: "Messi", minute: 45 }],
      },
    };
  return {
    ...base,
    score: {
      sets_home: 3,
      sets_away: 1,
      set_scores: [
        { home: 25, away: 22 },
        { home: 25, away: 15 },
        { home: 20, away: 25 },
        { home: 25, away: 18 },
      ],
    },
  };
}
