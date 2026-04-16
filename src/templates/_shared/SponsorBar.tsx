type Props = {
  urls: string[];
  height: number;
};

export function SponsorBar({ urls, height }: Props) {
  if (urls.length === 0 || height === 0) return null;
  const logoH = Math.round(height * 0.55);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height,
        background: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        zIndex: 10,
      }}
    >
      {urls.map((url, i) => (
        <div
          key={i}
          style={{
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt=""
            style={{
              height: logoH,
              maxWidth: 160,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.7,
            }}
          />
        </div>
      ))}
    </div>
  );
}
