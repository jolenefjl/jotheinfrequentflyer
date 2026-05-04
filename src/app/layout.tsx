import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jotheinfrequentflyer.com"),
  title: {
    default: "Jo the Infrequent Flyer",
    template: "%s | Jo the Infrequent Flyer",
  },
  description:
    "Honest, first-hand travel reviews for people who do not travel often enough to waste a trip.",
  openGraph: {
    title: "Jo the Infrequent Flyer",
    description:
      "Warm, honest travel reviews from a Malaysian-born mum in Norway who makes every trip count.",
    url: "https://jotheinfrequentflyer.com",
    siteName: "Jo the Infrequent Flyer",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
