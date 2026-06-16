"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ReportMeta } from "@/components/report/report-meta";
import { ScoreHero } from "@/components/report/score-hero";
import { CategoryScoresGrid } from "@/components/report/category-scores-grid";
import { WarningsPanel } from "@/components/report/warnings-panel";
import { ComplaintsList } from "@/components/report/complaints-list";
import { FixesList } from "@/components/report/fixes-list";
import { VerdictCard } from "@/components/report/verdict-card";
import { ShareSection } from "@/components/report/share-section";
import type { ReportPayload } from "@/lib/reports/types";

export function ReportView({ payload }: { payload: ReportPayload }) {
  const { report, links } = payload;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      <div className="flex flex-col gap-16">
        <header>
          <Reveal>
            <div className="mb-6">
              {report.title && (
                <h1 className="mb-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {report.title}
                </h1>
              )}
              <ReportMeta report={report} />
            </div>
          </Reveal>
          <ScoreHero report={report} />
        </header>

        <section aria-labelledby="category-scores">
          <Reveal>
            <SectionHeading
              eyebrow="Score Breakdown"
              title="Where the goblin found problems"
              description="Each category is a penalty score — higher means worse."
              align="left"
              className="mb-8"
            />
          </Reveal>
          <CategoryScoresGrid scores={report.categoryScores} />
        </section>

        {report.warnings.length > 0 && (
          <section aria-labelledby="warnings">
            <Reveal>
              <SectionHeading
                eyebrow="Heads Up"
                title="Warnings"
                align="left"
                className="mb-6"
              />
            </Reveal>
            <WarningsPanel warnings={report.warnings} />
          </section>
        )}

        <section aria-labelledby="complaints">
          <Reveal>
            <SectionHeading
              eyebrow="The Problem"
              title="The Goblin's Complaints"
              description="Every issue the goblin found, ranked by severity."
              align="left"
              className="mb-8"
            />
          </Reveal>
          <ComplaintsList complaints={report.goblinComplaints} />
        </section>

        <section aria-labelledby="fixes">
          <Reveal>
            <SectionHeading
              eyebrow="The Fix"
              title="Actually Useful Fixes"
              description="Prioritized fixes the goblin recommends."
              align="left"
              className="mb-8"
            />
          </Reveal>
          <FixesList fixes={report.actuallyUsefulFixes} />
        </section>

        <section aria-labelledby="verdict">
          <VerdictCard verdict={report.verdict} />
        </section>

        <section aria-labelledby="share">
          <ShareSection report={report} links={links} />
        </section>

        <Reveal>
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-bone/30 px-6 py-10 text-center">
            <p className="font-display text-xl font-bold text-ink">
              Want the goblin to judge your page?
            </p>
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-goblin px-6 text-sm font-semibold text-ink shadow-goblin transition-colors hover:bg-goblin-dark"
            >
              Roast another page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
