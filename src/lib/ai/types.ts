import type { GoblinComplaint, UsefulFix, PageSignals, AnalysisResult } from "@/lib/analysis";

export interface AiConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
  name: string;
  providerType: string;
}

export interface AiEnhancementInput {
  signals: PageSignals;
  analysis: AnalysisResult;
  config: AiConfig;
}

export interface AiEnhancementResult {
  verdict: string;
  biggestCrime: string;
  goblinComplaints: GoblinComplaint[];
  actuallyUsefulFixes: UsefulFix[];
  summaryMarkdown: string;
  aiProvider: string;
  aiModel: string;
}

export interface AiEnhancementOutcome {
  enhanced: boolean;
  result?: AiEnhancementResult;
  error?: string;
}
