import React from 'react';

/**
 * Premium Minimalist LogoIcon Component
 * A clean, modern, tech-style geometric "TT" monogram.
 * Perfect for a high-end, trusted, startup-grade AI platform.
 */
export function LogoIcon({ className = "w-10 h-10", pulse = false }) {
  const hasTextColor = className.includes('text-');
  const finalClass = `${className} ${pulse ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-105 ${hasTextColor ? '' : 'text-slate-950 dark:text-white'}`;

  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={finalClass}
    >
      {/* Clean top bar */}
      <rect x="20" y="20" width="60" height="12" rx="2.5" fill="currentColor" />
      {/* Left stem (primary T) */}
      <rect x="36" y="38" width="12" height="42" rx="2.5" fill="currentColor" />
      {/* Right stem (secondary T) */}
      <rect x="52" y="38" width="12" height="26" rx="2.5" fill="currentColor" />
      {/* Precision soft orange/red accent block */}
      <rect x="52" y="68" width="12" height="12" rx="2.5" fill="#EA580C" />
    </svg>
  );
}

/**
 * Main horizontal BrandLogo Component
 * Renders the custom Icon side-by-side with premium typography.
 */
export function BrandLogo({ className = "", iconClassName = "w-8 h-8", lightMode = false }) {
  return (
    <div className={`flex items-center gap-2 select-none flex-shrink-0 overflow-visible ${className}`}>
      <LogoIcon className={`${iconClassName} flex-shrink-0`} />
      <span className="text-xl font-black tracking-tighter uppercase font-sans flex items-center leading-none flex-shrink-0">
        <span className={lightMode ? 'text-white' : 'text-slate-950 dark:text-slate-100'}>TOOL</span>
        <span className="text-[#EA580C]">TROVE</span>
      </span>
    </div>
  );
}
