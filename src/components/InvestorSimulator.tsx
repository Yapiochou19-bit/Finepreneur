import React, { useState } from 'react';
import {
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';
import { InvestorQA, Language } from '../types';
import { translations } from '../locales';

interface InvestorSimulatorProps {
  qaList: InvestorQA[];
  language: Language;
}

export const InvestorSimulator: React.FC<InvestorSimulatorProps> = ({
  qaList,
  language
}) => {
  const t = translations[language];
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="space-y-6">
      {/* Simulator Header */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 sm:p-7 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5B9BD5]/15 text-[#1F4E79] text-xs font-bold border border-[#5B9BD5]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#5B9BD5]" />
            <span>{t.simulator.badge}</span>
          </div>
          <span className="text-xs font-semibold text-[#5B8C5A] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {language === 'fr' ? 'Recommandations Certifiées' : 'Certified Answers'}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-[#1F4E79]">
          {t.simulator.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#263238]/75 leading-relaxed">
          {t.simulator.subtitle}
        </p>

        {/* Advice banner */}
        <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 flex items-start gap-3 mt-2">
          <Lightbulb className="w-4 h-4 text-[#5B8C5A] shrink-0 mt-0.5" />
          <p className="text-xs text-[#263238]/85 leading-relaxed">
            {t.simulator.adviceBanner}
          </p>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {qaList.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border transition-all shadow-xs ${
                isOpen ? 'border-[#5B9BD5] ring-1 ring-[#5B9BD5]/30' : 'border-[#1F4E79]/15 hover:border-[#5B9BD5]/50'
              }`}
            >
              {/* Question summary / click to toggle */}
              <button
                type="button"
                onClick={() => toggleIndex(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#1F4E79] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    Q{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#1F4E79]">
                      {item.question}
                    </h4>
                    <p className="text-xs text-[#263238]/60 mt-1 italic">
                      <strong>{language === 'fr' ? 'Contexte comité :' : 'Committee context:'}</strong> {item.context}
                    </p>
                  </div>
                </div>

                <div className="text-[#1F4E79] shrink-0 mt-1">
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#5B9BD5]" /> : <ChevronDown className="w-5 h-5 text-[#263238]/40" />}
                </div>
              </button>

              {/* Collapsible Answer */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#1F4E79]/10 space-y-3">
                  <div className="p-4 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/25 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-[#1F4E79]">
                      <span className="flex items-center gap-1.5 text-[#5B8C5A]">
                        <CheckCircle2 className="w-4 h-4" />
                        {language === 'fr' ? 'Argumentaire Recommandé FinAccess' : 'FinAccess Recommended Defense'}
                      </span>
                      <span className="text-[11px] font-semibold text-[#1F4E79] bg-white px-2 py-0.5 rounded border border-[#5B8C5A]/20">
                        {language === 'fr' ? 'À mémoriser pour l’entretien' : 'Key meeting takeaway'}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#263238] leading-relaxed font-medium">
                      « {item.recommendedAnswer} »
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
