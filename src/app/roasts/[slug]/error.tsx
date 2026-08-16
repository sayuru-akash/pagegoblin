"use client";

import { motion } from "motion/react";
import { GoblinMascot } from "@/components/brand/goblin-mascot";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function RoastError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
    <SiteHeader />
    <main className="flex min-h-[75vh] flex-col items-center justify-center bg-parchment px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <GoblinMascot className="h-28 w-28 opacity-80" />
        <h1 className="font-display text-5xl uppercase leading-none tracking-tight text-ink sm:text-7xl">
          I dropped the whole roast.
        </h1>
        <p className="max-w-md text-muted">
          The report slipped out of my claws and fell into the dark. Hit the
          button and I will drag it back up.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="mt-4 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-[0.3rem] bg-goblin px-6 text-sm font-bold text-[#111605] shadow-goblin transition-colors hover:bg-goblin-dark"
        >
          Drag it back
        </motion.button>
      </motion.div>
    </main>
    <SiteFooter />
    </>
  );
}
