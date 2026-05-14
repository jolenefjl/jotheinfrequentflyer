import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteSettings } from "@/lib/sanity-content";
import { Analytics } from "@vercel/analytics/next";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
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

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings.siteTitle || "Jo the Infrequent Flyer";
  const description =
    settings.defaultMetaDescription ||
    settings.siteDescription ||
    "Honest, first-hand travel reviews for people who do not travel often enough to waste a trip.";

  return {
    metadataBase: new URL("https://jotheinfrequentflyer.com"),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    icons: settings.favicon ? [{ rel: "icon", url: settings.favicon }] : undefined,
    openGraph: {
      title,
      description,
      url: "https://jotheinfrequentflyer.com",
      siteName: title,
      type: "website",
      images: settings.defaultOgImage ? [{ url: settings.defaultOgImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      site: settings.twitterHandle,
      images: settings.defaultOgImage ? [settings.defaultOgImage] : undefined,
    },
  };
}

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
        <Analytics />
      </body>
    </html>
  );
}
