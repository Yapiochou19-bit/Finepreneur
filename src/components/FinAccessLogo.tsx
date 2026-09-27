import React from 'react';
import { Language } from '../types';

interface FinAccessLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  language?: Language;
}

export const FinAccessLogo: React.FC<FinAccessLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md',
  language = 'fr'
}) => {
  const sizeMap = {
    sm: { icon: 34, height: 34, titleSize: 'text-lg', subtitleSize: 'text-[9.5px]' },
    md: { icon: 44, height: 44, titleSize: 'text-2xl', subtitleSize: 'text-[11.5px]' },
    lg: { icon: 56, height: 56, titleSize: 'text-3xl', subtitleSize: 'text-xs' },
    xl: { icon: 72, height: 72, titleSize: 'text-4xl', subtitleSize: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  // Vector Icon Component
  const IconMark = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      className="shrink-0 transition-transform group-hover:scale-102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Squircle base */}
      <rect width="100" height="100" rx="24" fill="#1F4E79" />

      {/* Bar 1 (Short - Cream) */}
      <rect x="20" y="60" width="12" height="26" rx="6" fill="#F7F5EF" />

      {/* Bar 2 (Medium - Cream) */}
      <rect x="38" y="44" width="12" height="42" rx="6" fill="#F7F5EF" />

      {/* Bar 3 (Tall - Light Blue) */}
      <rect x="56" y="30" width="12" height="56" rx="6" fill="#5B9BD5" />

      {/* Green circular origin node */}
      <circle cx="26" cy="51" r="5" fill="#5B8C5A" />

      {/* Orange trend line */}
      <path
        d="M26 51 L49 24 L68 45"
        stroke="#E89B3C"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Arrow down pointing over the third bar */}
      <path
        d="M68 34 L68 50 L77 41 M68 50 L59 41"
        stroke="#E89B3C"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <IconMark />
      </div>
    );
  }

  const tagline = language === 'en'
    ? 'Your financing memo, boosted by AI'
    : 'Votre dossier de financement, boosté par l\'IA';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <IconMark />
      <div className="flex flex-col justify-center leading-none">
        <div className={`font-black tracking-tight ${currentSize.titleSize}`}>
          <span className="text-[#5B9BD5]">Fin</span>
          <span className="text-[#E89B3C]">Access</span>
        </div>
        <p className={`font-semibold text-[#5B9BD5] mt-1 tracking-tight ${currentSize.subtitleSize}`}>
          {tagline}
        </p>
      </div>
    </div>
  );
};
