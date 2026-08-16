import type { Metadata } from "next";

export const SITE_NAME = "PageGoblin";
export const SITE_URL = (process.env.APP_URL || "https://pagegoblin.org").replace(/\/$/, "");
export const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/pagegoblin-%E2%80%94-website-roas/dbhodopbhioihlpebnnjbjdhkbeomndp";

export const DEFAULT_SOCIAL_IMAGE = {
  url: "/images/social/pagegoblin-og.png",
  width: 1731,
  height: 909,
  alt: "PageGoblin ready to tear into a website",
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraphTitle?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  openGraphTitle = title,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
      title: openGraphTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description,
      images: [DEFAULT_SOCIAL_IMAGE.url],
    },
  };
}
