"use client";

import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <title>Enes Emer — Grafik Tasarımcı</title>
        <meta name="description" content="Enes Emer — Grafik & Web Tasarımcı. Markalara görsel kimlik kazandıran yaratıcı tasarımcı." />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${playfair.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
