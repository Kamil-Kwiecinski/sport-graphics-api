import { VolleyballMatchSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const volleyballResultStorySchema = VolleyballMatchSchema;
export type VolleyballResultStoryProps = z.infer<typeof volleyballResultStorySchema>;

export function VolleyballResultStory(props: VolleyballResultStoryProps) {
  const {
    team_home,
    team_away,
    score,
    kolejka,
    kategoria_wiekowa,
    faza_rozgrywek,
    mvp,
    liga,
    sponsorzy,
  } = props;
  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;

  const cHome = team_home.primary_color;
  const cAway = team_away.primary_color;
  const cLiga = liga.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1920,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 40%, #001533 100%)`,
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
          background: `linear-gradient(90deg, ${cHome}, ${cLiga}, ${cAway})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: sponsorBarH,
          left: 0,
          right: 0,
          height: 6,
          background: `linear-gradient(90deg, ${cHome}, ${cLiga}, ${cAway})`,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingTop: 20,
          paddingBottom: 20 + sponsorBarH,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <LigaLogo liga={liga} size={120} />
          <HeaderStrip
            segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
        </div>

        <TeamCircle team={team_home} size={200} fontSize={30} light />

        <SetScoresRow
          setScores={score.set_scores}
          side="home"
          cHome={cHome}
          cAway={cAway}
        />

        <span
          style={{
            fontFamily: "Oswald, sans-serif",
            fontSize: 180,
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1,
            letterSpacing: 8,
          }}
        >
          {score.sets_home} : {score.sets_away}
        </span>

        <SetScoresRow
          setScores={score.set_scores}
          side="away"
          cHome={cHome}
          cAway={cAway}
        />

        <TeamCircle team={team_away} size={200} fontSize={30} light />

        <MvpChip mvp={mvp} />
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function SetScoresRow({
  setScores,
  side,
  cHome,
  cAway,
}: {
  setScores: { home: number; away: number }[];
  side: "home" | "away";
  cHome: string;
  cAway: string;
}) {
  if (setScores.length === 0) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
      {setScores.map((sc, i) => {
        const won = side === "home" ? sc.home > sc.away : sc.away > sc.home;
        const value = side === "home" ? sc.home : sc.away;
        const color = side === "home" ? cHome : cAway;
        return (
          <span
            key={i}
            style={{
              fontSize: won ? 48 : 36,
              color: won ? color : `${color}66`,
              fontWeight: won ? 800 : 400,
              fontFamily: "Oswald, sans-serif",
              minWidth: 80,
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {value}
          </span>
        );
      })}
    </div>
  );
}
