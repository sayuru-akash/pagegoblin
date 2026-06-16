import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  display: "swap",
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
});

const baseUrl = process.env.APP_URL || "https://pagegoblin.org";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "PageGoblin — The tiny goblin that judges your website",
    template: "%s — PageGoblin",
  },
  description:
    "PageGoblin roasts trust, clarity, CTAs, copy, and conversion confidence before your buyers silently leave. The tiny goblin that judges your website.",
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
    title: "PageGoblin — The tiny goblin that judges your website",
    description: "Drop a URL. Watch the goblin drag your page behind the shed. Brutally honest conversion teardowns.",
    type: "website",
    url: baseUrl,
    siteName: "PageGoblin",
    locale: "en_US",
    images: [
      {
        url: "/og-default.svg",
        width: 1200,
        height: 630,
        alt: "PageGoblin — The tiny goblin that judges your website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PageGoblin — The tiny goblin that judges your website",
    description: "Drop a URL. Watch the goblin drag your page behind the shed.",
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
