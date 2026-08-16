import type { Metadata } from "next";
import { Anton, Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/json-ld";
import { DEFAULT_SOCIAL_IMAGE, SITE_URL } from "@/lib/seo";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "PageGoblin: Throw Me a Website and Let Me Loose",
    template: "%s | PageGoblin",
  },
  description:
    "Throw PageGoblin a URL. The wild little beast will sniff out muddy words, hidden buttons, thin proof, and the fixes that matter first.",
  applicationName: "PageGoblin",
  authors: [{ name: "Sayuru", url: "https://github.com/sayuru-akash" }],
  creator: "Sayuru",
  publisher: "Sayuru",
  keywords: [
    "website roast",
    "website feedback tool",
    "website conversion audit",
    "landing page audit",
    "conversion teardown",
    "CTA analysis",
    "website trust signals",
    "landing page review",
    "website critique",
    "Chrome extension website audit",
    "conversion rate optimization",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "PageGoblin: Throw Me a Website and Let Me Loose",
    description: "Give the goblin a URL. It will crawl inside, drag out the mess, and show you how to fix it.",
    type: "website",
    url: "/",
    siteName: "PageGoblin",
    locale: "en_US",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageGoblin: Throw Me a Website and Let Me Loose",
    description: "Give the goblin a URL. It will crawl inside and drag out the mess.",
    images: [DEFAULT_SOCIAL_IMAGE.url],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#020402",
  colorScheme: "dark",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "PageGoblin",
      description:
        "A website roast tool that finds weak words, hidden calls to action, thin proof, and conversion friction.",
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "PageGoblin",
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
    },
    {
      "@type": "WebApplication",
      name: "PageGoblin Website Roast",
      url: `${SITE_URL}/analyze`,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "A browser-based website feedback tool for checking page clarity, calls to action, proof, copy, and conversion friction.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${bricolageGrotesque.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  );
}
