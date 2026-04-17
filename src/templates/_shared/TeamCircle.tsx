import type { Team } from "@/types/team";

type Props = {
  team: Team;
  size: number;
  fontSize: number;
  light?: boolean;
};

/**
 * Auto-scale fontSize dla długich nazw drużyn ("Old School Team",
 * "RKS Garbarnia Kraków"). Parametr base to docelowy rozmiar dla
 * krótkich nazw (≤14 znaków).
 */
function computeTeamFontSize(textLength: number, base: number): number {
  if (textLength <= 14) return base;
  if (textLength <= 18) return Math.round(base * 0.88);
  if (textLength <= 22) return Math.round(base * 0.78);
  if (textLength <= 28) return Math.round(base * 0.68);
  return Math.round(base * 0.6);
}

export function TeamCircle({ team, size, fontSize, light = true }: Props) {
  const borderW = size > 150 ? 5 : 4;
  const hasLogo = team.logo_url && team.logo_url.length > 5;
  const initial = (team.name || "?").charAt(0).toUpperCase();

  const effectiveFontSize = computeTeamFontSize(team.name.length, fontSize);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: size + 100,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: light ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.4)",
          border: `${borderW}px solid ${team.primary_color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {hasLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.logo_url}
            alt={team.name}
            style={{
              width: size * 0.75,
              height: size * 0.75,
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              color: team.primary_color,
              fontSize: Math.round(size * 0.35),
              fontWeight: 800,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            {initial}
          </span>
        )}
      </div>
      <span
        style={{
          background: team.primary_color,
          color: "#0d1117",
          fontSize: effectiveFontSize,
          fontWeight: 700,
          fontFamily: "Oswald, sans-serif",
          padding: `${Math.round(effectiveFontSize * 0.25)}px ${Math.round(effectiveFontSize * 0.8)}px`,
          borderRadius: Math.round(effectiveFontSize * 0.5),
          marginTop: Math.round(fontSize * 0.5),
          display: "inline-block",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        {team.name}
      </span>
    </div>
  );
}
