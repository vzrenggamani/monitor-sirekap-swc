import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const plex = IBM_Plex_Mono({
  weight: ["400", "700", "600"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "SIREKAP MONITORING",
  generator: "Rengga Prakoso Nugroho",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plex.className}>{children}</body>
    </html>
  );
}
