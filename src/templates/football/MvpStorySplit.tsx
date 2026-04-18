import { MvpGraphicPhotoSchema } from "@/types/mvp";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { MvpTitle } from "../_shared/MvpTitle";
import { MatchContextLine } from "../_shared/MatchContextLine";
import type { z } from "zod";

export const footballMvpStorySplitSchema = MvpGraphicPhotoSchema;
export type FootballMvpStorySplitProps = z.infer<
  typeof footballMvpStorySplitSchema
>;

/**
 * MVP Split Panel (1080×1920, story)
 * Górna połowa: zdjęcie zawodnika.
 * Dolna połowa: ciemny panel z info.
 */
export function FootballMvpStorySplit(props: FootballMvpStorySplitProps) {
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

  const splitAt = 0.55; // 55% zdjęcie, 45% panel
  const photoH = Math.round(1920 * splitAt);
  const panelTop = photoH;
  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;
  const cTeam = team.primary_color;
  const cLiga = liga.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        background: "#0a0a0a",
      }}
    >
      {/* Photo — górna połowa */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: photoH + 80,
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.4) saturate(1.2)",
          transform: "scale(1.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: photoH,
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: photo_zoom,
          backgroundPosition: photo_position,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Gradient na dole zdjęcia */}
      <div
        style={{
          position: "absolute",
          top: photoH - 200,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(180deg, transparent, #0a0a0a)",
        }}
      />

      {/* Accent lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 6,
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
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: photoH - 3,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
          opacity: 0.6,
          zIndex: 6,
        }}
      />

      {/* Top overlay: LigaLogo + header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          zIndex: 7,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            padding: 14,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
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
                style={{ width: 64, height: 64, objectFit: "contain" }}
              />
            ) : (
              <span
                style={{
                  color: cLiga,
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                LIGA
              </span>
            )}
          </div>
        </div>
        <HeaderStrip
          segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
        />
      </div>

      {/* Dolny panel */}
      <div
        style={{
          position: "absolute",
          top: panelTop,
          left: 0,
          right: 0,
          bottom: sponsorBarH,
          background: "linear-gradient(180deg, #0a0a0a, #000611)",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 60px",
          gap: 20,
        }}
      >
        <MvpTitle size="large" />

        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: computeNameSize(player.name.length, 88),
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 3,
            lineHeight: 1,
            textAlign: "center",
          }}
        >
          {player.name}
        </div>

        {(player.number || player.position) && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            {player.number && (
              <span
                style={{
                  background: cTeam,
                  color: "#0d1117",
                  fontSize: 28,
                  fontWeight: 800,
                  padding: "6px 18px",
                  borderRadius: 12,
                }}
              >
                #{player.number}
              </span>
            )}
            {player.position && (
              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: 2,
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
            background: cTeam,
            color: "#0d1117",
            fontFamily: "Oswald, sans-serif",
            fontSize: 30,
            fontWeight: 700,
            padding: "8px 28px",
            borderRadius: 14,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {team.name}
        </div>

        <div
          style={{
            width: 500,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            marginTop: 6,
          }}
        />

        <MatchContextLine context={match} kolejka={kolejka} size="story" />
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
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
