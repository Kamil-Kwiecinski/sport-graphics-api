import { FootballMatchPhotoSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { ScorersList } from "../_shared/ScorersList";
import { PhotoBackground } from "../_shared/PhotoBackground";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const footballResultPostPhotoSchema = FootballMatchPhotoSchema;
export type FootballResultPostPhotoProps = z.infer<
  typeof footballResultPostPhotoSchema
>;

export function FootballResultPostPhoto(props: FootballResultPostPhotoProps) {
  const {
    team_home,
    team_away,
    score,
    kolejka,
    grupa,
    kategoria_wiekowa,
    faza_rozgrywek,
    mvp,
    liga,
    sponsorzy,
    photo_base64,
    photo_position,
    photo_zoom,
  } = props;

  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const hasScorers =
    score.scorers_home.length > 0 || score.scorers_away.length > 0;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <PhotoBackground
        photoBase64={photo_base64}
        position={photo_position}
        zoom={photo_zoom}
        isStory={false}
      />

      {/* Content near bottom (photo widoczne u góry) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 40 + sponsorBarH,
        }}
      >
        {/* LigaLogo floating top */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            padding: 12,
          }}
        >
          <LigaLogo liga={liga} size={70} />
        </div>

        <div
          style={{
            position: "absolute",
            top: 130,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <HeaderStrip
            segments={[grupa, kolejka, kategoria_wiekowa, faza_rozgrywek]}
          />
        </div>

        {/* Teams + score in bottom */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: hasScorers ? 14 : 20,
          }}
        >
          <TeamCircle team={team_home} size={100} fontSize={20} light={false} />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 100,
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1,
                letterSpacing: 4,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              {score.goals_home} : {score.goals_away}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontFamily: "Oswald, sans-serif",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 1,
                marginTop: 4,
              }}
            >
              Do przerwy {score.half_home}:{score.half_away}
            </div>
          </div>
          <TeamCircle team={team_away} size={100} fontSize={20} light={false} />
        </div>

        {hasScorers ? (
          <div
            style={{
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 20,
            }}
          >
            <ScorersList
              scorers={score.scorers_home}
              align="right"
              fontSize={14}
            />
            <ScorersList
              scorers={score.scorers_away}
              align="left"
              fontSize={14}
            />
          </div>
        ) : null}

        <div style={{ marginTop: 14 }}>
          <MvpChip mvp={mvp} />
        </div>
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
