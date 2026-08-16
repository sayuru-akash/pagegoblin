import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReportBySlug } from "@/lib/reports/service";
import { ReportView } from "@/components/report/report-view";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { DEFAULT_SOCIAL_IMAGE, createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getReportBySlug(slug);
  if (!payload) return { title: "That Roast Ran Away", robots: { index: false, follow: false } };

  const { report } = payload;
  const title = `PageGoblin Bit ${report.domain}: Score ${report.score}/100`;
  const description = report.biggestCrime;
  const path = `/roasts/${report.slug}`;
  const metadata = createPageMetadata({
    title,
    description,
    path,
    noIndex: report.visibility !== "PUBLIC",
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      images: [DEFAULT_SOCIAL_IMAGE],
    },
  };
}

export default async function RoastReportPage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getReportBySlug(slug);

  if (!payload) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-grain bg-parchment">
        <ReportView payload={payload} />
      </main>
      <SiteFooter />
    </>
  );
}
