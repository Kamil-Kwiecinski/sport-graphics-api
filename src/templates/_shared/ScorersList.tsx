import type { Scorer } from "@/types/scores";

type Props = {
  scorers: Scorer[];
  align: "left" | "right" | "center";
  fontSize: number;
};

export function ScorersList({ scorers, align, fontSize }: Props) {
  if (scorers.length === 0) return null;
  return (
    <div style={{ textAlign: align, minWidth: 180 }}>
      {scorers.map((sc, i) => {
        const hasMinute = typeof sc.minute === "number" && sc.minute > 0;
        return (
          <div
            key={i}
            style={{
              color: "#fff",
              fontSize,
              fontWeight: 600,
              fontFamily: "Oswald, sans-serif",
              whiteSpace: "nowrap",
              marginBottom: Math.round(fontSize * 0.25),
              textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            }}
          >
            {sc.name}
            {hasMinute ? (
              <span style={{ opacity: 0.7, fontWeight: 400, marginLeft: 6 }}>
                {sc.minute}&prime;
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
