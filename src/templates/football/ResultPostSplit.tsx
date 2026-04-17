import { FootballMatchPhotoSchema } from "@/types/match";
import { SponsorBar } from "../_shared/SponsorBar";
import { HeaderStrip } from "../_shared/HeaderStrip";
import { MvpChip } from "../_shared/MvpChip";
import { HashtagLine } from "../_shared/HashtagLine";
import type { z } from "zod";

export const footballResultPostSplitSchema = FootballMatchPhotoSchema;
export type FootballResultPostSplitProps = z.infer<
  typeof footballResultPostSplitSchema
>;

/**
 * Split Panel football (1080×1080, post)
 * Lewo: ciemny panel (42%) z LIGA, drużynami + bramkami + Do przerwy + strzelcy.
 * Prawo: zdjęcie.
 */
export function FootballResultPostSplit(props: FootballResultPostSplitProps) {
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

  const panelW = 454;
  const sponsorBarH = sponsorzy.length > 0 ? 80 : 0;
  const cHome = team_home.primary_color;
  const cAway = team_away.primary_color;
  const cLiga = liga.primary_color;
  const teamLogoSize = 52;
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
        background: "#0a0a0a",
      }}
    >
      {/* Photo layers (right side) */}
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

      {/* Accent lines */}
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

      {/* Watermark right */}
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
        {/* Top */}
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
                segments={[grupa, kolejka, kategoria_wiekowa, faza_rozgrywek]}
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

        {/* Center: teams + goals */}
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
          <TeamRow team={team_home} logoSize={teamLogoSize} />
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
            {score.goals_home}
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
            {score.goals_away}
          </div>
          <TeamRow team={team_away} logoSize={teamLogoSize} />
          <div
            style={{
              marginTop: 12,
              marginLeft: 64,
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Oswald, sans-serif",
              fontSize: 14,
              letterSpacing: 1,
            }}
          >
            Do przerwy {score.half_home}:{score.half_away}
          </div>
          <div style={{ marginTop: 10 }}>
            <MvpChip mvp={mvp} size="small" />
          </div>
        </div>

        {/* Bottom: scorers */}
        {hasScorers && (
          <div
            style={{
              position: "absolute",
              bottom: 28 + sponsorBarH,
              left: 40,
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
              Strzelcy
            </div>
            {[
              { scorers: score.scorers_home, color: cHome, side: "H" },
              { scorers: score.scorers_away, color: cAway, side: "A" },
            ].map(({ scorers, color, side }) =>
              scorers.map((sc, i) => {
                const hasMin = sc.minute && sc.minute > 0;
                return (
                  <div
                    key={`${side}-${i}`}
                    style={{
                      fontFamily: "Oswald, sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      color,
                      marginBottom: 2,
                    }}
                  >
                    {sc.name}
                    {hasMin ? (
                      <span style={{ opacity: 0.7, marginLeft: 6 }}>
                        {sc.minute}&prime;
                      </span>
                    ) : null}
                  </div>
                );
              }),
            )}
          </div>
        )}
      </div>

      <HashtagLine hashtag={liga.hashtag} offsetBottom={sponsorBarH} />
      <SponsorBar urls={sponsorzy} height={sponsorBarH} />
    </div>
  );
}

function TeamRow({
  team,
  logoSize,
}: {
  team: { name: string; logo_url?: string; primary_color: string };
  logoSize: number;
}) {
  const c = team.primary_color;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div
        style={{
          width: logoSize,
          height: logoSize,
          borderRadius: "50%",
          border: `2px solid ${c}`,
          background: "rgba(255,255,255,0.04)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        {team.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.logo_url}
            alt=""
            style={{
              width: logoSize * 0.85,
              height: logoSize * 0.85,
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              color: c,
              fontSize: logoSize * 0.42,
              fontWeight: 800,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            {team.name.charAt(0)}
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
        {team.name}
      </span>
    </div>
  );
}
