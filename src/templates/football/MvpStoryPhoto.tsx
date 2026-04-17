import { MvpGraphicPhotoSchema } from "@/types/mvp";
import { LigaLogo } from "../_shared/LigaLogo";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { MvpTitle } from "../_shared/MvpTitle";
import { MatchContextLine } from "../_shared/MatchContextLine";
import { PhotoBackground } from "../_shared/PhotoBackground";
import type { z } from "zod";

export const footballMvpStoryPhotoSchema = MvpGraphicPhotoSchema;
export type FootballMvpStoryPhotoProps = z.infer<
  typeof footballMvpStoryPhotoSchema
>;

export function FootballMvpStoryPhoto(props: FootballMvpStoryPhotoProps) {
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

  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;
  const cLiga = liga.primary_color;
  const cTeam = team.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <PhotoBackground
        photoBase64={photo_base64}
        position={photo_position}
        zoom={photo_zoom}
        isStory={true}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 10,
          height: "100%",
          background: `linear-gradient(180deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: 10,
          height: "100%",
          background: `linear-gradient(180deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 3,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: `linear-gradient(90deg, ${cTeam}, ${cLiga}, #ffd700)`,
          zIndex: 3,
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
          zIndex: 3,
        }}
      />

      {/* Top */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
          zIndex: 4,
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.6)",
            borderRadius: "50%",
            padding: 14,
          }}
        >
          <LigaLogo liga={liga} size={100} />
        </div>
        <HeaderStrip
          segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
        />
      </div>

      {/* Bottom */}
      <div
        style={{
          position: "absolute",
          bottom: sponsorBarH + 80,
          left: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          zIndex: 4,
          padding: "0 60px",
        }}
      >
        <MvpTitle size="large" />

        <div
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: computeNameSize(player.name.length, 96),
            fontWeight: 800,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: 4,
            lineHeight: 1,
            textAlign: "center",
            textShadow: "0 3px 16px rgba(0,0,0,0.85)",
          }}
        >
          {player.name}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 18,
            fontFamily: "Oswald, sans-serif",
          }}
        >
          {player.number ? (
            <span
              style={{
                background: cTeam,
                color: "#0d1117",
                fontSize: 30,
                fontWeight: 800,
                padding: "6px 18px",
                borderRadius: 12,
              }}
            >
              #{player.number}
            </span>
          ) : null}
          {player.position ? (
            <span
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {player.position}
            </span>
          ) : null}
        </div>

        <div
          style={{
            background: team.primary_color,
            color: "#0d1117",
            fontFamily: "Oswald, sans-serif",
            fontSize: 32,
            fontWeight: 700,
            padding: "8px 28px",
            borderRadius: 14,
            letterSpacing: 2.5,
            textTransform: "uppercase",
          }}
        >
          {team.name}
        </div>

        <div
          style={{
            width: 500,
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            marginTop: 6,
          }}
        />

        <MatchContextLine context={match} kolejka={kolejka} size="story" />
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} size="default" />
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
