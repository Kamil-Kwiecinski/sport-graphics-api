type Props = {
  photoBase64: string;
  position?: string; // np. "50% 50%"
  zoom?: string; // np. "150%"
  isStory?: boolean;
};

/**
 * Tło = zdjęcie w dwóch warstwach:
 *  - blurred, scaled, darkened (tło wypełniające)
 *  - ostra warstwa z crop (position + zoom z edytora)
 *  - gradient overlay na dole (żeby tekst był czytelny)
 */
export function PhotoBackground({
  photoBase64,
  position = "50% 50%",
  zoom = "150%",
  isStory = false,
}: Props) {
  const grad = isStory
    ? "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.97) 100%)"
    : "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.92) 80%, rgba(0,0,0,0.97) 100%)";

  return (
    <>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${photoBase64}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(24px) brightness(0.45) saturate(1.3)",
          transform: "scale(1.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${photoBase64}')`,
          backgroundSize: zoom,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: grad }} />
    </>
  );
}
