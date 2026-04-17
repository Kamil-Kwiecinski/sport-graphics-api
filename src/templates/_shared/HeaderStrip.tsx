/**
 * HeaderStrip — pasek nad wynikiem łączący opcjonalne etykiety kropką.
 *
 * Segmenty pusty/falsy są filtrowane. Jeśli wszystkie puste — zwraca null.
 *
 * Typowe użycie:
 *   <HeaderStrip segments={[grupa, kolejka, kategoria_wiekowa, faza_rozgrywek]} />
 *
 * Renderuje pill z tekstem np. "GRUPA A · KOLEJKA 5 · U17 · 1/4 FINAŁU".
 */
type Props = {
  segments: Array<string | undefined | null>;
  size?: "default" | "small";
};

export function HeaderStrip({ segments, size = "default" }: Props) {
  const text = segments
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s.length > 0)
    .join(" · ");

  if (!text) return null;

  const fontSize = size === "small" ? 18 : 22;
  const padY = size === "small" ? 5 : 6;
  const padX = size === "small" ? 22 : 28;

  return (
    <div
      style={{
        background: "rgba(0, 74, 173, 0.5)",
        padding: `${padY}px ${padX}px`,
        borderRadius: 20,
        maxWidth: "92%",
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.85)",
          fontFamily: "Oswald, sans-serif",
          fontSize,
          fontWeight: 600,
          letterSpacing: 2,
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          maxWidth: "100%",
        }}
      >
        {text}
      </span>
    </div>
  );
}
