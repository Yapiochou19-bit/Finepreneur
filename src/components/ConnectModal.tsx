import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Sparkles, Building2 } from 'lucide-react';
import { Funder, Language } from '../types';
import { translations } from '../locales';

interface ConnectModalProps {
  funder: Funder | null;
  projectName: string;
  language: Language;
  onClose: () => void;
}

export const ConnectModal: React.FC<ConnectModalProps> = ({
  funder,
  projectName,
  language,
  onClose
}) => {
  const t = translations[language];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!funder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1F4E79]/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-[#1F4E79]/20 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-[#F7F5EF] border-b border-[#1F4E79]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F4E79] text-white flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#5B9BD5]" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#5B9BD5] uppercase tracking-wider block">
                {t.connectModal.title}
              </span>
              <h3 className="font-bold text-base text-[#1F4E79]">
                {funder.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#263238]/60 hover:text-[#1F4E79] hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#5B8C5A]/15 text-[#5B8C5A] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#1F4E79]">
                {language === 'fr' ? 'Dossier Transmis !' : 'Dossier Successfully Sent!'}
              </h4>
              <p className="text-xs sm:text-sm text-[#263238]/80 max-w-sm mx-auto leading-relaxed">
                {t.connectModal.successDesc}
              </p>
              <div className="p-3.5 rounded-xl bg-[#F7F5EF] border border-[#1F4E79]/10 text-xs text-[#1F4E79] font-medium">
                {t.connectModal.zeroCostHighlight}
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1F4E79] text-white font-bold text-xs hover:bg-[#163857] transition-all cursor-pointer"
              >
                {language === 'fr' ? 'Fermer la fenêtre' : 'Close window'}
              </button>
            </div>
          ) : (
            <>
              {/* Zero cost highlight banner */}
              <div className="p-3.5 rounded-xl bg-[#5B8C5A]/10 border border-[#5B8C5A]/25 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5B8C5A] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1F4E79]">
                  <strong className="block font-bold">{t.connectModal.zeroCostHighlight}</strong>
                  <p className="text-[#263238]/70 mt-0.5 text-[11px] leading-relaxed">
                    {t.connectModal.explanation}
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1F4E79]">
                    {t.connectModal.formContactName}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Sophie Martin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1F4E79]/20 text-xs text-[#263238] focus:outline-none focus:border-[#5B9BD5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1F4E79]">
                    {t.connectModal.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sophie@monentreprise.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1F4E79]/20 text-xs text-[#263238] focus:outline-none focus:border-[#5B9BD5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#1F4E79]">
                    {t.connectModal.formPhone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="06 12 34 56 78"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#1F4E79]/20 text-xs text-[#263238] focus:outline-none focus:border-[#5B9BD5]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#1F4E79] hover:bg-[#163857] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <span>{t.connectModal.btnSubmit}</span>
                    <Send className="w-3.5 h-3.5 text-[#5B9BD5]" />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
