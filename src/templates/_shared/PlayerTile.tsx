import type { Team } from "@/types/team";
import type { LineupPlayer } from "@/types/lineup";

/**
 * PlayerTile — kwadratowa karta zawodnika do lineupu.
 *
 * Wizualne warstwy (od dołu do góry):
 *  1. Tło: headshot z foto_url (cover) albo fallback — pole w kolorze drużyny
 *     z dużym "#{numer}" w tle + inicjał nazwiska.
 *  2. Gradient od dołu (czarny ~60% → transparent) dla czytelności napisów.
 *  3. Górny prawy rog: numer w chipie (kolor drużyny).
 *  4. Górny lewy rog (tylko kapitan): chip "K" (złoty).
 *  5. Dolny pas: nazwisko (Oswald bold uppercase).
 *
 * Rozmiar ustalany z zewnątrz przez width (px). Tile zawsze kwadratowy.
 */

function computeNameFontSize(textLength: number, base: number): number {
  if (textLength <= 7) return base;
  if (textLength <= 10) return Math.round(base * 0.82);
  if (textLength <= 13) return Math.round(base * 0.68);
  if (textLength <= 17) return Math.round(base * 0.56);
  return Math.round(base * 0.46);
}

// Wyciąga nazwisko (ostatnie słowo) do eksponowania jako główny tekst.
// "Jan Kowalski" → "KOWALSKI"; "Ryszard Bołądź" → "BOŁĄDŹ".
function extractLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return (parts[parts.length - 1] || fullName).toUpperCase();
}

type Props = {
  team: Team;
  player: LineupPlayer;
  width: number;
};

export function PlayerTile({ team, player, width }: Props) {
  const size = width;
  const displayName = extractLastName(player.name);
  const nameBase = Math.round(size * 0.13);
  const nameFontSize = computeNameFontSize(displayName.length, nameBase);
  const chipSize = Math.round(size * 0.2);
  const chipFont = Math.round(chipSize * 0.5);
  const bgNumberSize = Math.round(size * 0.7);

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.06),
        overflow: "hidden",
        background: player.foto_url
          ? "#0a0a0a"
          : `linear-gradient(135deg, ${team.primary_color}, #0a0a0a)`,
        border: player.is_captain
          ? "4px solid #ffd700"
          : `2px solid ${team.primary_color}`,
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
      }}
    >
      {player.foto_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={player.foto_url}
          alt={player.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      ) : (
        // Fallback: duży półprzezroczysty numer w tle (nazwisko w dolnym pasie
        // i chip numeru w rogu dodawane niżej jako wspólna warstwa).
        player.number ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -55%)",
              fontFamily: "Anton, Oswald, sans-serif",
              fontSize: bgNumberSize,
              fontWeight: 900,
              color: "rgba(255,255,255,0.18)",
              lineHeight: 1,
              letterSpacing: -4,
            }}
          >
            {player.number}
          </div>
        ) : null
      )}

      {/* Gradient od dołu dla czytelności napisów */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "55%",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/* Chip z numerem — prawy górny */}
      {player.number ? (
        <div
          style={{
            position: "absolute",
            top: Math.round(size * 0.05),
            right: Math.round(size * 0.05),
            width: chipSize,
            height: chipSize,
            borderRadius: "50%",
            background: team.primary_color,
            color: "#0d1117",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Oswald, sans-serif",
            fontWeight: 800,
            fontSize: chipFont,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {player.number}
        </div>
      ) : null}

      {/* Kapitan — lewy górny */}
      {player.is_captain ? (
        <div
          style={{
            position: "absolute",
            top: Math.round(size * 0.05),
            left: Math.round(size * 0.05),
            width: chipSize,
            height: chipSize,
            borderRadius: "50%",
            background: "#ffd700",
            color: "#0d1117",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Oswald, sans-serif",
            fontWeight: 800,
            fontSize: chipFont,
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          K
        </div>
      ) : null}

      {/* Libero — prawy dolny chip */}
      {player.is_libero ? (
        <div
          style={{
            position: "absolute",
            top: Math.round(size * 0.05),
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.92)",
            color: "#0d1117",
            padding: `${Math.round(size * 0.015)}px ${Math.round(size * 0.05)}px`,
            borderRadius: 999,
            fontFamily: "Oswald, sans-serif",
            fontSize: Math.round(size * 0.07),
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Libero
        </div>
      ) : null}

      {/* Nazwisko */}
      <div
        style={{
          position: "absolute",
          bottom: Math.round(size * 0.06),
          left: Math.round(size * 0.03),
          right: Math.round(size * 0.03),
          fontFamily: "Oswald, sans-serif",
          fontSize: nameFontSize,
          fontWeight: 800,
          color: "#fff",
          textTransform: "uppercase",
          // Dłuższe nazwiska = mniejszy letterSpacing (mieści się)
          letterSpacing: displayName.length > 8 ? 0 : 1,
          lineHeight: 1,
          textAlign: "center",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textShadow: "0 2px 6px rgba(0,0,0,0.8)",
        }}
      >
        {displayName}
      </div>
    </div>
  );
}
