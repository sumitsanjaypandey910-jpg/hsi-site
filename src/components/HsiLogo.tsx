import React from 'react';

interface HsiLogoProps {
  variant?: 'full' | 'horizontal' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  darkTheme?: boolean;
}

export const HsiLogo: React.FC<HsiLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  darkTheme = false
}) => {
  // Dimension mapping
  const markDimensions = {
    sm: { w: 38, h: 38 },
    md: { w: 48, h: 48 },
    lg: { w: 64, h: 64 },
    xl: { w: 100, h: 100 },
  }[size];

  const emblemSvg = (
    <img
      src="/hsi-logo.png"
      alt="Horizon Secure Investments"
      width={markDimensions.w}
      height={markDimensions.h}
      style={{ width: markDimensions.w, height: markDimensions.h }}
      className={`shrink-0 object-contain transition-transform duration-300 group-hover:scale-105 ${
        darkTheme ? 'bg-slate-100 rounded-full p-1' : 'drop-shadow-md'
      }`}
    />
  );

  if (variant === 'mark-only') {
    return <div className="inline-flex items-center">{emblemSvg}</div>;
  }

  if (variant === 'full') {
    return (
      <div className="flex flex-col items-center text-center select-none group">
        <div className="relative mb-2">
          {emblemSvg}
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-heading text-2xl md:text-3xl font-extrabold tracking-[0.25em] ${
              darkTheme ? 'text-white' : 'text-[#0a192f]'
            }`}
          >
            HORIZON
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-[1.5px] w-6 bg-orange-500/80" />
            <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-orange-500 dark:text-orange-400 uppercase">
              SECURE INVESTMENTS
            </span>
            <span className="h-[1.5px] w-6 bg-orange-500/80" />
          </div>
          <span
            className={`text-[10px] md:text-[11px] font-semibold tracking-[0.22em] mt-1.5 uppercase ${
              darkTheme ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Securing Tomorrow's Wealth
          </span>
        </div>
      </div>
    );
  }

  // Default 'horizontal' layout for Navbar
  return (
    <div className="inline-flex items-center gap-3 select-none group">
      {emblemSvg}
      <div className="flex flex-col leading-none">
        <span
          className={`font-heading text-xl md:text-2xl font-black tracking-[0.18em] ${
            darkTheme ? 'text-white' : 'text-[#0a192f]'
          }`}
        >
          HORIZON
        </span>
        <span className="text-[10px] md:text-[11px] font-extrabold tracking-[0.22em] text-orange-500 uppercase mt-0.5">
          SECURE INVESTMENTS
        </span>
        <span
          className={`text-[8.5px] md:text-[9.5px] font-semibold tracking-[0.2em] uppercase mt-1 ${
            darkTheme ? 'text-slate-300' : 'text-slate-500'
          }`}
        >
          Securing Tomorrow's Wealth
        </span>
      </div>
    </div>
  );
};
