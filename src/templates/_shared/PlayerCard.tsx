import type { Team } from "@/types/team";
import type { MvpPlayer } from "@/types/mvp";

/**
 * PlayerCard — wizualny blok prezentujący zawodnika MVP.
 * Logo drużyny w kole z numerem na koszulce, niżej imię/drużyna/pozycja.
 *
 * Używany przez MVP templates (bez zdjęcia). Dla wariantu ze zdjęciem
 * layout jest inny (photo background), ale nazwa/pozycja renderowane
 * podobnym patternem via tej samej logiki.
 */

function computeNameFontSize(textLength: number, base: number): number {
  if (textLength <= 14) return base;
  if (textLength <= 20) return Math.round(base * 0.86);
  if (textLength <= 26) return Math.round(base * 0.74);
  if (textLength <= 34) return Math.round(base * 0.64);
  return Math.round(base * 0.56);
}

type Props = {
  team: Team;
  player: MvpPlayer;
  size?: "default" | "story";
};

export function PlayerCard({ team, player, size = "default" }: Props) {
  const circleSize = size === "story" ? 220 : 160;
  const baseNameSize = size === "story" ? 72 : 56;
  const nameFontSize = computeNameFontSize(player.name.length, baseNameSize);
  const teamFontSize = size === "story" ? 32 : 24;
  const positionFontSize = size === "story" ? 22 : 18;
  const numberFontSize = Math.round(circleSize * 0.25);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Circle z logo drużyny + numerem */}
      <div
        style={{
          position: "relative",
          width: circleSize,
          height: circleSize,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
          border: `5px solid ${team.primary_color}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {team.logo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={team.logo_url}
            alt={team.name}
            style={{
              width: circleSize * 0.7,
              height: circleSize * 0.7,
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              color: team.primary_color,
              fontSize: Math.round(circleSize * 0.4),
              fontWeight: 800,
              fontFamily: "Oswald, sans-serif",
            }}
          >
            {team.name.charAt(0)}
          </span>
        )}
        {/* Badge z numerem (prawy dół) */}
        {player.number ? (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
              width: circleSize * 0.42,
              height: circleSize * 0.42,
              borderRadius: "50%",
              background: team.primary_color,
              color: "#0d1117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Oswald, sans-serif",
              fontWeight: 800,
              fontSize: numberFontSize,
              border: "4px solid #0d1117",
            }}
          >
            {player.number}
          </div>
        ) : null}
      </div>

      {/* Imię i nazwisko */}
      <div
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: nameFontSize,
          fontWeight: 800,
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: 2,
          lineHeight: 1,
          textAlign: "center",
          maxWidth: circleSize * 4,
        }}
      >
        {player.name}
      </div>

      {/* Drużyna */}
      <div
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: teamFontSize,
          fontWeight: 600,
          color: team.primary_color,
          textTransform: "uppercase",
          letterSpacing: 3,
        }}
      >
        {team.name}
      </div>

      {/* Pozycja (chip) */}
      {player.position ? (
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: `${Math.round(positionFontSize * 0.35)}px ${Math.round(positionFontSize * 0.9)}px`,
            borderRadius: 999,
            fontFamily: "Oswald, sans-serif",
            fontSize: positionFontSize,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {player.position}
        </div>
      ) : null}
    </div>
  );
}
