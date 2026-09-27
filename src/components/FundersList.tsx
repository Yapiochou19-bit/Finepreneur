import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Coins,
  Send,
  Sparkles,
  Filter,
  AlertCircle,
  ShieldCheck,
  Info
} from 'lucide-react';
import { Funder, Language } from '../types';
import { translations } from '../locales';

interface FundersListProps {
  funders: Funder[];
  language: Language;
  onSelectFunder: (funder: Funder) => void;
}

export const FundersList: React.FC<FundersListProps> = ({
  funders,
  language,
  onSelectFunder
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: t.funders.filterAll },
    { id: 'microfinance', label: t.funders.filterMicro },
    { id: 'subvention', label: t.funders.filterGrants },
    { id: 'pret_honneur', label: t.funders.filterHonor },
    { id: 'business_angels', label: t.funders.filterAngels }
  ];

  const filteredFunders = selectedCategory === 'all'
    ? funders
    : funders.filter((f) => f.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header and Filter chips */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider mb-1">
            <Building2 className="w-4 h-4 text-[#5B9BD5]" />
            <span>{t.funders.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#263238]/70">
            {language === 'fr'
              ? 'Opportunités ciblées selon votre secteur, stade de maturité et montant recherché.'
              : 'Targeted funding channels matched to your industry, stage, and capital need.'}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          <Filter className="w-3.5 h-3.5 text-[#1F4E79] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#1F4E79] text-white shadow-xs'
                  : 'bg-[#F7F5EF] text-[#263238]/80 hover:bg-[#1F4E79]/10 border border-[#1F4E79]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* STRICT TRANSPARENCY NOTICE (Anti-overpromise) */}
      <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/15 space-y-1.5 text-xs text-[#263238]/85">
        <div className="flex items-center gap-2 font-bold text-[#1F4E79]">
          <Info className="w-4 h-4 text-[#E89B3C] shrink-0" />
          <span>{language === 'fr' ? 'Avertissement de transparence Finepreneur :' : 'Finepreneur Transparency Notice:'}</span>
        </div>
        <p className="pl-6 leading-relaxed">
          {language === 'fr'
            ? 'Une compatibilité élevée ne garantit jamais un accord automatique de prêt. L’obtention des fonds dépendra toujours de la validation de vos prérequis et du passage devant le comité de crédit de chaque institution.'
            : 'A high match confidence does not guarantee automatic loan approval. Funding disbursement always relies on fulfilling prerequisites and passing institutional committee review.'}
        </p>
      </div>

      {/* Funders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredFunders.map((funder) => {
          return (
            <div
              key={funder.id}
              className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 shadow-sm flex flex-col justify-between hover:border-[#5B9BD5] transition-all hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Header: Category & Match Badge */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-[#5B9BD5] uppercase tracking-wider block">
                      {funder.categoryLabel}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-[#1F4E79] mt-0.5">
                      {funder.name}
                    </h4>
                  </div>
                  <div className="shrink-0 px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 bg-[#5B8C5A]/15 text-[#5B8C5A] border border-[#5B8C5A]/30">
                    <Sparkles className="w-3 h-3" />
                    <span>{funder.matchPercentage}% {language === 'fr' ? 'adéquation' : 'fit'}</span>
                  </div>
                </div>

                {/* Why Matched */}
                <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
                  <span className="text-[11px] font-bold text-[#1F4E79] block mb-0.5">
                    {language === 'fr' ? 'Pourquoi ce choix ?' : 'Why this match:'}
                  </span>
                  <p className="text-xs text-[#263238]/85 leading-relaxed">
                    {funder.whyMatched}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-white border border-[#1F4E79]/10">
                    <span className="text-[10px] text-[#263238]/60 uppercase font-semibold block flex items-center gap-1">
                      <Coins className="w-3 h-3 text-[#1F4E79]" />
                      {language === 'fr' ? 'Enveloppe type :' : 'Typical ticket:'}
                    </span>
                    <span className="font-bold text-[#1F4E79] block mt-0.5 text-xs truncate">
                      {funder.ticketRange}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#1F4E79]/10">
                    <span className="text-[10px] text-[#263238]/60 uppercase font-semibold block flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#1F4E79]" />
                      {language === 'fr' ? 'Délai d’instruction :' : 'Turnaround:'}
                    </span>
                    <span className="font-bold text-[#1F4E79] block mt-0.5 text-xs truncate">
                      {funder.averageProcessingTime}
                    </span>
                  </div>
                </div>

                {/* Prerequisites & Limitations */}
                <div className="space-y-2 text-xs text-[#263238]/80">
                  <div>
                    <strong className="text-[#1F4E79] block mb-0.5">
                      {language === 'fr' ? 'Prérequis obligatoires :' : 'Mandatory prerequisites:'}
                    </strong>
                    <p className="text-[11px] leading-relaxed text-[#263238]/75">
                      {funder.prerequisites}
                    </p>
                  </div>

                  {funder.limitations && (
                    <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/50 text-[11px] text-amber-900 leading-relaxed">
                      <strong>{language === 'fr' ? 'Point d’attention :' : 'Attention point:'}</strong> {funder.limitations}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Solliciter la mise en relation */}
              <div className="pt-4 mt-4 border-t border-[#1F4E79]/10 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#5B8C5A] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  0 € d’avance
                </span>
                <button
                  onClick={() => onSelectFunder(funder)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1F4E79] hover:bg-[#163857] transition-all cursor-pointer shadow-xs active:scale-98"
                >
                  <span>{language === 'fr' ? 'Demander l’introduction' : 'Request introduction'}</span>
                  <Send className="w-3.5 h-3.5 text-[#5B9BD5]" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
