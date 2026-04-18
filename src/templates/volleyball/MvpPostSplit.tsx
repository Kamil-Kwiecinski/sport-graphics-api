import { MvpGraphicPhotoSchema } from "@/types/mvp";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { MvpTitle } from "../_shared/MvpTitle";
import { MatchContextLine } from "../_shared/MatchContextLine";
import type { z } from "zod";

export const volleyballMvpPostSplitSchema = MvpGraphicPhotoSchema;
export type VolleyballMvpPostSplitProps = z.infer<
  typeof volleyballMvpPostSplitSchema
>;

/**
 * MVP Split Panel (1080×1080, post)
 * Lewo: ciemny panel (42%) z LIGA, MVP title, nazwiskiem, pozycją, drużyną.
 * Prawo: zdjęcie zawodnika (kadrowalne).
 */
export function VolleyballMvpPostSplit(props: VolleyballMvpPostSplitProps) {
  const {
    kolejka,
    kategoria_wiekowa,
    faza_rozgrywek,
    liga,
    sponsorzy,
    team,
    player,
    match,
    photo_base64,
    photo_position,
    photo_zoom,
  } = props;

  const panelW = 454;
  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const cTeam = team.primary_color;
  const cLiga = liga.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        background: "#0a0a0a",
      }}
    >
      {/* Photo — prawa strona */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 1080 - panelW + 60,
          height: "100%",
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.3) saturate(1.2)",
          transform: "scale(1.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: photo_zoom,
          backgroundPosition: photo_position,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Gradient przejście z panelu do zdjęcia */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: panelW,
          width: 200,
          height: "100%",
          background: "linear-gradient(90deg, #0a0a0a, transparent)",
        }}
      />
      {/* Gradient dolny nad sponsorami */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 1080 - panelW,
          height: "30%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.7) 70%, #0a0a0a 100%)",
        }}
      />

      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: panelW,
          height: 4,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: panelW,
          height: 4,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: panelW,
          width: 3,
          height: "100%",
          background: `linear-gradient(180deg, ${cTeam}, ${cLiga}, #ffd700)`,
          opacity: 0.6,
          zIndex: 6,
        }}
      />

      {/* Lewy panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: panelW,
          height: "100%",
          background: "linear-gradient(180deg, #111, #0a0a0a)",
          zIndex: 5,
        }}
      >
        {/* Top: LIGA + header */}
        <div style={{ position: "absolute", top: 40, left: 40, right: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {liga.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={liga.logo_url}
                  alt=""
                  style={{ width: 36, height: 36, objectFit: "contain" }}
                />
              ) : (
                <span
                  style={{
                    color: cLiga,
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "Oswald, sans-serif",
                  }}
                >
                  LIGA
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <HeaderStrip
                segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
                size="small"
              />
            </div>
          </div>
        </div>

        {/* Center: MVP title + player info */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 40,
            right: 32,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <MvpTitle size="small" />

          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: computeNameSize(player.name.length, 48),
              fontWeight: 800,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: 2,
              lineHeight: 1.05,
              marginTop: 6,
            }}
          >
            {player.name}
          </div>

          {(player.number || player.position) && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "Oswald, sans-serif",
                marginTop: 4,
              }}
            >
              {player.number && (
                <span
                  style={{
                    background: cTeam,
                    color: "#0d1117",
                    fontSize: 18,
                    fontWeight: 800,
                    padding: "3px 12px",
                    borderRadius: 8,
                  }}
                >
                  #{player.number}
                </span>
              )}
              {player.position && (
                <span
                  style={{
                    color: "rgba(255,255,255,0.8)",
                    fontSize: 15,
                    fontWeight: 500,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  {player.position}
                </span>
              )}
            </div>
          )}

          <div
            style={{
              display: "inline-block",
              background: cTeam,
              color: "#0d1117",
              fontFamily: "Oswald, sans-serif",
              fontSize: 20,
              fontWeight: 700,
              padding: "5px 18px",
              borderRadius: 10,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginTop: 10,
              width: "fit-content",
            }}
          >
            {team.name}
          </div>
        </div>

        {/* Bottom: match context */}
        <div
          style={{
            position: "absolute",
            bottom: 40 + sponsorBarH,
            left: 40,
            right: 32,
          }}
        >
          <div
            style={{
              width: "60%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
              marginBottom: 14,
            }}
          />
          <MatchContextLine context={match} kolejka={kolejka} size="small" />
        </div>
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} size="small" />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function computeNameSize(textLength: number, base: number): number {
  if (textLength <= 14) return base;
  if (textLength <= 20) return Math.round(base * 0.86);
  if (textLength <= 26) return Math.round(base * 0.74);
  if (textLength <= 34) return Math.round(base * 0.64);
  return Math.round(base * 0.56);
}
