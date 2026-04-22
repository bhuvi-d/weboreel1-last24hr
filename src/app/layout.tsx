import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/hooks/useAudio";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { Cursor } from "@/components/ui/Cursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Last 24 Hours of Earth",
  description: "An emotional cinematic scroll experience imagining humanity’s final day.",
  openGraph: {
    title: "Last 24 Hours of Earth",
    description: "Witness the final hours of humanity in this cinematic interactive experience.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="bg-black text-white antialiased selection:bg-primary/30">
        <AudioProvider>
          <Cursor />
          <SmoothScroll>
            <div className="noise" />
            <div className="grain-overlay" />
            {children}
          </SmoothScroll>
        </AudioProvider>
      </body>
    </html>
  );
}
