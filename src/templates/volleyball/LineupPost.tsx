import { LineupGraphicSchema } from "@/types/lineup";
import { LigaLogo } from "../_shared/LigaLogo";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { LineupTitle } from "../_shared/LineupTitle";
import { PlayerTile } from "../_shared/PlayerTile";
import type { z } from "zod";

export const volleyballLineupPostSchema = LineupGraphicSchema;
export type VolleyballLineupPostProps = z.infer<typeof volleyballLineupPostSchema>;

/**
 * Starting Lineup — post 1080×1080 (siatkówka).
 *
 * Layout:
 *   ┌──────────────────────────────────────┐
 *   │  logo ligi + HeaderStrip             │  ~top 40-80px
 *   │  "WYJŚCIOWA SZÓSTKA"                 │  LineupTitle
 *   │  ┌───┐ ┌───┐ ┌───┐                   │
 *   │  │ 1 │ │ 2 │ │ 3 │   grid 3×2        │
 *   │  └───┘ └───┘ └───┘   6 zawodników    │
 *   │  ┌───┐ ┌───┐ ┌───┐                   │
 *   │  │ 4 │ │ 5 │ │ 6 │                   │
 *   │  └───┘ └───┘ └───┘                   │
 *   │          ┌───┐                        │
 *   │          │ L │  libero osobno         │
 *   │          └───┘                        │
 *   │  drużyna vs przeciwnik                │
 *   │  #hashtag + SponsorBar                │
 *   └──────────────────────────────────────┘
 */
export function VolleyballLineupPost(props: VolleyballLineupPostProps) {
  const {
    kolejka,
    kategoria_wiekowa,
    faza_rozgrywek,
    liga,
    sponsorzy,
    team,
    match,
    players,
  } = props;

  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const cLiga = liga.primary_color;
  const cTeam = team.primary_color;

  const starters = players.filter((p) => !p.is_libero).slice(0, 6);
  const libero = players.find((p) => p.is_libero);

  // Grid 3 kolumny × 2 rzędy na szerokość ~960 (margin 60 z każdej strony)
  const gridW = 900;
  const tileGap = 18;
  const tileSize = Math.floor((gridW - tileGap * 2) / 3);
  const liberoSize = Math.round(tileSize * 0.88);

  // Opponent string dla kontekstu
  const ownIsHome = match.team_home
    .toLowerCase()
    .includes(team.name.toLowerCase());
  const opponent = ownIsHome ? match.team_away : match.team_home;
  const vsLine = opponent ? `VS ${opponent.toUpperCase()}` : "";

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 55%, #000611 100%)`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: sponsorBarH,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 32,
          paddingBottom: 24 + sponsorBarH,
          gap: 18,
          zIndex: 2,
        }}
      >
        {/* Top — liga logo + header strip */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
          }}
        >
          <LigaLogo liga={liga} size={64} />
          <HeaderStrip
            segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
        </div>

        {/* Title */}
        <LineupTitle size="default" />

        {/* Grid 3×2 starters */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(3, ${tileSize}px)`,
            gridTemplateRows: `${tileSize}px ${tileSize}px`,
            gap: tileGap,
            width: gridW,
          }}
        >
          {starters.map((p, i) => (
            <PlayerTile key={`s-${i}`} team={team} player={p} width={tileSize} />
          ))}
        </div>

        {/* Libero osobno — zaraz pod gridem nie wchodzi bo 2xtile + title zajmuje > 700px;
            więc renderujemy w rzędzie z chipem "LIBERO" obok */}
        {libero ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "rgba(255,255,255,0.8)",
                textTransform: "uppercase",
                letterSpacing: 4,
              }}
            >
              LIBERO
            </span>
            <div
              style={{
                width: 2,
                height: 40,
                background: "rgba(255,255,255,0.2)",
              }}
            />
            <PlayerTile team={team} player={libero} width={liberoSize} />
          </div>
        ) : null}

        {/* Spacer — flex-grow spycha kontekst meczu do dołu */}
        <div style={{ flex: 1 }} />

        {/* Match context */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 400,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            <span
              style={{
                background: cTeam,
                color: "#0d1117",
                fontSize: 22,
                fontWeight: 800,
                padding: "4px 16px",
                borderRadius: 10,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {team.name}
            </span>
            {vsLine ? (
              <span
                style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                }}
              >
                {vsLine}
              </span>
            ) : null}
          </div>
          {match.data || match.godzina || match.miejsce ? (
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 16,
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: 1.5,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {[match.data, match.godzina, match.miejsce]
                .filter(Boolean)
                .join(" · ")}
            </span>
          ) : null}
        </div>
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
