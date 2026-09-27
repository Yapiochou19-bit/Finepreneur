import React from 'react';
import { Globe, RefreshCw } from 'lucide-react';
import { Currency, Language } from '../types';
import { translations } from '../locales';
import { FinepreneurLogo } from './FinepreneurLogo';

interface NavbarProps {
  language: Language;
  currency: Currency;
  onLanguageChange: (lang: Language) => void;
  onCurrencyChange: (curr: Currency) => void;
  onReset: () => void;
  hasResult: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  currency,
  onLanguageChange,
  onCurrencyChange,
  onReset,
  hasResult
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EF]/95 backdrop-blur-md border-b border-[#1F4E79]/10 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Official Brand Logo */}
        <button
          onClick={onReset}
          className="group text-left transition-transform active:scale-98 cursor-pointer focus:outline-none"
        >
          <FinepreneurLogo size="md" />
        </button>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Zero cost badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/90 border border-[#1F4E79]/15 shadow-2xs text-xs font-semibold text-[#1F4E79]">
            <span className="w-2 h-2 rounded-full bg-[#5B8C5A] animate-pulse"></span>
            <span>{t.modelBadge}</span>
          </div>

          {/* Currency Switcher in Header */}
          <div className="flex items-center bg-white border border-[#1F4E79]/20 rounded-lg p-0.5 shadow-2xs text-xs">
            {(['FCFA', 'EUR', 'USD'] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => onCurrencyChange(c)}
                className={`px-2.5 py-1 rounded font-bold transition-all text-[11px] cursor-pointer ${
                  currency === c
                    ? 'bg-[#1F4E79] text-white shadow-2xs'
                    : 'text-[#263238]/70 hover:text-[#1F4E79] hover:bg-[#F7F5EF]'
                }`}
                title={c === 'FCFA' ? 'Franc CFA (Devise Principale)' : c}
              >
                {c}
              </button>
            ))}
          </div>

          {hasResult && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F4E79] bg-white border border-[#1F4E79]/20 hover:bg-[#F7F5EF] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#5B9BD5]" />
              <span className="hidden sm:inline">{language === 'fr' ? 'Nouveau projet' : 'New project'}</span>
            </button>
          )}

          {/* Language Switch */}
          <button
            onClick={() => onLanguageChange(language === 'fr' ? 'en' : 'fr')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold text-[#1F4E79] bg-white border border-[#1F4E79]/20 hover:border-[#5B9BD5] transition-all shadow-2xs cursor-pointer"
            title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
          >
            <Globe className="w-3.5 h-3.5 text-[#5B9BD5]" />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
