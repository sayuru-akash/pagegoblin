"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link2, Download, Copy, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import type { ReportPayload } from "@/lib/reports/types";

type CopyState = "idle" | "copied" | "failed";

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy failed");
}

function useCopyFeedback(duration = 2000) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const trigger = useCallback(
    async (text: string) => {
      try {
        await copyText(text);
        setState("copied");
      } catch {
        setState("failed");
      }
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setState("idle"), duration);
    },
    [duration]
  );

  return { state, trigger };
}

export function ShareSection({
  report,
  links,
}: {
  report: ReportPayload["report"];
  links: ReportPayload["links"];
}) {
  const linkCopy = useCopyFeedback();
  const summaryCopy = useCopyFeedback();
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const fullUrl = `${typeof window !== "undefined" ? window.location.origin : ""}${links.report}`;

  const handleCopyLink = () => linkCopy.trigger(fullUrl);

  const handleCopySummary = () => summaryCopy.trigger(report.summaryMarkdown);

  const handleDownload = () => {
    setDownloading(true);
    const blob = new Blob([report.summaryMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
    setTimeout(() => setDownloading(false), 1000);
  };

  return (
    <Reveal>
      <Card>
        <CardContent>
          <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-goblin">
            Drag this roast out of the cave
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
            >
              <AnimatePresence mode="wait" initial={false}>
                {linkCopy.state === "copied" ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Snatched!
                  </motion.span>
                ) : linkCopy.state === "failed" ? (
                  <motion.span key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Copy failed</motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Link2 className="h-3.5 w-3.5" />
                    Copy the link
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleDownload}
              disabled={downloading}
            >
              {downloading ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-1.5"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </motion.span>
                  Tying up the file...
                </motion.span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  Keep the report file
                </span>
              )}
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopySummary}
            >
              <AnimatePresence mode="wait" initial={false}>
                {summaryCopy.state === "copied" ? (
                  <motion.span
                    key="check"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Snatched!
                  </motion.span>
                ) : summaryCopy.state === "failed" ? (
                  <motion.span key="failed" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Copy failed</motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy the short roast
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>

          <button
            onClick={() => setShowPreview(!showPreview)}
            className="mt-4 flex cursor-pointer items-center gap-1.5 text-xs text-muted transition-colors hover:text-ink"
          >
            <motion.span
              animate={{ rotate: showPreview ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
            {showPreview ? "Hide" : "Peek at"} the report file
          </button>

          <AnimatePresence>
            {showPreview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-cave/5 p-4 font-mono text-xs text-muted">
                  {report.summaryMarkdown}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </Reveal>
  );
}
