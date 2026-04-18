import { LineupGraphicSchema } from "@/types/lineup";
import { LigaLogo } from "../_shared/LigaLogo";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { LineupTitle } from "../_shared/LineupTitle";
import { PlayerTile } from "../_shared/PlayerTile";
import type { z } from "zod";

function normalizeHashtag(raw: string): string {
  const t = (raw ?? "").trim();
  if (!t) return "";
  return t.startsWith("#") ? t : `#${t}`;
}

export const volleyballLineupStorySchema = LineupGraphicSchema;
export type VolleyballLineupStoryProps = z.infer<typeof volleyballLineupStorySchema>;

/**
 * Starting Lineup — story 1080×1920 (siatkówka).
 *
 * Więcej pionowej przestrzeni pozwala na większe kafelki i libero
 * wyraźnie wyróżniony w osobnej sekcji.
 */
export function VolleyballLineupStory(props: VolleyballLineupStoryProps) {
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

  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;
  const cLiga = liga.primary_color;
  const cTeam = team.primary_color;

  const starters = players.filter((p) => !p.is_libero).slice(0, 6);
  const libero = players.find((p) => p.is_libero);

  const gridW = 960;
  const tileGap = 24;
  const tileSize = Math.floor((gridW - tileGap * 2) / 3);
  const liberoSize = Math.round(tileSize * 1.05);

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
        height: 1920,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 50%, #000611 100%)`,
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
          height: 8,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: sponsorBarH,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 80,
          paddingBottom: 60 + sponsorBarH,
          gap: 32,
          zIndex: 2,
        }}
      >
        {/* Top — logo + header */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <LigaLogo liga={liga} size={100} />
          <HeaderStrip
            segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
        </div>

        <LineupTitle size="large" />

        {/* Grid 3×2 */}
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

        {/* Libero — wyraźna sekcja poniżej */}
        {libero ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 28,
                fontWeight: 700,
                color: "#ffd700",
                textTransform: "uppercase",
                letterSpacing: 6,
              }}
            >
              LIBERO
            </span>
            <PlayerTile team={team} player={libero} width={liberoSize} />
          </div>
        ) : null}

        <div style={{ flex: 1 }} />

        {/* Match context */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 520,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 18,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            <span
              style={{
                background: cTeam,
                color: "#0d1117",
                fontSize: 30,
                fontWeight: 800,
                padding: "6px 22px",
                borderRadius: 14,
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
                  fontSize: 30,
                  fontWeight: 600,
                  letterSpacing: 4,
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
                fontSize: 22,
                fontWeight: 500,
                color: "rgba(255,255,255,0.65)",
                letterSpacing: 2,
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              {[match.data, match.godzina, match.miejsce]
                .filter(Boolean)
                .join(" · ")}
            </span>
          ) : null}
          {liga.hashtag ? (
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 20,
                fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: 2,
                marginTop: 6,
              }}
            >
              {normalizeHashtag(liga.hashtag)}
            </span>
          ) : null}
        </div>
      </div>

      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
