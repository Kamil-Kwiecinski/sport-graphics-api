/**
 * HashtagLine — pojedynczy tekst hashtaga ligi, w stopce nad/pod SponsorBar.
 *
 * Renderuje się tylko gdy hashtag nie jest pusty. Normalizuje format —
 * jeśli trener wpisze "LubańskaLiga" bez #, sami dodajemy #.
 *
 * Używane w stopce templatek — nad SponsorBar albo w dolnym marginesie jeśli
 * sponsorzy nieobecni.
 */
type Props = {
  hashtag?: string;
  size?: "default" | "small";
  offsetBottom?: number;
};

export function HashtagLine({ hashtag, size = "default", offsetBottom = 0 }: Props) {
  const raw = (hashtag ?? "").trim();
  if (!raw) return null;

  const normalized = raw.startsWith("#") ? raw : `#${raw}`;
  const fontSize = size === "small" ? 14 : 16;

  return (
    <div
      style={{
        position: "absolute",
        bottom: offsetBottom + 8,
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 5,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.55)",
          fontFamily: "Oswald, sans-serif",
          fontSize,
          fontWeight: 500,
          letterSpacing: 1.5,
        }}
      >
        {normalized}
      </span>
    </div>
  );
}
