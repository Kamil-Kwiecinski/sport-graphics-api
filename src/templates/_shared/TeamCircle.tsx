import type { Team } from "@/types/team";

type Props = {
  team: Team;
  size: number;
  fontSize: number;
  light?: boolean;
};

export function TeamCircle({ team, size, fontSize, light = true }: Props) {
  const borderW = size > 150 ? 5 : 4;
  const hasLogo = team.logo_url && team.logo_url.length > 5;
  const initial = (team.name || "?").charAt(0).toUpperCase();

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
          fontSize,
          fontWeight: 700,
          fontFamily: "Oswald, sans-serif",
          padding: `${Math.round(fontSize * 0.25)}px ${Math.round(fontSize * 0.8)}px`,
          borderRadius: Math.round(fontSize * 0.5),
          marginTop: Math.round(fontSize * 0.5),
          display: "inline-block",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          maxWidth: size + 80,
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {team.name}
      </span>
    </div>
  );
}
