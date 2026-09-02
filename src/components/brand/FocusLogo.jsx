import React from 'react';

/**
 * ⚡ ZENCUS VECTOR BRAND LOGO
 * Iconic fusion of:
 * 1. Zen Ensō Ring (Harmonious circular flow)
 * 2. Precision Modernist "Z" (The Zencus mark)
 * 3. Central Focus Core (Pinpoint attention & clarity)
 */
export default function FocusLogo({ size = 26, className = '', strokeWidth = 2.6 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`focus-brand-logo zencus-brand-logo ${className}`}
      aria-label="Zencus Logo"
    >
      <defs>
        <linearGradient id="zencusLogoGrad" x1="12" y1="12" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--accent-primary, #38bdf8)" />
          <stop offset="100%" stopColor="var(--accent-hover, #6366f1)" />
        </linearGradient>
      </defs>

      {/* 1. Outer Zen Ensō Flow Ring with subtle cosmic opening */}
      <circle
        cx="24"
        cy="24"
        r="19"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray="105 14"
        opacity="0.85"
      />

      {/* 2. Precision Modernist "Z" Path */}
      <path
        d="M 16 16.5 H 32 L 16 31.5 H 32"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. Central Focus Core Nexus (Aperture Dot) */}
      <circle
        cx="24"
        cy="24"
        r="4.2"
        fill="currentColor"
      />
      <circle
        cx="24"
        cy="24"
        r="2"
        fill="#09090b"
      />
    </svg>
  );
}
