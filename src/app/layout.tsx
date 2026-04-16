import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sport Graphics API",
  description: "Render sport graphics via POST /api/render",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
