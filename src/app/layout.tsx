import type { Metadata } from "next";
import { DM_Sans, Unbounded } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
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
    <html lang="en" className={`${dmSans.variable} ${unbounded.variable}`}>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
