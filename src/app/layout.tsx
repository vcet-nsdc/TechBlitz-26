import type { Metadata } from "next";
import { Space_Mono, Oswald, Bangers, Permanent_Marker, Creepster } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const oswald = Oswald({
  variable: "--font-manga-title",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bangers = Bangers({
  variable: "--font-manga-action",
  subsets: ["latin"],
  weight: "400",
});

const permanentMarker = Permanent_Marker({
  variable: "--font-manga-marker",
  subsets: ["latin"],
  weight: "400",
});

const creepster = Creepster({
  variable: "--font-manga-cursed",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TECHBLITZ 2026 - CODE. DESIGN. TRANSFORM.",
  description: "A power-packed tech showdown. Will you enter the battlefield?",
  openGraph: {
    title: "TECHBLITZ 2026 - CODE. DESIGN. TRANSFORM.",
    description: "A power-packed tech showdown. Will you enter the battlefield?",
    type: "website",
    images: ["/opengraph.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "TECHBLITZ 2026",
    description: "A power-packed tech showdown. Will you enter the battlefield?",
    images: ["/opengraph.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import PageLoader from "@/components/PageLoader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${oswald.variable} ${bangers.variable} ${permanentMarker.variable} ${creepster.variable} antialiased`}
      >
        <PageLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
