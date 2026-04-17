/**
 * MvpChip — chip z nazwiskiem MVP meczu.
 *
 * Renderuje się tylko gdy mvp nie jest pusty. Wolny tekst (bez walidacji),
 * trener wpisuje w formularzu.
 *
 * Auto-fit: fontSize skaluje się w dół przy długich nazwiskach
 * (np. "Jan Nowak-Jeziorański"), żeby nie ucinać ellipsisem.
 */
type Props = {
  mvp?: string;
  size?: "default" | "small";
};

function computeFontSize(textLength: number, base: number): number {
  if (textLength <= 18) return base;
  if (textLength <= 26) return Math.round(base * 0.86);
  if (textLength <= 34) return Math.round(base * 0.74);
  if (textLength <= 42) return Math.round(base * 0.64);
  return Math.round(base * 0.56);
}

export function MvpChip({ mvp, size = "default" }: Props) {
  const text = (mvp ?? "").trim();
  if (!text) return null;

  const baseFontSize = size === "small" ? 16 : 20;
  const fontSize = computeFontSize(text.length, baseFontSize);
  const labelSize = size === "small" ? 11 : 13;
  const padY = size === "small" ? 8 : 10;
  const padX = size === "small" ? 18 : 24;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255, 215, 0, 0.14)",
        border: "1px solid rgba(255, 215, 0, 0.45)",
        padding: `${padY}px ${padX}px`,
        borderRadius: 999,
        maxWidth: size === "small" ? 420 : 720,
      }}
    >
      <span
        style={{
          color: "#ffd700",
          fontFamily: "Oswald, sans-serif",
          fontSize: labelSize,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        MVP
      </span>
      <span
        style={{
          color: "#fff",
          fontFamily: "Oswald, sans-serif",
          fontSize,
          fontWeight: 600,
          letterSpacing: 1,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </span>
    </div>
  );
}
