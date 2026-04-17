/**
 * MvpTitle — duży napis "MVP MECZU" z ornamentami gwiazdek.
 * Używany w MVP templates.
 */
type Props = {
  size?: "default" | "large" | "small";
};

export function MvpTitle({ size = "default" }: Props) {
  const fontSize = size === "large" ? 48 : size === "small" ? 28 : 36;
  const starSize = Math.round(fontSize * 0.7);

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 16,
        color: "#ffd700",
      }}
    >
      <span style={{ fontSize: starSize, lineHeight: 1 }}>★</span>
      <span
        style={{
          fontFamily: "Oswald, sans-serif",
          fontSize,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        MVP MECZU
      </span>
      <span style={{ fontSize: starSize, lineHeight: 1 }}>★</span>
    </div>
  );
}
