"use client";

import { ExternalLink, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ReportPayload } from "@/lib/reports/types";

const sourceLabels: Record<string, string> = {
  WEB_URL: "Web URL",
  EXTENSION: "Extension",
  MANUAL_SIGNALS: "Manual",
};

export function ReportMeta({ report }: { report: ReportPayload["report"] }) {
  const date = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <a
        href={report.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-muted transition-colors hover:text-goblin"
      >
        <Globe className="h-3.5 w-3.5" />
        {report.domain}
        <ExternalLink className="h-3 w-3" />
      </a>
      <span className="text-border">•</span>
      <Badge variant="cave">{sourceLabels[report.source] ?? report.source}</Badge>
      <span className="text-border">•</span>
      <time dateTime={report.createdAt} className="font-mono text-xs text-muted">
        {date}
      </time>
    </div>
  );
}
