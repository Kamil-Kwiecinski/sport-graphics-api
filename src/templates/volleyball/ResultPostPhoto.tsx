import { VolleyballMatchPhotoSchema } from "@/types/match";
import { LigaLogo } from "../_shared/LigaLogo";
import { TeamCircle } from "../_shared/TeamCircle";
import { SponsorBar } from "../_shared/SponsorBar";
import { PhotoBackground } from "../_shared/PhotoBackground";
import type { z } from "zod";

export const volleyballResultPostPhotoSchema = VolleyballMatchPhotoSchema;
export type VolleyballResultPostPhotoProps = z.infer<
  typeof volleyballResultPostPhotoSchema
>;

export function VolleyballResultPostPhoto(
  props: VolleyballResultPostPhotoProps,
) {
  const {
    team_home,
    team_away,
    score,
    kolejka,
    liga,
    sponsorzy,
    photo_base64,
    photo_position,
    photo_zoom,
  } = props;

  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const hasSetScores = score.set_scores.length > 0;

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

        {kolejka ? (
          <div
            style={{
              position: "absolute",
              top: 130,
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.7)",
              padding: "4px 20px",
              borderRadius: 12,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.9)",
                fontFamily: "Oswald, sans-serif",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {kolejka}
            </span>
          </div>
        ) : null}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            marginBottom: hasSetScores ? 10 : 20,
          }}
        >
          <TeamCircle team={team_home} size={100} fontSize={20} light={false} />
          <span
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
            {score.sets_home} : {score.sets_away}
          </span>
          <TeamCircle team={team_away} size={100} fontSize={20} light={false} />
        </div>

        {hasSetScores ? (
          <SetScoresInline
            setScores={score.set_scores}
            cHome={team_home.primary_color}
            cAway={team_away.primary_color}
          />
        ) : null}
      </div>

      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function SetScoresInline({
  setScores,
  cHome,
  cAway,
}: {
  setScores: { home: number; away: number }[];
  cHome: string;
  cAway: string;
}) {
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.55)",
        borderRadius: 12,
        padding: "8px 18px",
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: 28,
        fontFamily: "Oswald, sans-serif",
      }}
    >
      {setScores.map((sc, i) => {
        const homeWon = sc.home > sc.away;
        return (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {i > 0 && (
              <span
                style={{
                  color: "rgba(255,255,255,0.2)",
                  margin: "0 8px",
                }}
              >
                |
              </span>
            )}
            <span
              style={{
                fontWeight: homeWon ? 800 : 400,
                color: homeWon ? cHome : `${cHome}99`,
              }}
            >
              {sc.home}
            </span>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 20 }}>
              :
            </span>
            <span
              style={{
                fontWeight: homeWon ? 400 : 800,
                color: homeWon ? `${cAway}99` : cAway,
              }}
            >
              {sc.away}
            </span>
          </span>
        );
      })}
    </div>
  );
}
