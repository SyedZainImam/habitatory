import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habitatory — From Celebrations to Creations",
  description:
    "Habitatory is a premium event planning brand specializing in bespoke celebrations, corporate galas, birthday parties, and private soirées. We transform your vision into reality.",
  openGraph: {
    title: "Habitatory — From Celebrations to Creations",
    description:
      "Premium event planning specializing in bespoke celebrations, corporate galas, and private soirées.",
    url: "https://habitatory.com",
    siteName: "Habitatory",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Habitatory — From Celebrations to Creations",
    description:
      "Premium event planning specializing in bespoke celebrations, corporate galas, and private soirées.",
  },
  metadataBase: new URL("https://habitatory.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
