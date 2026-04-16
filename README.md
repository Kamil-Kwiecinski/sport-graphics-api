# sport-graphics-api

API do generowania grafik sportowych (Instagram post 1080×1080, story 1080×1920). React templates → HTML → PNG przez [screenshot-service](https://github.com/Kamil-Kwiecinski/screenshot-service).

Obsługiwane sporty: **piłka nożna**, **siatkówka**. Koszykówka / hokej — typy gotowe, templatki do dodania.

## Stack

- Next.js 14 (App Router) + TypeScript
- React templates (server-rendered)
- Zod (walidacja danych wejściowych)
- Downstream: `screenshot-service` (Puppeteer + Cloudinary) — nie duplikujemy

## Endpoint

### `GET /api/render`
Lista dostępnych szablonów.

### `POST /api/render`

```json
{
  "template": "football/result-post",
  "data": { ... },
  "width": 1080,
  "height": 1080,
  "filename": "optional-custom-name"
}
```

Response:
```json
{
  "url": "https://res.cloudinary.com/.../grafika.png",
  "template": "football/result-post",
  "width": 1080,
  "height": 1080,
  "duration_ms": 2341
}
```

Header `X-API-Key` — wymagany tylko jeśli ustawiłeś `API_KEY` w env.

## Dostępne szablony

| ID | Sport | Rozmiar |
|---|---|---|
| `football/result-post` | football | 1080×1080 |
| `football/result-story` | football | 1080×1920 |
| `volleyball/result-post` | volleyball | 1080×1080 |
| `volleyball/result-story` | volleyball | 1080×1920 |

Każdy szablon ma własny `zod` schema — zobacz `src/templates/<sport>/<Name>.tsx` żeby zobaczyć dokładny kontrakt.

## Preview w przeglądarce

Podczas developmentu (lub po deployu):

```
https://<domain>/preview/football/result-post?data=<url-encoded-JSON>
```

Renderuje sam template bez odpalania screenshot-service. Idealne do iterowania nad stylem.

## Uruchomienie lokalne

```bash
cp .env.example .env.local
# wypełnij SCREENSHOT_SERVICE_URL (i auth jeśli używasz)
npm install
npm run dev
# → http://localhost:3000
```

## Deploy Vercel

1. Push do GitHub (`Kamil-Kwiecinski/sport-graphics-api`)
2. Vercel → Import Project → wybierz repo
3. W Settings → Environment Variables ustaw:
   - `SCREENSHOT_SERVICE_URL`
   - `SCREENSHOT_AUTH_USER` / `SCREENSHOT_AUTH_PASS` (jeśli basic auth)
   - `API_KEY` (opcjonalnie — shared secret dla n8n)
4. Deploy

Twój endpoint: `https://sport-graphics-api-<hash>.vercel.app/api/render`

## Integracja z n8n (Liga — Renderer)

Zamiast generować HTML w `Generuj HTML z foto` + slać do `screenshot-service`, zrób **jeden HTTP Request** do naszego API:

- **Method**: POST
- **URL**: `https://<your-domain>/api/render`
- **Body**:
  ```json
  {
    "template": "football/result-post",
    "data": { ... dane z "Złącz dane meczu" przemapowane do naszego schema ... }
  }
  ```
- **Response** ma `url` — identyczny format jak screenshot-service.

**Mapowanie danych z obecnego n8n:**

```js
// W n8n code node "Mapuj do sport-graphics-api"
const d = $input.first().json;

const isFootball = d.sport === "football";
const template = isFootball
  ? "football/result-post"
  : "volleyball/result-post";

const data = {
  kolejka: d.kolejka || "",
  grupa: d.grupa || "",
  liga: {
    name: d.liga_name || "Liga",
    logo_url: d.logo_liga || "",
    primary_color: d.color_liga || "#004aad",
  },
  team_home: {
    name: d.team_home,
    logo_url: d.logo_home || "",
    primary_color: d.color_home || "#1a56db",
  },
  team_away: {
    name: d.team_away,
    logo_url: d.logo_away || "",
    primary_color: d.color_away || "#dc2626",
  },
  sponsorzy: d.post?.sponsorzy || [],
  score: isFootball
    ? {
        goals_home: d.goals_home || 0,
        goals_away: d.goals_away || 0,
        half_home: d.half_home || 0,
        half_away: d.half_away || 0,
        scorers_home: d.scorers_home || [],
        scorers_away: d.scorers_away || [],
      }
    : {
        sets_home: d.sets_home || 0,
        sets_away: d.sets_away || 0,
        set_scores: d.played_sets || [],
      },
};

return [{ json: { template, data } }];
```

## Dodanie nowego szablonu

1. Utwórz `src/templates/<sport>/<Name>.tsx` — React component + `zod` schema export
2. Zarejestruj w `src/templates/registry.ts`
3. Commit + push → Vercel auto-deploy
4. Gotowe — `POST /api/render { template: "<sport>/<name-kebab>", ... }`

Nowy sport (np. `basketball/top-scorer`)? Tak samo — katalog + komponent + rejestracja.

## Roadmap

- [ ] Template foto (tło + overlay) — Sprint 2
- [ ] Split panel style — Sprint 2
- [ ] Basketball templates
- [ ] Hockey templates
- [ ] Multi-tenant (org branding override)
- [ ] Cache + deduplikacja (idempotent renders)
- [ ] Playwright visual regression testy
