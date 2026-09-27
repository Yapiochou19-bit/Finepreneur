import React from 'react';
import { ShieldCheck, Award, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../locales';

interface ScoreGaugeProps {
  score: number;
  scoreLevel: string;
  tags: string[];
  language: Language;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  scoreLevel,
  tags,
  language
}) => {
  const t = translations[language];

  // SVG Gauge calculations (circumference for r=70 is 2 * PI * 70 ≈ 440)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const isHigh = score >= 75;
  const scoreColor = isHigh ? '#5B8C5A' : '#5B9BD5';

  return (
    <div className="bg-white rounded-2xl border border-[#1F4E79]/15 p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive Visual SVG Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Background SVG Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#F0ECE1"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={scoreColor}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl sm:text-5xl font-black text-[#1F4E79] tracking-tight">
                {score}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#263238]/60 mt-0.5">
                / 100
              </span>
              <div className="mt-1 px-2.5 py-0.5 rounded-full bg-[#5B8C5A]/15 text-[#5B8C5A] text-[11px] font-bold border border-[#5B8C5A]/25">
                {scoreLevel}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-[#263238]/70">
            <ShieldCheck className="w-4 h-4 text-[#5B8C5A]" />
            <span>
              {language === 'fr'
                ? 'Indice d’éligibilité aux comités de crédit'
                : 'Credit committee approval likelihood index'}
            </span>
          </div>
        </div>

        {/* Right: Key Tags & Sub-Metrics */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-[#5B9BD5]" />
              <span>{t.results.scoreTitle}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#1F4E79]">
              {language === 'fr'
                ? `Diagnostic de Crédibilité : Profil ${scoreLevel}`
                : `Credibility Diagnostic: ${scoreLevel} Rating`}
            </h3>
            <p className="text-xs sm:text-sm text-[#263238]/75 mt-1 leading-relaxed">
              {t.results.scoreSubtitle}
            </p>
          </div>

          {/* Profile Qualifying Tags */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#1F4E79] block">
              {t.results.tagsLabel}
            </span>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#5B8C5A]/12 text-[#1F4E79] border border-[#5B8C5A]/30 shadow-2xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5B8C5A]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Three Sub-Criteria Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#1F4E79]/10">
            <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
              <span className="text-[11px] font-semibold text-[#263238]/70 block">
                {language === 'fr' ? 'Cohérence du Besoin' : 'Capital Sizing Fit'}
              </span>
              <span className="text-sm font-bold text-[#1F4E79] mt-0.5 block">
                {score >= 70 ? (language === 'fr' ? '92% Équilibré' : '92% Balanced') : '78% Modéré'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
              <span className="text-[11px] font-semibold text-[#263238]/70 block">
                {language === 'fr' ? 'Garantie Publique' : 'Public Guarantee'}
              </span>
              <span className="text-sm font-bold text-[#5B8C5A] mt-0.5 block">
                {language === 'fr' ? 'Jusqu’à 80% couverte' : 'Up to 80% backed'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10">
              <span className="text-[11px] font-semibold text-[#263238]/70 block">
                {language === 'fr' ? 'Effet de Levier' : 'Banking Leverage'}
              </span>
              <span className="text-sm font-bold text-[#1F4E79] mt-0.5 block">
                {language === 'fr' ? 'Ratio 1 : 3 Déblocable' : '1:3 Ratio Unlock'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
