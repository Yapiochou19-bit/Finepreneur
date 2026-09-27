import React from 'react';
import { ArrowRight, Sparkles, Building2, Cpu, Wrench, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';
import { Currency, Language, ProjectFormData } from '../types';
import { presetProjects } from '../data/mockPresets';
import { formatCurrencyAmount } from '../utils/formatters';

interface HeroOnboardingProps {
  language: Language;
  currency: Currency;
  onStartForm: () => void;
  onSelectPreset: (preset: ProjectFormData) => void;
}

export const HeroOnboarding: React.FC<HeroOnboardingProps> = ({
  language,
  currency,
  onStartForm,
  onSelectPreset
}) => {
  const steps = language === 'fr' ? [
    { num: '1', title: 'Décrivez votre activité', sub: 'En quelques mots naturels, sans jargon bancaire.' },
    { num: '2', title: 'Diagnostic honnête', sub: 'Identification précise des points de blocage réels.' },
    { num: '3', title: 'Plan d’actions concret', sub: 'Ce que vous devez faire pour devenir finançable.' },
    { num: '4', title: 'Financeurs & Dossier prêt', sub: 'Opportunités transparentes et dossier clé en main.' }
  ] : [
    { num: '1', title: 'Describe your business', sub: 'In plain words, with zero complex financial jargon.' },
    { num: '2', title: 'Honest diagnostic', sub: 'Identify the exact hurdles locking you out.' },
    { num: '3', title: 'Actionable roadmap', sub: 'Clear tasks to become progressively financing-ready.' },
    { num: '4', title: 'Funders & Ready memo', sub: 'Transparent matching and turnkey committee dossier.' }
  ];

  return (
    <section className="py-8 sm:py-14 space-y-10">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F4E79]/8 border border-[#1F4E79]/15 text-xs font-bold text-[#1F4E79]">
          <Sparkles className="w-3.5 h-3.5 text-[#5B9BD5]" />
          <span>{language === 'fr' ? 'Le Coach Financier des Entrepreneurs' : 'The AI Financial Coach for Entrepreneurs'}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F4E79] tracking-tight leading-[1.18]">
          {language === 'fr'
            ? 'Comprenez votre situation et devenez progressivement finançable.'
            : 'Understand your financial standing and become progressively fundable.'}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#263238]/85 max-w-2xl mx-auto leading-relaxed">
          {language === 'fr'
            ? 'Fin des formulaires intimidants et des refus sans explications. Finepreneur analyse votre activité, identifie vos points faibles et vous guide pas à pas jusqu’à l’obtention de votre financement.'
            : 'No more intimidating forms or unexplained loan rejections. Finepreneur diagnoses your hurdles, delivers an improvement roadmap, and gets you ready for credit approval.'}
        </p>

        {/* Primary CTA (Orange réservé) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-[#E89B3C] hover:bg-[#d88d30] shadow-md shadow-[#E89B3C]/25 transition-all transform active:scale-98 text-base cursor-pointer"
          >
            <span>{language === 'fr' ? 'Démarrer mon accompagnement' : 'Start My Guided Diagnosis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 100% Free guarantee pill */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1F4E79] bg-[#5B8C5A]/12 px-3.5 py-1.5 rounded-full border border-[#5B8C5A]/25">
          <CheckCircle2 className="w-4 h-4 text-[#5B8C5A]" />
          <span>{language === 'fr' ? '100% gratuit pour l’entrepreneur • 0 FCFA d’avance' : '100% free for founders • 0 upfront fees'}</span>
        </div>
      </div>

      {/* LE PARCOURS EN 4 ÉTAPES CLAIRES */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-[#1F4E79]/15 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="text-center sm:text-left">
          <span className="text-xs font-bold text-[#5B9BD5] uppercase tracking-wider block">
            {language === 'fr' ? 'Comment ça marche' : 'How it works'}
          </span>
          <h3 className="text-lg font-bold text-[#1F4E79] mt-0.5">
            {language === 'fr' ? 'Un parcours simple et progressif' : 'A simple, guided journey'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          {steps.map((st, i) => (
            <div key={i} className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 space-y-2 relative text-left">
              <span className="w-7 h-7 rounded-full bg-[#1F4E79] text-white text-xs font-bold flex items-center justify-center">
                {st.num}
              </span>
              <h4 className="text-sm font-bold text-[#1F4E79] leading-snug">
                {st.title}
              </h4>
              <p className="text-xs text-[#263238]/70 leading-relaxed">
                {st.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* QUICK PRESETS FOR DEMO / HACKATHON JURY */}
      <div className="max-w-3xl mx-auto text-center space-y-3 pt-2">
        <p className="text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
          {language === 'fr' ? 'Tester avec un exemple en 1 clic :' : 'Test with a 1-click example:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => onSelectPreset(presetProjects.kiosk)}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#E89B3C]/40 hover:border-[#E89B3C] hover:bg-white text-left transition-all shadow-2xs group cursor-pointer ring-1 ring-[#E89B3C]/20"
          >
            <div className="w-8 h-8 rounded-lg bg-[#E89B3C]/15 flex items-center justify-center text-[#E89B3C] group-hover:bg-[#E89B3C] group-hover:text-white transition-colors shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs overflow-hidden">
              <span className="font-bold text-[#1F4E79] block truncate">
                Kiosque Express
              </span>
              <span className="text-[#E89B3C] text-[11px] font-extrabold">
                Micro • {formatCurrencyAmount(presetProjects.kiosk.amount, presetProjects.kiosk.currency)}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectPreset(presetProjects.baker)}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#1F4E79]/15 hover:border-[#5B9BD5] hover:bg-white text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5B9BD5]/15 flex items-center justify-center text-[#1F4E79] group-hover:bg-[#1F4E79] group-hover:text-white transition-colors shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="text-xs overflow-hidden">
              <span className="font-bold text-[#1F4E79] block truncate">
                Le Fournil d'Ivoire
              </span>
              <span className="text-[#263238]/60 text-[11px] font-semibold">
                Boulangerie • {formatCurrencyAmount(presetProjects.baker.amount, presetProjects.baker.currency)}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectPreset(presetProjects.tech)}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#1F4E79]/15 hover:border-[#5B9BD5] hover:bg-white text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5B9BD5]/15 flex items-center justify-center text-[#1F4E79] group-hover:bg-[#1F4E79] group-hover:text-white transition-colors shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-xs overflow-hidden">
              <span className="font-bold text-[#1F4E79] block truncate">
                AgriLogistics AI
              </span>
              <span className="text-[#263238]/60 text-[11px] font-semibold">
                AgriTech • {formatCurrencyAmount(presetProjects.tech.amount, presetProjects.tech.currency)}
              </span>
            </div>
          </button>

          <button
            onClick={() => onSelectPreset(presetProjects.craft)}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-[#1F4E79]/15 hover:border-[#5B9BD5] hover:bg-white text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-[#5B9BD5]/15 flex items-center justify-center text-[#1F4E79] group-hover:bg-[#1F4E79] group-hover:text-white transition-colors shrink-0">
              <Wrench className="w-4 h-4" />
            </div>
            <div className="text-xs overflow-hidden">
              <span className="font-bold text-[#1F4E79] block truncate">
                Atelier WoodCraft
              </span>
              <span className="text-[#263238]/60 text-[11px] font-semibold">
                Éco-Mobilier • {formatCurrencyAmount(presetProjects.craft.amount, presetProjects.craft.currency)}
              </span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
