import { VolleyballMatchSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const volleyballResultPostSchema = VolleyballMatchSchema;
export type VolleyballResultPostProps = z.infer<typeof volleyballResultPostSchema>;

export function VolleyballResultPost(props: VolleyballResultPostProps) {
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
  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;

  const cHome = team_home.primary_color;
  const cAway = team_away.primary_color;
  const cLiga = liga.primary_color;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        background: `linear-gradient(180deg, ${cLiga} 0%, #001533 100%)`,
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
          justifyContent: "center",
          gap: 12,
          paddingBottom: sponsorBarH,
        }}
      >
        <LigaLogo liga={liga} size={90} />

        <HeaderStrip
          segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            marginTop: 10,
          }}
        >
          <TeamCircle team={team_home} size={140} fontSize={24} light />
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: 116,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            {score.sets_home} : {score.sets_away}
          </span>
          <TeamCircle team={team_away} size={140} fontSize={24} light />
        </div>

        {score.set_scores.length > 0 ? (
          <SetTable
            setScores={score.set_scores}
            cHome={cHome}
            cAway={cAway}
          />
        ) : null}

        <MvpChip mvp={mvp} />
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function SetTable({
  setScores,
  cHome,
  cAway,
}: {
  setScores: { home: number; away: number }[];
  cHome: string;
  cAway: string;
}) {
  return (
    <div style={{ width: 500, marginTop: 24 }}>
      <div style={{ display: "flex", marginBottom: 4, justifyContent: "center" }}>
        <div style={{ flex: 1.2, padding: 6, borderBottom: `3px solid ${cHome}` }} />
        <div style={{ flex: 0.8, textAlign: "center", padding: 6 }}>
          <span
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: 2,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            Set
          </span>
        </div>
        <div style={{ flex: 1.2, padding: 6, borderBottom: `3px solid ${cAway}` }} />
      </div>
      {setScores.map((sc, i) => {
        const homeWon = sc.home > sc.away;
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
              borderRadius: 8,
              margin: "4px 0",
            }}
          >
            <div style={{ flex: 1.2, textAlign: "center", padding: 12 }}>
              <span
                style={{
                  fontSize: homeWon ? 36 : 32,
                  fontFamily: "Oswald, sans-serif",
                  color: homeWon ? cHome : `${cHome}66`,
                  fontWeight: homeWon ? 800 : 400,
                }}
              >
                {sc.home}
              </span>
            </div>
            <div style={{ flex: 0.8, textAlign: "center", padding: 12 }}>
              <span
                style={{
                  fontSize: 24,
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "Oswald, sans-serif",
                }}
              >
                {i + 1}
              </span>
            </div>
            <div style={{ flex: 1.2, textAlign: "center", padding: 12 }}>
              <span
                style={{
                  fontSize: homeWon ? 32 : 36,
                  fontFamily: "Oswald, sans-serif",
                  color: homeWon ? `${cAway}66` : cAway,
                  fontWeight: homeWon ? 400 : 800,
                }}
              >
                {sc.away}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
