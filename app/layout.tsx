import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Barlow_Condensed } from "next/font/google";
import "./globals.css";

// Load fonts with CSS variables
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Optional: adjust as needed
});

export const metadata: Metadata = {
  title: "Luxere",
  description: "your only stop to luxury clothing",
  viewport: "width=device-width, initial-scale=1", // ✅ THIS FIXES MOBILE
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} ${barlowCondensed.variable} font-sans text-[12px] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
