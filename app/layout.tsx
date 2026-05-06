import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "AppStudio — Transformamos tus ideas en Apps",
  description:
    "Tu aplicación terminada al 100% en 15 a 30 días. Sin bugs. Sin excusas. Sin freelancers que desaparecen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-full antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
