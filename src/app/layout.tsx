import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const editorial = localFont({
  src: "../../public/fonts/editorial.ttf",
  variable: "--font-editorial",
  display: "swap",
});
const sans = localFont({
  src: "../../public/fonts/sans.ttf",
  variable: "--font-sans",
  display: "swap",
});
export const metadata: Metadata = {
  title: "ZENITH LEATHER — Crafted to Be Remembered",
  description:
    "An exploration of timeless leather and modern expression. Discover the Zenith Leather concept collection of bags and shoes.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${editorial.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
