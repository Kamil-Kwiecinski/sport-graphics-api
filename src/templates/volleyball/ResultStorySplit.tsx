import { VolleyballMatchPhotoSchema } from "@/types/match";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const volleyballResultStorySplitSchema = VolleyballMatchPhotoSchema;
export type VolleyballResultStorySplitProps = z.infer<
  typeof volleyballResultStorySplitSchema
>;

/**
 * Split Panel (1080×1920, story)
 * Góra (55%): zdjęcie z crop/zoom.
 * Dół (45%): ciemny panel z drużynami, wynikiem, setami.
 */
export function VolleyballResultStorySplit(
  props: VolleyballResultStorySplitProps,
) {
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
    photo_base64,
    photo_position,
    photo_zoom,
  } = props;

  const splitPx = Math.round(1920 * 0.55);
  const sponsorBarH = sponsorzy.length > 0 ? 100 : 0;
  const cHome = team_home.primary_color;
  const cAway = team_away.primary_color;
  const cLiga = liga.primary_color;
  const numSets = score.set_scores.length;

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
      {/* Background blurred photo for whole area */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: splitPx + 100,
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.3)",
          transform: "scale(1.15)",
        }}
      />
      {/* Sharp photo with zoom/position */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: splitPx,
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: photo_zoom,
          backgroundPosition: photo_position,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Fade transition */}
      <div
        style={{
          position: "absolute",
          top: splitPx - 200,
          left: 0,
          width: "100%",
          height: 200,
          background: "linear-gradient(180deg, transparent, #0a0a0a)",
        }}
      />
      {/* Gradient line */}
      <div
        style={{
          position: "absolute",
          top: splitPx,
          left: 0,
          width: "100%",
          height: 4,
          background: `linear-gradient(90deg, ${cHome}, ${cLiga}, ${cAway})`,
          opacity: 0.5,
          zIndex: 3,
        }}
      />

      {/* Top: liga + kolejka badge */}
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(0,0,0,0.6)",
          padding: "12px 24px 12px 12px",
          borderRadius: 16,
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
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
              style={{ width: 40, height: 40, objectFit: "contain" }}
            />
          ) : (
            <span
              style={{
                color: "#fff",
                fontSize: 10,
                fontWeight: 700,
                fontFamily: "Oswald, sans-serif",
              }}
            >
              LIGA
            </span>
          )}
        </div>
        <HeaderStrip
          segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
        />
      </div>

      {/* Bottom panel: teams + score + sets */}
      <div
        style={{
          position: "absolute",
          bottom: sponsorBarH,
          left: 0,
          width: "100%",
          height: 1920 - splitPx - sponsorBarH,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <TeamCol team={team_home} light />
          <span
            style={{
              fontFamily: "Oswald, sans-serif",
              fontSize: 150,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
              letterSpacing: 6,
            }}
          >
            {score.sets_home} : {score.sets_away}
          </span>
          <TeamCol team={team_away} light />
        </div>

        {numSets > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {score.set_scores.map((sc, i) => {
              const homeWon = sc.home > sc.away;
              return (
                <span
                  key={i}
                  style={{ display: "inline-flex", alignItems: "center" }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        color: "rgba(255,255,255,0.25)",
                        fontSize: 28,
                        margin: "0 6px",
                      }}
                    >
                      |
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 44,
                      fontWeight: homeWon ? 700 : 400,
                      color: homeWon ? cHome : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {sc.home}
                  </span>
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 28,
                      color: "rgba(255,255,255,0.3)",
                      margin: "0 2px",
                    }}
                  >
                    :
                  </span>
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 44,
                      fontWeight: homeWon ? 400 : 700,
                      color: homeWon ? "rgba(255,255,255,0.5)" : cAway,
                    }}
                  >
                    {sc.away}
                  </span>
                </span>
              );
            })}
          </div>
        )}

        <MvpChip mvp={mvp} />
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function TeamCol({
  team,
  light,
}: {
  team: { name: string; logo_url?: string; primary_color: string };
  light?: boolean;
}) {
  const c = team.primary_color;
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: 130,
          height: 130,
          borderRadius: "50%",
          border: `4px solid ${c}`,
          background: light ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {team.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.logo_url}
            alt=""
            style={{ width: 100, height: 100, objectFit: "contain" }}
          />
        ) : (
          <span
            style={{
              color: c,
              fontSize: 52,
              fontWeight: 800,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            {team.name.charAt(0)}
          </span>
        )}
      </div>
      <div
        style={{
          color: "#fff",
          fontFamily: "Oswald, sans-serif",
          fontSize: 30,
          fontWeight: 700,
          marginTop: 14,
          textTransform: "uppercase",
        }}
      >
        {team.name}
      </div>
    </div>
  );
}
