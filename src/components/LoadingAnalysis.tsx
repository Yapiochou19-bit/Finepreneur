import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2, Sparkles, Lightbulb } from 'lucide-react';
import { Language } from '../types';
import { FinepreneurLogo } from './FinepreneurLogo';

interface LoadingAnalysisProps {
  language: Language;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ language }) => {
  const steps = language === 'fr' ? [
    'Compréhension de votre activité et de vos flux de revenus...',
    'Identification des points de blocage bancaires réels...',
    'Conception de votre plan d’action personnalisé pour devenir finançable...',
    'Sélection des financeurs adaptés et préparation du dossier sans doublon...'
  ] : [
    'Understanding your core operations and cash-flow model...',
    'Detecting actual banking bottlenecks and collateral hurdles...',
    'Crafting your custom improvement roadmap to become fundable...',
    'Matching transparent funders and generating your structured memo...'
  ];

  const tips = language === 'fr' ? [
    'Un financeur préfère un entrepreneur avec un plan d’action clair pour surmonter ses faiblesses plutôt qu’un dossier prétendant être sans risque.',
    'Les précommandes et lettres d’intention écrites ont plus de valeur pour un comité de crédit que des bilans anciens.',
    'Les mécanismes de contre-garantie publique (DER, Guichet PME, Bpifrance) compensent jusqu’à 80% du risque pour le prêteur.'
  ] : [
    'Lenders prefer an agile founder with a transparent action plan over an overpromised riskless deck.',
    'Signed client intent letters carry higher underwriting weight than past outdated accounting reports.',
    'Public guarantee schemes absorb up to 80% of lender downside risk.'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(stepInterval);
  }, [steps.length]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 3200);

    return () => clearInterval(tipInterval);
  }, [tips.length]);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-8 shadow-sm text-center space-y-8">
        {/* Animated Central Logo Mark */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#5B9BD5]/20 animate-ping"></div>
          <div className="absolute inset-2 rounded-full border-4 border-t-[#1F4E79] border-r-[#E89B3C] border-b-[#5B8C5A] border-l-[#5B9BD5] animate-spin"></div>
          <div className="relative z-10">
            <FinepreneurLogo iconOnly size="lg" />
          </div>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#1F4E79]">
            {language === 'fr' ? 'Finepreneur structure votre parcours' : 'Finepreneur is building your readiness plan'}
          </h3>
          <p className="text-sm text-[#263238]/75 max-w-lg mx-auto">
            {language === 'fr'
              ? 'Le coach analyse votre situation pour dégager votre plan d’action prioritaire et les opportunités adaptées.'
              : 'Our AI coach is diagnosing your hurdles to produce your high-priority improvement roadmap.'}
          </p>
        </div>

        {/* Step-by-step progress cards */}
        <div className="space-y-3 text-left max-w-md mx-auto">
          {steps.map((stepText, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-[#5B9BD5] bg-[#5B9BD5]/10 shadow-xs'
                    : isCompleted
                    ? 'border-[#5B8C5A]/30 bg-[#5B8C5A]/5'
                    : 'border-[#1F4E79]/10 bg-white/50 opacity-40'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-[#5B8C5A] shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#1F4E79] shrink-0 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#1F4E79]/20 shrink-0" />
                )}
                <span
                  className={`text-xs font-semibold ${
                    isCurrent
                      ? 'text-[#1F4E79]'
                      : isCompleted
                      ? 'text-[#5B8C5A]'
                      : 'text-[#263238]/50'
                  }`}
                >
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Rotating Coach Tip */}
        <div className="pt-4 border-t border-[#1F4E79]/10">
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 text-left flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#5B8C5A]/15 text-[#5B8C5A] flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-[#5B8C5A]" />
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#1F4E79]">
                {language === 'fr' ? 'Conseil du Coach :' : 'Coach Insight:'}
              </div>
              <p className="text-xs text-[#263238]/85 mt-0.5 leading-relaxed transition-opacity duration-300">
                {tips[currentTipIndex]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
