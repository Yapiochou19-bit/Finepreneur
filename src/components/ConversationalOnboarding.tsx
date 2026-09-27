import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  Building2,
  Coins,
  MapPin,
  HelpCircle,
  Lightbulb,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Currency, Language, ProjectFormData, ProjectStage } from '../types';
import { translations } from '../locales';
import { formatCurrencyAmount, getCurrencyConfig } from '../utils/formatters';

interface ConversationalOnboardingProps {
  initialData: ProjectFormData;
  language: Language;
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
}

export const ConversationalOnboarding: React.FC<ConversationalOnboardingProps> = ({
  initialData,
  language,
  onSubmit,
  isLoading
}) => {
  const t = translations[language];
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<ProjectFormData>(initialData);
  const [error, setError] = useState<string>('');

  const currencyConfig = getCurrencyConfig(data.currency || 'FCFA');

  const sectorOptions = [
    'Commerce & Artisanat',
    'Agro-alimentaire & Agriculture',
    'Tech & Numérique',
    'Restauration & Hôtellerie',
    'Transition Écologique & Recyclage',
    'Santé & Bien-être',
    'Services aux Entreprises',
    'Industrie & Fabrication'
  ];

  const hurdleOptions = language === 'fr' ? [
    'Pas de bilans comptables certifiés sur 3 ans',
    'Absence de garantie matérielle ou caution hypothécaire',
    'Dossier de financement non structuré aux normes comités',
    'Activité récente ou premières ventes encore limitées',
    'Besoin d’identifier les bons financeurs sans intermédiaires coûteux'
  ] : [
    'Lack of 3-year certified historical balance sheets',
    'No mortgage collateral or personal asset guarantee',
    'Unstructured funding memo not aligned with committee standards',
    'Early-stage traction with initial cash flow ramping up',
    'Need to find trustworthy funders without paying upfront fees'
  ];

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!data.name.trim()) {
        setError(language === 'fr' ? 'Indiquez le nom de votre projet ou entreprise.' : 'Please provide your project or company name.');
        return;
      }
      if (!data.description.trim() || data.description.trim().length < 15) {
        setError(language === 'fr' ? 'Décrivez votre activité en au moins 15 caractères.' : 'Please briefly describe what you sell or offer.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!data.sector) {
        setError(language === 'fr' ? 'Sélectionnez votre secteur principal.' : 'Select your industry sector.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!data.amount || data.amount < currencyConfig.min) {
        setError(language === 'fr' ? `Le montant minimum est de ${formatCurrencyAmount(currencyConfig.min, data.currency)}` : `Minimum amount is ${formatCurrencyAmount(currencyConfig.min, data.currency)}`);
        return;
      }
      setStep(4);
    } else if (step === 4) {
      onSubmit(data);
    }
  };

  const handlePrev = () => {
    setError('');
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleCurrencySwitch = (newCurr: Currency) => {
    let newAmount = data.amount;
    if (newCurr === 'FCFA' && data.amount < 500000) {
      newAmount = 20000000;
    } else if (newCurr !== 'FCFA' && data.amount >= 500000) {
      newAmount = newCurr === 'EUR' ? 35000 : 40000;
    }
    setData((prev) => ({ ...prev, currency: newCurr, amount: newAmount }));
  };

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-6">
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#1F4E79] text-white text-xs font-bold flex items-center justify-center">
            {step}
          </span>
          <span className="text-xs font-bold text-[#1F4E79] uppercase tracking-wider">
            {language === 'fr' ? `Étape ${step} sur 4` : `Step ${step} of 4`}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-36 sm:w-48 h-2 bg-[#F0ECE1] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1F4E79] rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Conversational Card */}
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 shadow-sm p-6 sm:p-8 space-y-6">
        {/* STEP 1: L'ACTIVITÉ EN MOTS SIMPLES */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B9BD5]/15 text-[#1F4E79] text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Faisons connaissance' : 'Let\'s get started'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F4E79]">
                {language === 'fr' ? 'Quel est votre projet et que vendez-vous ?' : 'What is your business and what do you offer?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#263238]/70">
                {language === 'fr'
                  ? 'Pas besoin de jargon financier. Décrivez simplement ce que vous proposez et à qui.'
                  : 'No financial jargon needed. Simply explain what you sell and to which customers.'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-1">
                  {language === 'fr' ? 'Nom du projet ou de la structure' : 'Company or project name'}
                </label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Ex: Le Fournil d'Ivoire, AgriLogistics AI, Atelier WoodCraft..."
                  className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/30 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-1">
                  {language === 'fr' ? 'Votre activité en quelques phrases' : 'Brief activity description'}
                </label>
                <textarea
                  rows={4}
                  value={data.description}
                  onChange={(e) => setData({ ...data, description: e.target.value })}
                  placeholder={language === 'fr'
                    ? 'Ex: Nous produisons des pains et viennoiseries à base de farines locales de manioc et maïs pour fournir 3 supermarchés et notre boutique à Abidjan...'
                    : 'e.g. We manufacture organic baked goods from local grains, distributing to 3 retail partners in Dakar...'}
                  className="w-full p-4 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/30 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SECTEUR ET LOCALISATION */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B9BD5]/15 text-[#1F4E79] text-xs font-bold">
                <Building2 className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Votre écosystème' : 'Your ecosystem'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F4E79]">
                {language === 'fr' ? 'Dans quel secteur et pays opérez-vous ?' : 'In which industry and market do you operate?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#263238]/70">
                {language === 'fr'
                  ? 'Cela permet au coach d’identifier les programmes d’appui et institutions locales adaptées.'
                  : 'This helps Finepreneur match you with appropriate local support funds and microfinance hubs.'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-2">
                  {language === 'fr' ? 'Choisissez votre secteur d’activité' : 'Select industry sector'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sectorOptions.map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setData({ ...data, sector: sec })}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                        data.sector === sec
                          ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-2xs'
                          : 'border-[#1F4E79]/15 bg-white text-[#263238] hover:border-[#5B9BD5]'
                      }`}
                    >
                      <span>{sec}</span>
                      {data.sector === sec && <Check className="w-4 h-4 text-[#5B9BD5]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-1">
                  {language === 'fr' ? 'Ville et pays d’implantation' : 'City and country'}
                </label>
                <input
                  type="text"
                  value={data.location || ''}
                  onChange={(e) => setData({ ...data, location: e.target.value })}
                  placeholder="Ex: Abidjan (Côte d'Ivoire), Dakar (Sénégal), Douala (Cameroun)..."
                  className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/30 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-1.5">
                  {language === 'fr' ? 'Maturité actuelle de l’entreprise' : 'Current business maturity'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['idea', 'seed', 'growth'] as ProjectStage[]).map((stg) => (
                    <button
                      key={stg}
                      type="button"
                      onClick={() => setData({ ...data, stage: stg })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        data.stage === stg
                          ? 'border-[#1F4E79] bg-[#1F4E79]/8 ring-1 ring-[#1F4E79] text-[#1F4E79] font-bold'
                          : 'border-[#1F4E79]/15 bg-white text-[#263238]/70 hover:border-[#5B9BD5]'
                      }`}
                    >
                      <span className="text-xs block capitalize">
                        {stg === 'idea' ? (language === 'fr' ? 'Idée' : 'Idea') :
                         stg === 'seed' ? (language === 'fr' ? 'Démarrage' : 'Startup') :
                         (language === 'fr' ? 'En activité' : 'Active')}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: OBJECTIF FINANCIER & DEVISE */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B9BD5]/15 text-[#1F4E79] text-xs font-bold">
                <Coins className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Votre besoin' : 'Your financial goal'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F4E79]">
                {language === 'fr' ? 'Quel est votre objectif financier ?' : 'What is your target funding amount?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#263238]/70">
                {language === 'fr'
                  ? 'Devise principale : FCFA (convertible en EUR ou USD). Indiquez votre besoin pour les 6 à 12 prochains mois.'
                  : 'Primary currency: FCFA (switchable to EUR or USD). State your capital need for the next 6-12 months.'}
              </p>
            </div>

            <div className="space-y-4">
              {/* Currency pills */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#1F4E79]">{language === 'fr' ? 'Devise :' : 'Currency:'}</span>
                {(['FCFA', 'EUR', 'USD'] as Currency[]).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => handleCurrencySwitch(cur)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      data.currency === cur
                        ? 'bg-[#1F4E79] text-white'
                        : 'bg-[#F7F5EF] text-[#263238]/70 border border-[#1F4E79]/15'
                    }`}
                  >
                    {cur}
                  </button>
                ))}
              </div>

              {/* Amount slider and input */}
              <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/15 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F4E79] uppercase">
                    {language === 'fr' ? 'Montant recherché' : 'Target Amount'}
                  </span>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#1F4E79]/20 shadow-2xs">
                    <input
                      type="number"
                      min={currencyConfig.min}
                      max={currencyConfig.max}
                      step={currencyConfig.step}
                      value={data.amount}
                      onChange={(e) => setData({ ...data, amount: Math.max(currencyConfig.min, Number(e.target.value)) })}
                      className="w-32 text-right font-black text-[#1F4E79] text-base outline-none"
                    />
                    <span className="text-xs font-bold text-[#5B9BD5]">{data.currency}</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={currencyConfig.min}
                  max={currencyConfig.max}
                  step={currencyConfig.step}
                  value={data.amount}
                  onChange={(e) => setData({ ...data, amount: Number(e.target.value) })}
                  className="w-full accent-[#1F4E79] h-2 bg-white rounded-lg cursor-pointer"
                />

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currencyConfig.quickValues.map((val, idx) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setData({ ...data, amount: val })}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        data.amount === val
                          ? 'bg-[#1F4E79] text-white'
                          : 'bg-white text-[#1F4E79] border border-[#1F4E79]/15 hover:border-[#5B9BD5]'
                      }`}
                    >
                      {currencyConfig.quickLabels[idx]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] mb-1">
                  {language === 'fr' ? 'À quoi servira cet argent en priorité ?' : 'Primary fund usage'}
                </label>
                <select
                  value={data.fundingPurpose}
                  onChange={(e) => setData({ ...data, fundingPurpose: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/30 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5]"
                >
                  <option value="Production, Matériel & Équipements">Production, Matériel & Équipements</option>
                  <option value="Acquisition Clients & Commercialisation">Acquisition Clients & Commercialisation</option>
                  <option value="Trésorerie de précaution & BFR">Trésorerie de précaution & BFR</option>
                  <option value="Recrutement & Renforcement d’équipe">Recrutement & Renforcement d’équipe</option>
                  <option value="R&D, Logiciel & Propriété Intellectuelle">R&D, Logiciel & Propriété Intellectuelle</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: VOTRE PLUS GRAND OBSTACLE ACTUEL */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#5B9BD5]/15 text-[#1F4E79] text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5 text-[#5B9BD5]" />
                <span>{language === 'fr' ? 'Le point de blocage' : 'The key hurdle'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F4E79]">
                {language === 'fr' ? 'Qu’est-ce qui bloque principalement l’accès aux financements ?' : 'What is your main hurdle to obtaining financing?'}
              </h2>
              <p className="text-xs sm:text-sm text-[#263238]/70">
                {language === 'fr'
                  ? 'Soyez 100% transparent. Le rôle du coach est de concevoir un plan pour surmonter cet obstacle précis.'
                  : 'Be completely honest. Finepreneur builds an actionable roadmap specifically targeting this barrier.'}
              </p>
            </div>

            <div className="space-y-2.5">
              {hurdleOptions.map((hurdle) => (
                <button
                  key={hurdle}
                  type="button"
                  onClick={() => setData({ ...data, mainHurdle: hurdle })}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                    data.mainHurdle === hurdle
                      ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-2xs'
                      : 'border-[#1F4E79]/15 bg-white text-[#263238] hover:border-[#5B9BD5]'
                  }`}
                >
                  <span>{hurdle}</span>
                  {data.mainHurdle === hurdle && <Check className="w-4 h-4 text-[#5B9BD5]" />}
                </button>
              ))}
            </div>

            {/* Recap Box: "Ce que Finepreneur a compris" */}
            <div className="p-4 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/25 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F4E79]">
                <ShieldCheck className="w-4 h-4 text-[#5B8C5A]" />
                <span>{language === 'fr' ? 'Ce que Finepreneur a compris de votre dossier :' : 'Finepreneur Summary:'}</span>
              </div>
              <p className="text-xs text-[#263238]/85 leading-relaxed">
                <strong>{data.name}</strong> • {data.sector} • Besoin : <strong>{formatCurrencyAmount(data.amount, data.currency)}</strong> à {data.location || 'l\'international'}.
              </p>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-xs text-red-600 flex items-center gap-1.5 pt-1">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1F4E79]/10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#1F4E79] bg-[#F7F5EF] border border-[#1F4E79]/20 hover:bg-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Étape précédente' : 'Back'}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-[#1F4E79] hover:bg-[#163857] transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-98"
            >
              <span>{language === 'fr' ? 'Continuer' : 'Next Step'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5B9BD5]" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              onClick={handleNext}
              className="px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-[#E89B3C] hover:bg-[#d88d30] transition-all flex items-center gap-2.5 cursor-pointer shadow-md shadow-[#E89B3C]/25 active:scale-98 disabled:opacity-60"
            >
              <span>{isLoading ? (language === 'fr' ? 'Génération du plan coach...' : 'Generating roadmap...') : (language === 'fr' ? 'Générer mon diagnostic & plan d’action' : 'Generate Diagnostic & Action Plan')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
