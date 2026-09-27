export type Language = 'fr' | 'en';

export type Currency = 'FCFA' | 'EUR' | 'USD';

export type ProjectStage = 'idea' | 'seed' | 'growth';

export interface ProjectFormData {
  name: string;
  sector: string;
  stage: ProjectStage;
  description: string;
  amount: number;
  currency: Currency;
  revenue?: string;
  location?: string;
  fundingPurpose?: string;
  mainHurdle?: string;
  language: Language;
}

export interface Funder {
  id: string;
  name: string;
  category: 'microfinance' | 'subvention' | 'pret_honneur' | 'business_angels' | 'crowdfunding';
  categoryLabel: string;
  matchPercentage: number;
  ticketRange: string;
  whyMatched: string;
  prerequisites: string;
  limitations: string;
  averageProcessingTime: string;
}

export interface FundAllocation {
  category: string;
  percentage: number;
  description: string;
}

export interface FinancialHighlights {
  targetAmount: string;
  estimatedRunway: string;
  recommendedInstrument: string;
}

export interface ActionTask {
  id: string;
  title: string;
  priority: 'haute' | 'moyenne' | 'tactique';
  impact: string;
  advice: string;
  completed: boolean;
}

export interface WeaknessAndMitigation {
  weakness: string;
  mitigation: string;
}

export interface DiagnosticInsight {
  strengths: string[];
  weaknesses: Array<{
    issue: string;
    action: string;
  }>;
}

export interface StructuredDossier {
  executiveSummary: string;
  valueProposition: string;
  fundAllocation: FundAllocation[];
  financialHighlights: FinancialHighlights;
  actionPlan: string[];
}

export interface InvestorQA {
  question: string;
  context: string;
  recommendedAnswer: string;
}

export interface EvaluationResult {
  readinessScore: number;
  readinessLevel: string;
  nextStepTitle: string;
  nextStepDescription: string;
  summary: string;
  keyTags: string[];
  actionTasks: ActionTask[];
  diagnostic: DiagnosticInsight;
  structuredDossier: StructuredDossier;
  recommendedFunders: Funder[];
  investorQA: InvestorQA[];
  transparencyNotice: string;
  strengths?: string[];
  weaknessesAndMitigations?: WeaknessAndMitigation[];
}
