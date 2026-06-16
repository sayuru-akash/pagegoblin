"use client";

import { motion } from "motion/react";

export function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted/50">Scroll</span>
      <div className="h-8 w-5 rounded-full border-2 border-muted/30 flex items-start justify-center p-1">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-goblin/60"
        />
      </div>
    </div>
  );
}
