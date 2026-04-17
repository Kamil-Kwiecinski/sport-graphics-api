import { VolleyballMatchPhotoSchema } from "@/types/match";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const volleyballResultPostSplitSchema = VolleyballMatchPhotoSchema;
export type VolleyballResultPostSplitProps = z.infer<
  typeof volleyballResultPostSplitSchema
>;

/**
 * Split Panel (1080×1080, post)
 * Lewo: ciemny panel (42% szer.) z LIGA, drużynami, wynikami.
 * Prawo: zdjęcie (foto + zoom + position z edytora).
 */
export function VolleyballResultPostSplit(
  props: VolleyballResultPostSplitProps,
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

  const panelW = 454;
  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const cHome = team_home.primary_color;
  const cAway = team_away.primary_color;
  const cLiga = liga.primary_color;
  const numSets = score.set_scores.length;
  const setFs = numSets >= 5 ? 18 : 22;
  const teamLogoSize = numSets >= 5 ? 44 : 52;

  return (
    <div
      style={{
        position: "relative",
        width: 1080,
        height: 1080,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        background: "#0a0a0a",
      }}
    >
      {/* Background photo (blurred + sharp) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 1080 - panelW + 60,
          height: "100%",
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) brightness(0.3) saturate(1.2)",
          transform: "scale(1.15)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url('${photo_base64}')`,
          backgroundSize: photo_zoom,
          backgroundPosition: photo_position,
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Fade between photo and panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: panelW,
          width: 200,
          height: "100%",
          background: "linear-gradient(90deg, #0a0a0a, transparent)",
        }}
      />
      {/* Bottom darkener on right */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 1080 - panelW,
          height: "40%",
          background:
            "linear-gradient(180deg, transparent 0%, rgba(10,10,10,0.7) 70%, #0a0a0a 100%)",
        }}
      />

      {/* Accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: panelW,
          height: 4,
          background: `linear-gradient(90deg, ${cHome}, ${cLiga})`,
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: panelW,
          height: 4,
          background: `linear-gradient(90deg, ${cAway}, ${cLiga})`,
          zIndex: 6,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: panelW,
          width: 3,
          height: "100%",
          background: `linear-gradient(180deg, ${cHome}, ${cLiga}, ${cAway})`,
          opacity: 0.5,
          zIndex: 6,
        }}
      />

      {/* Huge watermark right */}
      <div
        style={{
          position: "absolute",
          bottom: 80 + sponsorBarH,
          right: 40,
          fontFamily: "Anton, sans-serif",
          fontSize: 120,
          color: "rgba(255,255,255,0.08)",
          lineHeight: 1.05,
          textAlign: "right",
          textTransform: "uppercase",
          letterSpacing: 2,
          zIndex: 4,
        }}
      >
        WYNIK
        <br />
        MECZU
      </div>

      {/* Left panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: panelW,
          height: "100%",
          background: "linear-gradient(180deg, #111, #0a0a0a)",
          zIndex: 5,
        }}
      >
        {/* Top: LIGA + kolejka */}
        <div style={{ position: "absolute", top: 40, left: 40, right: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
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
                  style={{ width: 36, height: 36, objectFit: "contain" }}
                />
              ) : (
                <span
                  style={{
                    color: cLiga,
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: "Oswald, sans-serif",
                  }}
                >
                  LIGA
                </span>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <HeaderStrip
                segments={[kolejka, kategoria_wiekowa, faza_rozgrywek]}
                size="small"
              />
            </div>
          </div>
          <div
            style={{
              fontFamily: "Anton, sans-serif",
              fontSize: 44,
              color: "rgba(255,255,255,0.12)",
              textTransform: "uppercase",
              letterSpacing: 3,
              lineHeight: 0.95,
              marginTop: 6,
            }}
          >
            WYNIK
            <br />
            MECZU
          </div>
        </div>

        {/* Center: teams + scores */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 40,
            right: 32,
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: teamLogoSize,
                height: teamLogoSize,
                borderRadius: "50%",
                border: `2px solid ${cHome}`,
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {team_home.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={team_home.logo_url}
                  alt=""
                  style={{
                    width: teamLogoSize * 0.85,
                    height: teamLogoSize * 0.85,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: cHome,
                    fontSize: teamLogoSize * 0.42,
                    fontWeight: 800,
                    fontFamily: "Oswald, sans-serif",
                  }}
                >
                  {team_home.name.charAt(0)}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {team_home.name}
            </span>
          </div>
          <div
            style={{
              marginLeft: 64,
              fontFamily: "Oswald, sans-serif",
              fontSize: 80,
              fontWeight: 700,
              color: cHome,
              lineHeight: 1,
            }}
          >
            {score.sets_home}
          </div>
          <div
            style={{
              width: 50,
              height: 2,
              background: "rgba(255,255,255,0.1)",
              margin: "2px 0 2px 64px",
            }}
          />
          <div
            style={{
              marginLeft: 64,
              fontFamily: "Oswald, sans-serif",
              fontSize: 80,
              fontWeight: 700,
              color: cAway,
              lineHeight: 1,
            }}
          >
            {score.sets_away}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: teamLogoSize,
                height: teamLogoSize,
                borderRadius: "50%",
                border: `2px solid ${cAway}`,
                background: "rgba(255,255,255,0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {team_away.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={team_away.logo_url}
                  alt=""
                  style={{
                    width: teamLogoSize * 0.85,
                    height: teamLogoSize * 0.85,
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: cAway,
                    fontSize: teamLogoSize * 0.42,
                    fontWeight: 800,
                    fontFamily: "Oswald, sans-serif",
                  }}
                >
                  {team_away.name.charAt(0)}
                </span>
              )}
            </div>
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 22,
                fontWeight: 700,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {team_away.name}
            </span>
          </div>
          <div style={{ marginTop: 12 }}>
            <MvpChip mvp={mvp} size="small" />
          </div>
        </div>

        {/* Bottom: set scores list */}
        {numSets > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 28 + sponsorBarH,
              left: 104,
              right: 32,
            }}
          >
            <div
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: 2,
                marginBottom: 6,
              }}
            >
              Wyniki setów
            </div>
            {score.set_scores.map((sc, i) => {
              const homeWon = sc.home > sc.away;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      width: 18,
                      fontSize: 11,
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "Oswald, sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: setFs,
                      fontWeight: homeWon ? 700 : 400,
                      color: homeWon ? cHome : "rgba(255,255,255,0.5)",
                      width: 32,
                      textAlign: "right",
                    }}
                  >
                    {sc.home}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.25)",
                      margin: "0 5px",
                    }}
                  >
                    –
                  </span>
                  <span
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: setFs,
                      fontWeight: homeWon ? 400 : 700,
                      color: homeWon ? "rgba(255,255,255,0.5)" : cAway,
                      width: 32,
                    }}
                  >
                    {sc.away}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}
