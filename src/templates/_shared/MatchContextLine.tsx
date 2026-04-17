import type { MvpMatchContext } from "@/types/mvp";

/**
 * MatchContextLine — krótki napis "Team A 3:1 Team B · Kolejka 5" pod PlayerCard
 * pokazujący z którego meczu zawodnik jest MVP.
 */
type Props = {
  context: MvpMatchContext;
  kolejka?: string;
  size?: "default" | "story" | "small";
};

function computeFontSize(textLength: number, base: number): number {
  if (textLength <= 30) return base;
  if (textLength <= 42) return Math.round(base * 0.86);
  if (textLength <= 55) return Math.round(base * 0.74);
  return Math.round(base * 0.64);
}

export function MatchContextLine({ context, kolejka, size = "default" }: Props) {
  const parts: string[] = [];
  if (context.team_home && context.team_away && context.score) {
    parts.push(`${context.team_home}  ${context.score}  ${context.team_away}`);
  }
  if (kolejka) parts.push(kolejka);
  const text = parts.join("  ·  ");
  if (!text) return null;

  const baseFontSize = size === "story" ? 28 : size === "small" ? 16 : 22;
  const fontSize = computeFontSize(text.length, baseFontSize);

  return (
    <div
      style={{
        fontFamily: "Oswald, sans-serif",
        fontSize,
        fontWeight: 500,
        color: "rgba(255,255,255,0.65)",
        letterSpacing: 1.5,
        textTransform: "uppercase",
        textAlign: "center",
        whiteSpace: "nowrap",
        maxWidth: "92%",
      }}
    >
      {text}
    </div>
  );
}
