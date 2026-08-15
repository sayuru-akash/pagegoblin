import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
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

const baseUrl = process.env.APP_URL || "https://pagegoblin.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    "conversion teardown",
    "landing page audit",
    "CTA checker",
    "trust signals",
    "conversion optimization",
    "landing page review",
    "website critique",
    "page analysis",
    "copy analysis",
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "PageGoblin: Throw Me a Website and Let Me Loose",
    description: "Give the goblin a URL. It will crawl inside, drag out the mess, and show you how to fix it.",
    type: "website",
    url: baseUrl,
    siteName: "PageGoblin",
    locale: "en_US",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "PageGoblin crawling through a website roast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageGoblin: Throw Me a Website and Let Me Loose",
    description: "Give the goblin a URL. It will crawl inside and drag out the mess.",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
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
  themeColor: "#4ade80",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolageGrotesque.variable} ${dmSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
