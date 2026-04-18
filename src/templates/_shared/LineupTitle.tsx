/**
 * LineupTitle — tytuł grafiki lineupu.
 *
 * Styl Aluron: duży Oswald bold ("WYJŚCIOWA SZÓSTKA") z cienkim
 * script accentem nad ("starting six") w złocie.
 * Props size steruje wielkością (default post, large story).
 */
type Props = {
  size?: "default" | "large" | "small";
  // Etykieta główna (domyślnie "WYJŚCIOWA SZÓSTKA"). Da się podmienić
  // per sport w przyszłości (np. "LINEUP" dla piłki).
  label?: string;
  accent?: string;
};

export function LineupTitle({
  size = "default",
  label = "WYJŚCIOWA SZÓSTKA",
  accent = "starting six",
}: Props) {
  const mainFontSize = size === "large" ? 76 : size === "small" ? 32 : 56;
  const accentFontSize = Math.round(mainFontSize * 0.48);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: Math.round(mainFontSize * 0.05),
      }}
    >
      {accent ? (
        <span
          style={{
            fontFamily: "'Great Vibes', 'Pinyon Script', cursive",
            fontSize: accentFontSize,
            color: "#ffd700",
            lineHeight: 1,
            letterSpacing: 1,
          }}
        >
          {accent}
        </span>
      ) : null}
      <span
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize: mainFontSize,
          fontWeight: 800,
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: Math.round(mainFontSize * 0.08),
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {label}
      </span>
    </div>
  );
}
