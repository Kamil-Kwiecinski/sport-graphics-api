/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Templates referencują zewnętrzne obrazki (loga, zdjęcia), ale render idzie przez screenshot-service
    // więc Next Image Optimization nie jest używany. Zostawione na wszelki wypadek.
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
