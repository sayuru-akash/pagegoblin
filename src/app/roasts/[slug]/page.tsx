import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReportBySlug } from "@/lib/reports/service";
import { ReportView } from "@/components/report/report-view";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getReportBySlug(slug);
  if (!payload) return { title: "Roast Not Found — PageGoblin" };

  const { report } = payload;
  const title = `PageGoblin roasted ${report.domain} — Score: ${report.score}/100`;
  const description = report.biggestCrime;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ["/og-default.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
      <main className="min-h-screen bg-parchment">
        <ReportView payload={payload} />
      </main>
      <SiteFooter />
    </>
  );
}
