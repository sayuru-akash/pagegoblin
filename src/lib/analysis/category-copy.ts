import type { CategoryScores } from "./types";

export interface CategoryCopy {
  label: string;
  description: string;
}

export const CATEGORY_COPY: Record<keyof CategoryScores, CategoryCopy> = {
  trustTax: {
    label: "Where's the proof?",
    description: "I sniff for names, quotes, results, and a real way to reach you.",
  },
  ctaCorpse: {
    label: "What am I meant to click?",
    description: "I hunt for the next step. If it hides, I drag it out.",
  },
  fluffDamage: {
    label: "Do these words mean anything?",
    description: "I bite into big claims to see if there is anything inside.",
  },
  buyerConfusionLevel: {
    label: "What are you selling?",
    description: "I need to know what this is, who wants it, and why.",
  },
  conversionFriction: {
    label: "Why is this so hard?",
    description: "I crawl through the page and mark every place I get stuck.",
  },
};
