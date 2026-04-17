import { MvpGraphicSchema } from "@/types/mvp";
import { LigaLogo } from "../_shared/LigaLogo";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { HashtagLine } from "../_shared/HashtagLine";
import { MvpTitle } from "../_shared/MvpTitle";
import { PlayerCard } from "../_shared/PlayerCard";
import { MatchContextLine } from "../_shared/MatchContextLine";
import type { z } from "zod";

export const footballMvpStorySchema = MvpGraphicSchema;
export type FootballMvpStoryProps = z.infer<typeof footballMvpStorySchema>;

export function FootballMvpStory(props: FootballMvpStoryProps) {
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
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 50%, #000611 100%)`,
        fontFamily: "Inter, sans-serif",
      }}
    >
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

      {/* Large watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Anton, sans-serif",
          fontSize: 900,
          fontWeight: 900,
          color: "rgba(255,215,0,0.03)",
          lineHeight: 1,
          letterSpacing: 40,
          pointerEvents: "none",
        }}
      >
        MVP
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 80,
          paddingBottom: 60 + sponsorBarH,
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <LigaLogo liga={liga} size={110} />
          <HeaderStrip
            segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
          <div style={{ marginTop: 16 }}>
            <MvpTitle size="large" />
          </div>
        </div>

        <PlayerCard team={team} player={player} size="story" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
            width: "100%",
            padding: "0 60px",
          }}
        >
          <div
            style={{
              width: 600,
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <MatchContextLine context={match} kolejka={kolejka} size="story" />
        </div>
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} size="default" />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
