"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ReportMeta } from "@/components/report/report-meta";
import { CategoryScoresGrid } from "@/components/report/category-scores-grid";
import { WarningsPanel } from "@/components/report/warnings-panel";
import { ComplaintsList } from "@/components/report/complaints-list";
import { FixesList } from "@/components/report/fixes-list";
import { VerdictCard } from "@/components/report/verdict-card";
import { ShareSection } from "@/components/report/share-section";
import type { ReportPayload } from "@/lib/reports/types";
import styles from "./report.module.css";

function SectionHead({ id, label, title }: { id: string; label: string; title: string }) {
  return (
    <Reveal>
      <div className={styles.sectionHead}>
        <span>{label}</span>
        <h2 id={id}>{title}</h2>
      </div>
    </Reveal>
  );
}

export function ReportView({ payload }: { payload: ReportPayload }) {
  const { report, links } = payload;

  return (
    <div className={styles.shell}>
      <article className={styles.report}>
        <Reveal>
          <header className={styles.hero}>
            <div className={styles.heroMain}>
              <Link href="/dashboard" className={styles.back}><ArrowLeft size={14} /> Back to roast pile</Link>
              <h1>{report.title || "Roast report"}</h1>
              <div className={styles.meta}><ReportMeta report={report} /></div>
              {report.roastMode === "AI_ASSISTED" && (
                <span className={styles.ai} title="AI shaped the writing. Page clues still make the score."><Sparkles size={13} /> Extra wild roast</span>
              )}
            </div>
            <div className={styles.side}>
              <div className={styles.score}>
                <p className={styles.micro}>My score</p>
                <strong>{report.score}</strong><span>/100</span>
              </div>
              <div className={styles.crime}>
                <p className={styles.micro}>First thing I bit</p>
                <strong>{report.biggestCrime}</strong>
                <blockquote>{report.verdict}</blockquote>
              </div>
            </div>
          </header>
        </Reveal>

        <section aria-labelledby="category-scores">
          <SectionHead id="category-scores" label="Five trails" title="Where the page fought back" />
          <CategoryScoresGrid scores={report.categoryScores} />
        </section>

        {report.warnings.length > 0 && (
          <section aria-labelledby="warnings">
            <SectionHead id="warnings" label="Heads up" title="Read this first" />
            <WarningsPanel warnings={report.warnings} />
          </section>
        )}

        <section aria-labelledby="complaints">
          <SectionHead id="complaints" label="The mess" title="What made me howl" />
          <ComplaintsList complaints={report.goblinComplaints} />
        </section>

        <section aria-labelledby="fixes">
          <SectionHead id="fixes" label="The way out" title="Fix these first" />
          <FixesList fixes={report.actuallyUsefulFixes} />
        </section>

        <section aria-label="Final verdict"><VerdictCard verdict={report.verdict} /></section>
        <section aria-label="Share this report"><ShareSection report={report} links={links} /></section>

        <Reveal>
          <div className={styles.finalCta}>
            <strong>Another page hiding?</strong>
            <Link href="/analyze" className="inline-flex h-11 items-center gap-2 rounded-[0.25rem] bg-goblin px-5 text-sm font-bold text-[#111605] transition-colors hover:bg-goblin-dark focus-goblin">
              Feed me the page <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </article>
    </div>
  );
}
