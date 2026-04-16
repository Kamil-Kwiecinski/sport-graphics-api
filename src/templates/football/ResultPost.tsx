import { FootballMatchSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { ScorersList } from "../_shared/ScorersList";
import type { z } from "zod";

export const footballResultPostSchema = FootballMatchSchema;
export type FootballResultPostProps = z.infer<typeof footballResultPostSchema>;

export function FootballResultPost(props: FootballResultPostProps) {
  const { team_home, team_away, score, kolejka, grupa, liga, sponsorzy } = props;
  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const grupaKolejka = [grupa, kolejka].filter(Boolean).join(" · ");
  const hasScorers =
    score.scorers_home.length > 0 || score.scorers_away.length > 0;

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
      {/* Top rainbow line */}
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
      {/* Bottom rainbow line above sponsor bar */}
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

        {grupaKolejka ? (
          <div
            style={{
              background: "rgba(0, 74, 173, 0.5)",
              padding: "6px 28px",
              borderRadius: 20,
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.8)",
                fontFamily: "Oswald, sans-serif",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {grupaKolejka}
            </span>
          </div>
        ) : null}

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
            {score.goals_home} : {score.goals_away}
          </span>
          <TeamCircle team={team_away} size={140} fontSize={24} light />
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.75)",
            fontFamily: "Oswald, sans-serif",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: 2,
            marginTop: 4,
          }}
        >
          Do przerwy {score.half_home}:{score.half_away}
        </div>

        {hasScorers ? (
          <div
            style={{
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
              marginTop: 10,
            }}
          >
            <ScorersList
              scorers={score.scorers_home}
              align="right"
              fontSize={16}
            />
            <ScorersList
              scorers={score.scorers_away}
              align="left"
              fontSize={16}
            />
          </div>
        ) : null}
      </div>

      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
