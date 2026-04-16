import type { LigaInfo } from "@/types/team";

type Props = {
  liga: LigaInfo;
  size: number;
};

function isLightColor(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length !== 6) return false;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  return luminance > 0.7;
}

export function LigaLogo({ liga, size }: Props) {
  const hasLogo = liga.logo_url && liga.logo_url.length > 5;
  const ligaIsLight = isLightColor(liga.primary_color);

  // Jeśli liga jest biała/jasna → ciemne tło pod logiem (contrast dla białych logo PNG).
  // Inaczej → białe tło (standard).
  const circleBg = ligaIsLight ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)";
  const borderColor = ligaIsLight
    ? "rgba(255,255,255,0.25)"
    : "rgba(0,0,0,0.08)";
  const fallbackColor = ligaIsLight ? "#fff" : liga.primary_color;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: circleBg,
        border: `2px solid ${borderColor}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {hasLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={liga.logo_url}
          alt={liga.name}
          style={{
            width: size * 0.8,
            height: size * 0.8,
            objectFit: "contain",
          }}
        />
      ) : (
        <span
          style={{
            color: fallbackColor,
            fontSize: Math.round(size * 0.16),
            fontWeight: 700,
            fontFamily: "Oswald, sans-serif",
          }}
        >
          LIGA
        </span>
      )}
    </div>
  );
}
