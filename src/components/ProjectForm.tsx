import React, { useState } from 'react';
import {
  ArrowRight,
  Lightbulb,
  Rocket,
  TrendingUp,
  Sparkles,
  AlertCircle,
  Info,
  Coins,
  Check
} from 'lucide-react';
import { Currency, Language, ProjectFormData, ProjectStage } from '../types';
import { translations } from '../locales';
import { formatCurrencyAmount, getCurrencyConfig } from '../utils/formatters';

interface ProjectFormProps {
  initialData: ProjectFormData;
  language: Language;
  onSubmit: (data: ProjectFormData) => void;
  isLoading: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialData,
  language,
  onSubmit,
  isLoading
}) => {
  const t = translations[language];

  const [formData, setFormData] = useState<ProjectFormData>(initialData);
  const [errors, setErrors] = useState<{ name?: string; description?: string; amount?: string }>({});

  const currencyConfig = getCurrencyConfig(formData.currency || 'FCFA');

  const handleCurrencyChange = (newCurrency: Currency) => {
    if (newCurrency === formData.currency) return;

    let adjustedAmount = formData.amount;
    if (newCurrency === 'FCFA' && formData.amount < 500000) {
      adjustedAmount = 20000000;
    } else if (newCurrency !== 'FCFA' && formData.amount >= 500000) {
      adjustedAmount = newCurrency === 'EUR' ? 35000 : 40000;
    }

    setFormData((prev) => ({
      ...prev,
      currency: newCurrency,
      amount: adjustedAmount
    }));
  };

  const handleStageSelect = (stage: ProjectStage) => {
    setFormData((prev) => ({ ...prev, stage }));
  };

  const handleAmountChange = (val: number) => {
    setFormData((prev) => ({ ...prev, amount: Math.max(currencyConfig.min, val) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; description?: string; amount?: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'fr' ? 'Veuillez saisir le nom de votre projet' : 'Please enter your project name';
    }
    if (!formData.description.trim() || formData.description.trim().length < 20) {
      newErrors.description = language === 'fr' ? 'Veuillez fournir une description d’au moins 20 caractères' : 'Please provide at least 20 characters describing your project';
    }
    if (!formData.amount || formData.amount < currencyConfig.min) {
      newErrors.amount = language === 'fr'
        ? `Le montant minimum est de ${formatCurrencyAmount(currencyConfig.min, formData.currency)}`
        : `Minimum requested amount is ${formatCurrencyAmount(currencyConfig.min, formData.currency)}`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({ ...formData, language });
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="bg-white rounded-2xl border border-[#1F4E79]/15 shadow-sm p-6 sm:p-8 space-y-7">
        {/* Form header */}
        <div className="border-b border-[#1F4E79]/10 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-[#1F4E79] mb-1">
            <Sparkles className="w-4 h-4 text-[#5B9BD5]" />
            <span>{language === 'fr' ? 'Formulaire Intelligent de Diagnostic' : 'Smart Diagnostic Form'}</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1F4E79]">
            {t.form.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#263238]/70 mt-1">
            {t.form.subtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* CURRENCY SELECTOR (FCFA PRINCIPALE) */}
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/15 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79] flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-[#5B9BD5]" />
                <span>{t.form.currencySelect}</span>
              </label>
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-[#5B8C5A]/15 text-[#5B8C5A] border border-[#5B8C5A]/25">
                {language === 'fr' ? 'FCFA par défaut' : 'FCFA default'}
              </span>
            </div>
            <p className="text-[11px] text-[#263238]/70">
              {t.currencyHint}
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => handleCurrencyChange('FCFA')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  formData.currency === 'FCFA'
                    ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-xs ring-2 ring-[#5B9BD5]/30'
                    : 'border-[#1F4E79]/20 bg-white text-[#1F4E79] hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-black">
                  <span>FCFA</span>
                  {formData.currency === 'FCFA' && <Check className="w-3.5 h-3.5 text-[#5B9BD5]" />}
                </div>
                <span className={`text-[10px] ${formData.currency === 'FCFA' ? 'text-white/80' : 'text-[#263238]/60'}`}>
                  {language === 'fr' ? 'Principal (UEMOA/CEMAC)' : 'Primary (CFA Franc)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCurrencyChange('EUR')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  formData.currency === 'EUR'
                    ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-xs ring-2 ring-[#5B9BD5]/30'
                    : 'border-[#1F4E79]/20 bg-white text-[#1F4E79] hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-black">
                  <span>EUR (€)</span>
                  {formData.currency === 'EUR' && <Check className="w-3.5 h-3.5 text-[#5B9BD5]" />}
                </div>
                <span className={`text-[10px] ${formData.currency === 'EUR' ? 'text-white/80' : 'text-[#263238]/60'}`}>
                  Eurozone
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleCurrencyChange('USD')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  formData.currency === 'USD'
                    ? 'border-[#1F4E79] bg-[#1F4E79] text-white shadow-xs ring-2 ring-[#5B9BD5]/30'
                    : 'border-[#1F4E79]/20 bg-white text-[#1F4E79] hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-1 text-xs font-black">
                  <span>USD ($)</span>
                  {formData.currency === 'USD' && <Check className="w-3.5 h-3.5 text-[#5B9BD5]" />}
                </div>
                <span className={`text-[10px] ${formData.currency === 'USD' ? 'text-white/80' : 'text-[#263238]/60'}`}>
                  International ($)
                </span>
              </button>
            </div>
          </div>

          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
              {t.form.projectName} <span className="text-[#E89B3C]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.form.projectNamePlaceholder}
              className={`w-full px-4 py-3 rounded-xl border text-sm bg-[#F7F5EF]/40 text-[#263238] placeholder-[#263238]/40 transition-colors focus:outline-none focus:bg-white ${
                errors.name ? 'border-red-400 bg-red-50/20' : 'border-[#1F4E79]/20 focus:border-[#5B9BD5]'
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Sector & Target Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                {t.form.sector}
              </label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/40 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5] transition-colors"
              >
                {t.form.sectorOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                {t.form.location}
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={t.form.locationPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/40 text-sm text-[#263238] placeholder-[#263238]/40 focus:bg-white focus:outline-none focus:border-[#5B9BD5] transition-colors"
              />
            </div>
          </div>

          {/* Development Stage */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
              {t.form.stage} <span className="text-[#E89B3C]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => handleStageSelect('idea')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formData.stage === 'idea'
                    ? 'border-[#1F4E79] bg-[#1F4E79]/5 ring-1 ring-[#1F4E79]'
                    : 'border-[#1F4E79]/20 bg-white hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${formData.stage === 'idea' ? 'bg-[#1F4E79] text-white' : 'bg-[#5B9BD5]/15 text-[#1F4E79]'}`}>
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#1F4E79]">{t.form.stageIdea}</span>
                </div>
                <p className="text-[11px] text-[#263238]/70 leading-snug">
                  {t.form.stageIdeaDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleStageSelect('seed')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formData.stage === 'seed'
                    ? 'border-[#1F4E79] bg-[#1F4E79]/5 ring-1 ring-[#1F4E79]'
                    : 'border-[#1F4E79]/20 bg-white hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${formData.stage === 'seed' ? 'bg-[#1F4E79] text-white' : 'bg-[#5B9BD5]/15 text-[#1F4E79]'}`}>
                    <Rocket className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#1F4E79]">{t.form.stageSeed}</span>
                </div>
                <p className="text-[11px] text-[#263238]/70 leading-snug">
                  {t.form.stageSeedDesc}
                </p>
              </button>

              <button
                type="button"
                onClick={() => handleStageSelect('growth')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  formData.stage === 'growth'
                    ? 'border-[#1F4E79] bg-[#1F4E79]/5 ring-1 ring-[#1F4E79]'
                    : 'border-[#1F4E79]/20 bg-white hover:border-[#5B9BD5]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${formData.stage === 'growth' ? 'bg-[#1F4E79] text-white' : 'bg-[#5B9BD5]/15 text-[#1F4E79]'}`}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-xs text-[#1F4E79]">{t.form.stageGrowth}</span>
                </div>
                <p className="text-[11px] text-[#263238]/70 leading-snug">
                  {t.form.stageGrowthDesc}
                </p>
              </button>
            </div>
          </div>

          {/* Amount Requested (Slider + Input formatted with Currency) */}
          <div className="p-4 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/15 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                  {t.form.amount} ({formData.currency}) <span className="text-[#E89B3C]">*</span>
                </label>
                <p className="text-[11px] text-[#263238]/70">
                  {t.form.amountHint}
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto bg-white px-3.5 py-1.5 rounded-lg border border-[#1F4E79]/20 shadow-xs">
                <input
                  type="number"
                  min={currencyConfig.min}
                  max={currencyConfig.max}
                  step={currencyConfig.step}
                  value={formData.amount}
                  onChange={(e) => handleAmountChange(Number(e.target.value))}
                  className="w-32 text-lg font-black text-[#1F4E79] outline-none text-right"
                />
                <span className="text-xs font-extrabold text-[#5B9BD5]">
                  {formData.currency}
                </span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={currencyConfig.min}
              max={currencyConfig.max}
              step={currencyConfig.step}
              value={formData.amount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              className="w-full accent-[#1F4E79] h-2 bg-white rounded-lg cursor-pointer"
            />

            {/* Quick amount chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {currencyConfig.quickValues.map((quickVal, idx) => (
                <button
                  key={quickVal}
                  type="button"
                  onClick={() => handleAmountChange(quickVal)}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    formData.amount === quickVal
                      ? 'bg-[#1F4E79] text-white shadow-2xs'
                      : 'bg-white text-[#1F4E79] border border-[#1F4E79]/15 hover:border-[#5B9BD5]'
                  }`}
                >
                  {currencyConfig.quickLabels[idx]}
                </button>
              ))}
            </div>
            {errors.amount && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.amount}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                {t.form.description} <span className="text-[#E89B3C]">*</span>
              </label>
              <span className="text-[11px] text-[#263238]/60">
                {formData.description.length} {language === 'fr' ? 'caractères' : 'characters'}
              </span>
            </div>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={t.form.descriptionPlaceholder}
              className={`w-full p-4 rounded-xl border text-sm bg-[#F7F5EF]/40 text-[#263238] placeholder-[#263238]/40 transition-colors focus:outline-none focus:bg-white ${
                errors.description ? 'border-red-400 bg-red-50/20' : 'border-[#1F4E79]/20 focus:border-[#5B9BD5]'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.description}
              </p>
            )}
          </div>

          {/* Revenue & Purpose */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                {t.form.revenue}
              </label>
              <select
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/40 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5] transition-colors"
              >
                {t.form.revenueOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1F4E79]">
                {t.form.purpose}
              </label>
              <select
                value={formData.fundingPurpose}
                onChange={(e) => setFormData({ ...formData, fundingPurpose: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[#1F4E79]/20 bg-[#F7F5EF]/40 text-sm text-[#263238] focus:bg-white focus:outline-none focus:border-[#5B9BD5] transition-colors"
              >
                {t.form.purposeOptions.map((opt, i) => (
                  <option key={i} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Model info banner */}
          <div className="p-3.5 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/20 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#5B8C5A] shrink-0 mt-0.5" />
            <p className="text-xs text-[#1F4E79] leading-relaxed">
              <strong>{language === 'fr' ? 'Engagement FinAccess :' : 'FinAccess Guarantee:'}</strong>{' '}
              {language === 'fr'
                ? `L’évaluation et le matching FinAccess sont 100% gratuits pour vous (0 ${formData.currency}). Notre rémunération est versée par l’organisme financeur uniquement lors d’un décaissement effectif.`
                : `FinAccess evaluation and matching are 100% free for you (0 ${formData.currency}). Our commission is covered exclusively by the partner funder upon successful disbursement.`}
            </p>
          </div>

          {/* Primary Action Button (ORANGE EXCLUSIF) */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-[#E89B3C] hover:bg-[#d88d30] shadow-md shadow-[#E89B3C]/20 transition-all flex items-center justify-center gap-3 transform active:scale-99 text-base cursor-pointer disabled:opacity-60"
            >
              <span>{isLoading ? t.form.ctaSubmitting : t.form.ctaSubmit}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-[#263238]/60 mt-2">
              {t.form.securityNotice}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
