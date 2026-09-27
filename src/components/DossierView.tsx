import React from 'react';
import {
  FileText,
  PieChart,
  CheckCircle,
  AlertTriangle,
  Compass,
  Coins,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language, StructuredDossier, WeaknessAndMitigation } from '../types';
import { translations } from '../locales';

interface DossierViewProps {
  dossier: StructuredDossier;
  summary: string;
  strengths: string[];
  weaknesses: WeaknessAndMitigation[];
  language: Language;
}

export const DossierView: React.FC<DossierViewProps> = ({
  dossier,
  summary,
  strengths,
  weaknesses,
  language
}) => {
  const t = translations[language];

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
          <FileText className="w-4 h-4 text-[#5B9BD5]" />
          <span>{t.results.summaryTitle}</span>
        </div>
        <p className="text-sm sm:text-base text-[#263238] leading-relaxed">
          {dossier.executiveSummary || summary}
        </p>

        {dossier.valueProposition && (
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 mt-3">
            <span className="text-xs font-bold text-[#1F4E79] block mb-1">
              {language === 'fr' ? 'Proposition de Valeur Clé :' : 'Core Value Proposition:'}
            </span>
            <p className="text-xs sm:text-sm text-[#263238]/85 leading-relaxed">
              {dossier.valueProposition}
            </p>
          </div>
        )}
      </div>

      {/* Financial Indicators & Fund Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Highlights */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider mb-4">
              <Layers className="w-4 h-4 text-[#5B9BD5]" />
              <span>{t.results.highlightsTitle}</span>
            </div>

            <div className="space-y-3.5">
              <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
                <div className="flex items-center gap-2 text-xs text-[#263238]/70 mb-1">
                  <Coins className="w-3.5 h-3.5 text-[#1F4E79]" />
                  <span>{t.results.targetAmount}</span>
                </div>
                <div className="text-xl font-black text-[#1F4E79]">
                  {dossier.financialHighlights.targetAmount}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
                <div className="flex items-center gap-2 text-xs text-[#263238]/70 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#1F4E79]" />
                  <span>{t.results.runway}</span>
                </div>
                <div className="text-base font-bold text-[#263238]">
                  {dossier.financialHighlights.estimatedRunway}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/25">
                <div className="flex items-center gap-2 text-xs text-[#1F4E79] font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#5B8C5A]" />
                  <span>{t.results.instrument}</span>
                </div>
                <div className="text-sm font-extrabold text-[#1F4E79]">
                  {dossier.financialHighlights.recommendedInstrument}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Allocation Bars */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
              <PieChart className="w-4 h-4 text-[#5B9BD5]" />
              <span>{t.results.allocationTitle}</span>
            </div>
            <span className="text-xs font-bold text-[#5B8C5A] bg-[#5B8C5A]/15 px-2.5 py-0.5 rounded-full">
              100% {language === 'fr' ? 'Affecté' : 'Allocated'}
            </span>
          </div>

          <div className="space-y-4 pt-1">
            {dossier.fundAllocation.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1F4E79]">{item.category}</span>
                  <span className="font-extrabold text-[#1F4E79] bg-[#F7F5EF] px-2 py-0.5 rounded-md border border-[#1F4E79]/10">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#F0ECE1] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      idx === 0
                        ? 'bg-[#1F4E79]'
                        : idx === 1
                        ? 'bg-[#5B9BD5]'
                        : 'bg-[#5B8C5A]'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-[#263238]/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strengths & Weakness Mitigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-white rounded-2xl border border-[#5B8C5A]/30 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5B8C5A] uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-[#5B8C5A]" />
            <span>{t.results.strengthsTitle}</span>
          </div>
          <ul className="space-y-2.5">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#263238]/85">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B8C5A] shrink-0 mt-2" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses & Strategic Mitigations */}
        <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-[#5B9BD5]" />
            <span>{t.results.mitigationsTitle}</span>
          </div>

          <div className="space-y-3">
            {weaknesses.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 space-y-1.5">
                <div className="text-xs font-bold text-[#263238] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E89B3C]" />
                  <span>{item.weakness}</span>
                </div>
                <p className="text-xs text-[#1F4E79] pl-3.5 border-l-2 border-[#5B8C5A] leading-relaxed">
                  <strong>{language === 'fr' ? 'Solution :' : 'Mitigation:'}</strong> {item.mitigation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
          <Compass className="w-4 h-4 text-[#5B9BD5]" />
          <span>{t.results.actionPlanTitle}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {dossier.actionPlan.map((action, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 relative">
              <span className="w-6 h-6 rounded-full bg-[#1F4E79] text-white text-xs font-bold flex items-center justify-center mb-2">
                {idx + 1}
              </span>
              <p className="text-xs text-[#263238] leading-relaxed">
                {action}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
