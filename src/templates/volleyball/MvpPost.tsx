import { MvpGraphicSchema } from "@/types/mvp";
import { LigaLogo } from "../_shared/LigaLogo";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { MvpTitle } from "../_shared/MvpTitle";
import { PlayerCard } from "../_shared/PlayerCard";
import { MatchContextLine } from "../_shared/MatchContextLine";
import type { z } from "zod";

export const volleyballMvpPostSchema = MvpGraphicSchema;
export type VolleyballMvpPostProps = z.infer<typeof volleyballMvpPostSchema>;

export function VolleyballMvpPost(props: VolleyballMvpPostProps) {
  const {
    kolejka,
    kategoria_wiekowa,
    faza_rozgrywek,
    liga,
    sponsorzy,
    team,
    player,
    match,
  } = props;

  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const cLiga = liga.primary_color;
  const cTeam = team.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 60%, #000611 100%)`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Top + bottom accent lines */}
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

      {/* Watermark big "MVP" w tle */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Anton, sans-serif",
          fontSize: 520,
          fontWeight: 900,
          color: "rgba(255,215,0,0.04)",
          lineHeight: 1,
          letterSpacing: 20,
          pointerEvents: "none",
        }}
      >
        MVP
      </div>

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 40,
          paddingBottom: 30 + sponsorBarH,
          zIndex: 2,
        }}
      >
        {/* Top section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <LigaLogo liga={liga} size={80} />
          <HeaderStrip
            segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
          <div style={{ marginTop: 8 }}>
            <MvpTitle size="default" />
          </div>
        </div>

        {/* Middle — PlayerCard */}
        <PlayerCard team={team} player={player} size="default" />

        {/* Bottom — match context */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: "100%",
            padding: "0 40px",
          }}
        >
          <div
            style={{
              width: 400,
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <MatchContextLine context={match} kolejka={kolejka} size="default" />
        </div>
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
