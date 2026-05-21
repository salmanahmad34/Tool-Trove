import React from 'react';

/**
 * Premium LogoIcon Component
 * Fuses an isometric digital shield structure with a sleek geometric spanner wrench
 * and glowing 4-point AI sparkles, representing a unified simple tool and AI signature.
 */
export function LogoIcon({ className = "w-10 h-10", pulse = false }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={`${className} ${pulse ? 'animate-pulse' : ''} transition-all duration-300 hover:scale-105`}
    >
      {/* Premium Gradient Background Shield - Deep Navy */}
      <rect width="100" height="100" rx="28" fill="url(#navyGrad)" />
      
      {/* Hexagonal Isometric Toolkit Cube Frame */}
      <path 
        d="M50 15L84 33V67L50 85L16 67V33L50 15Z" 
        fill="url(#goldGrad)" 
        fillOpacity="0.03" 
        stroke="url(#orangeGrad)" 
        strokeWidth="1.5" 
        strokeOpacity="0.25"
        strokeLinejoin="round"
      />
      
      {/* 3D Inner Box Shading Panels */}
      <path d="M50 15V48L84 33M50 48L16 33" stroke="url(#orangeGrad)" strokeWidth="1.2" strokeOpacity="0.15" />

      {/* The Sleek High-Tech Wrench (The "Simple Tool") */}
      {/* Closed Ring (Bottom) */}
      <circle 
        cx="50" 
        cy="72" 
        r="11" 
        stroke="url(#orangeGrad)" 
        strokeWidth="5" 
        fill="none"
        filter="url(#glowFilter)"
      />
      <circle cx="50" cy="72" r="4.5" fill="#0B1329" />
      
      {/* Wrench Handle/Shaft */}
      <rect 
        x="44" 
        y="42" 
        width="12" 
        height="22" 
        rx="5" 
        fill="url(#orangeGrad)" 
      />
      {/* Dynamic 3D Inner Handle Ridge */}
      <rect 
        x="47.5" 
        y="45" 
        width="5" 
        height="16" 
        rx="2.5" 
        fill="url(#goldGrad)" 
        opacity="0.9"
      />

      {/* Open-Ended Wrench Head (Top) */}
      <path 
        d="M 36 30 A 14 14 0 1 0 64 30 L 58 35 L 58 40 L 42 40 L 42 35 Z" 
        fill="url(#orangeGrad)" 
        filter="url(#glowFilter)"
      />
      
      {/* The Central Glowing AI Sparkle Nestled inside the Wrench */}
      <path 
        d="M 50 14 Q 50 24 40 24 Q 50 24 50 34 Q 50 24 60 24 Q 50 24 50 14 Z" 
        fill="url(#goldGrad)" 
        filter="url(#glowFilter)"
      />
      <path 
        d="M 50 18 Q 50 24 44 24 Q 50 24 50 30 Q 50 24 56 24 Q 50 24 50 18 Z" 
        fill="#FFFFFF" 
      />

      {/* Auxiliary Glowing AI Sparkles floating in the Trove background */}
      {/* Mid-Right Sparkle */}
      <path 
        d="M 74 46 Q 74 52 68 52 Q 74 52 74 58 Q 74 52 80 52 Q 74 52 74 46 Z" 
        fill="url(#goldGrad)" 
        opacity="0.8"
        filter="url(#glowFilter)"
      />
      {/* Bottom-Left Sparkle */}
      <path 
        d="M 26 52 Q 26 57 21 57 Q 26 57 26 62 Q 26 57 31 57 Q 26 57 26 52 Z" 
        fill="url(#goldGrad)" 
        opacity="0.8"
        filter="url(#glowFilter)"
      />

      {/* Micro-nodes (Small floating technical data points for premium feel) */}
      <circle cx="50" cy="72" r="1.5" fill="#FFFFFF" />
      <circle cx="74" cy="52" r="1" fill="#FFFFFF" />
      <circle cx="26" cy="57" r="1" fill="#FFFFFF" />

      {/* Premium Gradients & Shaders */}
      <defs>
        {/* Glow effect filter */}
        <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Deep Navy Linear Gradient */}
        <linearGradient id="navyGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B1329" />
          <stop offset="0.6" stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        {/* Premium Orange Gradient */}
        <linearGradient id="orangeGrad" x1="28" y1="20" x2="72" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A00" />
          <stop offset="0.5" stopColor="#FF5C1A" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>

        {/* Golden Secondary Gradient */}
        <linearGradient id="goldGrad" x1="40" y1="14" x2="60" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD043" />
          <stop offset="1" stopColor="#FF5C1A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Main horizontal BrandLogo Component
 * Renders the custom Icon side-by-side with premium typography.
 */
export function BrandLogo({ className = "h-8", iconClassName = "w-8 h-8", lightMode = false }) {
  return (
    <div className={`flex items-center gap-3 select-none ${lightMode ? 'text-white' : 'text-slate-900'}`}>
      <LogoIcon className={iconClassName} />
      <span className="text-xl font-black tracking-tight uppercase font-sans">
        TOOL<span className="text-[#ff5c1a]">TROVE</span>
      </span>
    </div>
  );
}
