import { z } from "zod";

export const CreateRoastRequestSchema = z
  .object({
    url: z.string().trim().min(1).optional(),
    signals: z
      .object({
        url: z.string().trim().min(1),
        title: z.string().optional(),
        metaDescription: z.string().optional(),
        h1: z.array(z.string()).optional(),
        h2: z.array(z.string()).optional(),
        ctaTexts: z.array(z.string()).optional(),
        heroText: z.string().optional(),
        bodyTextSample: z.string().optional(),
        visibleTextSample: z.string().optional(),
        trustIndicators: z.array(z.string()).optional(),
        socialProofText: z.array(z.string()).optional(),
        linkCount: z.number().int().min(0).optional(),
        buttonCount: z.number().int().min(0).optional(),
        formCount: z.number().int().min(0).optional(),
        imageCount: z.number().int().min(0).optional(),
        hasPricing: z.boolean().optional(),
        hasContact: z.boolean().optional(),
        hasTestimonials: z.boolean().optional(),
        hasCaseStudies: z.boolean().optional(),
        hasClientLogos: z.boolean().optional(),
        hasSecurityBadges: z.boolean().optional(),
        hasAddress: z.boolean().optional(),
        hasTeam: z.boolean().optional(),
        hasMobileViewport: z.boolean().optional(),
        capturedAt: z.string().optional(),
        source: z.enum(["WEB_URL", "EXTENSION", "MANUAL_SIGNALS"]).optional(),
      })
      .passthrough()
      .optional(),
    source: z.enum(["WEB_URL", "EXTENSION", "MANUAL_SIGNALS"]).optional(),
    visibility: z.enum(["PRIVATE", "UNLISTED", "PUBLIC"]).optional(),
    mode: z.enum(["DETERMINISTIC", "AI_ASSISTED"]).optional(),
  })
  .strict();

export type CreateRoastRequest = z.infer<typeof CreateRoastRequestSchema>;
