"use client";

import { motion } from "motion/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function RoastLoading() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-parchment">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-12"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-44 w-44">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth="6"
                    opacity="0.3"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="var(--color-goblin)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="276.46"
                    strokeDashoffset="276.46"
                    animate={{
                      strokeDashoffset: [276.46, 200, 100, 276.46],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="h-12 w-12 rounded-full bg-goblin/20"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
              <motion.p
                className="font-display text-lg text-muted"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                The goblin is sharpening its criticism...
              </motion.p>
            </div>

            <div className="w-full space-y-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-24 rounded-xl bg-bone/60"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <motion.div
                    className="h-full w-full rounded-xl bg-bone"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
