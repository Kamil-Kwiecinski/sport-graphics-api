/**
 * HeaderStrip — pasek nad wynikiem łączący opcjonalne etykiety kropką.
 *
 * Segmenty pusty/falsy są filtrowane. Jeśli wszystkie puste — zwraca null.
 *
 * Typowe użycie:
 *   <HeaderStrip segments={[grupa, kolejka, kategoria_wiekowa, faza_rozgrywek]} />
 *
 * Renderuje pill z tekstem np. "GRUPA A · KOLEJKA 5 · U17 · 1/4 FINAŁU".
 *
 * Auto-fit: fontSize skaluje się w dół proporcjonalnie do długości tekstu,
 * żeby treść zawsze mieściła się w jednej linii bez ellipsis.
 * Progi dobrane tak, żeby typowe użycia (1-3 segmenty, ~15-30 znaków)
 * miały pełny rozmiar, a ekstremalne (4+ segmenty, 35+ znaków) dostawały
 * mniejszy font.
 */
type Props = {
  segments: Array<string | undefined | null>;
  size?: "default" | "small";
};

/**
 * Zwraca fontSize dla danej długości tekstu. Bazowy rozmiar dla krótkich
 * stringów, redukcja dla dłuższych (co 10 znaków ≈ 12-15% redukcji).
 *
 * Wartości dobrane empirycznie pod Oswald uppercase z letterSpacing: 2,
 * żeby mieścić się w ~900px (92% z 1080) na grafice post.
 */
function computeFontSize(textLength: number, base: number): number {
  if (textLength <= 22) return base;
  if (textLength <= 30) return Math.round(base * 0.86);
  if (textLength <= 38) return Math.round(base * 0.74);
  if (textLength <= 48) return Math.round(base * 0.64);
  return Math.round(base * 0.56);
}

export function HeaderStrip({ segments, size = "default" }: Props) {
  const text = segments
    .map((s) => (typeof s === "string" ? s.trim() : ""))
    .filter((s) => s.length > 0)
    .join(" · ");

  if (!text) return null;

  const baseFontSize = size === "small" ? 18 : 22;
  const fontSize = computeFontSize(text.length, baseFontSize);
  const padY = size === "small" ? 5 : 6;
  const padX = size === "small" ? 22 : 28;

  return (
    <div
      style={{
        background: "rgba(0, 74, 173, 0.5)",
        padding: `${padY}px ${padX}px`,
        borderRadius: 20,
        maxWidth: "96%",
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
          // ellipsis jako safety-net — w praktyce fontSize auto-scaling
          // wystarcza, więc rzadko się zadziała
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
