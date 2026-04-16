import { FootballMatchSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { ScorersList } from "../_shared/ScorersList";
import type { z } from "zod";

export const footballResultStorySchema = FootballMatchSchema;
export type FootballResultStoryProps = z.infer<typeof footballResultStorySchema>;

export function FootballResultStory(props: FootballResultStoryProps) {
  const { team_home, team_away, score, kolejka, grupa, liga, sponsorzy } = props;
  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;
  const grupaKolejka = [grupa, kolejka].filter(Boolean).join(" · ");

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
          {grupaKolejka ? (
            <div
              style={{
                background: "rgba(0,74,173,0.5)",
                padding: "8px 28px",
                borderRadius: 20,
              }}
            >
              <span
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Oswald, sans-serif",
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {grupaKolejka}
              </span>
            </div>
          ) : null}
        </div>

        <TeamCircle team={team_home} size={200} fontSize={30} light />

        <ScorersList
          scorers={score.scorers_home}
          align="center"
          fontSize={24}
        />

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: 180,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: 8,
            }}
          >
            {score.goals_home} : {score.goals_away}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontFamily: "Oswald, sans-serif",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 2,
              marginTop: 10,
            }}
          >
            Do przerwy {score.half_home}:{score.half_away}
          </div>
        </div>

        <ScorersList
          scorers={score.scorers_away}
          align="center"
          fontSize={24}
        />

        <TeamCircle team={team_away} size={200} fontSize={30} light />
      </div>

      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
