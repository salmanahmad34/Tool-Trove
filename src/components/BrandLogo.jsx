import React from 'react';

/**
 * Premium LogoIcon Component
 * Fuses an isometric digital toolbox/vault shape with abstract AI circuit paths forming a 'T'.
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
        d="M50 18L82 35V69L50 86L18 69V35L50 18Z" 
        fill="url(#goldGrad)" 
        fillOpacity="0.04" 
        stroke="url(#orangeGrad)" 
        strokeWidth="1.5" 
        strokeOpacity="0.3"
        strokeLinejoin="round"
      />
      
      {/* 3D Inner Box Shading Panels */}
      <path d="M50 18V52L82 35M50 52L18 35" stroke="url(#orangeGrad)" strokeWidth="1.2" strokeOpacity="0.2" />

      {/* Abstract AI Circuit 'T' Pathways */}
      {/* Top horizontal bar of T */}
      <path 
        d="M28 36H72" 
        stroke="url(#orangeGrad)" 
        strokeWidth="5.5" 
        strokeLinecap="round" 
        filter="url(#glowFilter)"
      />
      {/* Vertical stem of T */}
      <path 
        d="M50 36V66" 
        stroke="url(#orangeGrad)" 
        strokeWidth="5.5" 
        strokeLinecap="round"
        filter="url(#glowFilter)"
      />

      {/* Interconnecting Circuit Pathways (AI node links) */}
      <path d="M28 36V48L40 54" stroke="#ff5c1a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <path d="M72 36V48L60 54" stroke="#ff5c1a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <path d="M50 66L40 71" stroke="#ff5c1a" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      {/* Glowing Microprocessor Nodes */}
      <circle cx="28" cy="36" r="4.5" fill="#ffffff" stroke="#ff5c1a" strokeWidth="2" />
      <circle cx="72" cy="36" r="4.5" fill="#ffffff" stroke="#ff5c1a" strokeWidth="2" />
      <circle cx="50" cy="36" r="4" fill="#ffd043" />
      <circle cx="50" cy="66" r="4.5" fill="#ffffff" stroke="#ff5c1a" strokeWidth="2" />
      <circle cx="40" cy="54" r="2.5" fill="#ff5c1a" />
      <circle cx="60" cy="54" r="2.5" fill="#ff5c1a" />

      {/* Premium Gradients & Shaders */}
      <defs>
        {/* Glow effect filter */}
        <filter id="glowFilter" x="0" y="0" width="100" height="100" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
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
        <linearGradient id="orangeGrad" x1="28" y1="36" x2="72" y2="66" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF7A00" />
          <stop offset="0.5" stopColor="#FF5C1A" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>

        {/* Golden Secondary Gradient */}
        <linearGradient id="goldGrad" x1="18" y1="35" x2="82" y2="69" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB800" />
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
