"use client";

import { motion } from "motion/react";
import { GoblinMascot } from "@/components/brand/goblin-mascot";

export default function RoastError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-parchment px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <GoblinMascot className="h-28 w-28 opacity-80" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-ink">
          The goblin tripped.
        </h1>
        <p className="max-w-md text-muted">
          Something went wrong while loading this roast. Even goblins stumble
          sometimes.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={reset}
          className="mt-4 inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-goblin px-6 text-sm font-semibold text-white shadow-goblin transition-colors hover:bg-goblin-dark"
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}
