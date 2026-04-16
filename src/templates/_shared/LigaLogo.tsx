import type { LigaInfo } from "@/types/team";

type Props = {
  liga: LigaInfo;
  size: number;
};

export function LigaLogo({ liga, size }: Props) {
  const hasLogo = liga.logo_url && liga.logo_url.length > 5;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.9)",
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
          style={{ width: size * 0.8, height: size * 0.8, objectFit: "contain" }}
        />
      ) : (
        <span
          style={{
            color: liga.primary_color,
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
