/**
 * MvpChip — chip z nazwiskiem MVP meczu.
 *
 * Renderuje się tylko gdy mvp nie jest pusty. Wolny tekst (bez walidacji),
 * trener wpisuje w formularzu.
 */
type Props = {
  mvp?: string;
  size?: "default" | "small";
};

export function MvpChip({ mvp, size = "default" }: Props) {
  const text = (mvp ?? "").trim();
  if (!text) return null;

  const fontSize = size === "small" ? 16 : 20;
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
        maxWidth: "90%",
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
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: 400,
        }}
      >
        {text}
      </span>
    </div>
  );
}
