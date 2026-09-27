import React from 'react';

interface FinepreneurLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const FinepreneurLogo: React.FC<FinepreneurLogoProps> = ({
  className = '',
  iconOnly = false,
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-xl', lineW: 'w-10', lineH: 'h-0.5' },
    md: { icon: 42, text: 'text-2xl', lineW: 'w-12', lineH: 'h-1' },
    lg: { icon: 54, text: 'text-3xl', lineW: 'w-16', lineH: 'h-1.5' },
    xl: { icon: 68, text: 'text-4xl', lineW: 'w-20', lineH: 'h-2' }
  };

  const s = sizeMap[size];

  // Vector Icon Component
  const IconMark = () => (
    <svg
      width={s.icon}
      height={s.icon}
      viewBox="0 0 100 100"
      className="shrink-0 transition-transform group-hover:scale-102"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="#1F4E79" />
      {/* White rounded F */}
      <path
        d="M36 31 H65 Q70 31 70 35 Q70 39 65 39 H43 V49 H60 Q65 49 65 53 Q65 57 60 57 H43 V70 Q43 74 39 74 Q35 74 35 70 V38 Q35 31 41 31"
        fill="#FFFFFF"
      />
      {/* Orange dot */}
      <circle cx="73" cy="34" r="6.5" fill="#E89B3C" />
    </svg>
  );

  if (iconOnly) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <IconMark />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <IconMark />
      <div className="flex flex-col justify-center leading-none">
        <span className={`font-bold tracking-tight text-[#263238] lowercase ${s.text}`}>
          finepreneur
        </span>
        {/* Underline under 'fine' */}
        <div className={`bg-[#E89B3C] rounded-full mt-1.5 ${s.lineW} ${s.lineH}`} />
      </div>
    </div>
  );
};
