import React from 'react';

/**
 * Minimalist Vector Logo for FOCUS
 * Concept: Geometric continuous focal ring with precision crosshair F glyph
 */
export default function FocusLogo({ size = 28, className = '', strokeWidth = 2.2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`focus-brand-logo ${className}`}
      aria-label="FOCUS Logo"
    >
      {/* Outer Focal Ring */}
      <circle
        cx="24"
        cy="24"
        r="18"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className="logo-outer-ring"
      />

      {/* Precision Inner Crosshair Target */}
      <circle
        cx="24"
        cy="24"
        r="7"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.8}
        strokeDasharray="2 4"
        className="logo-inner-ring"
      />

      {/* Minimalist Stem & Crossbars forming 'F' */}
      <line
        x1="18"
        y1="14"
        x2="18"
        y2="34"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="16"
        x2="32"
        y2="16"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />
      <line
        x1="18"
        y1="24"
        x2="28"
        y2="24"
        stroke="currentColor"
        strokeWidth={strokeWidth * 1.2}
        strokeLinecap="round"
      />

      {/* Ambient Central Focus Core */}
      <circle cx="24" cy="24" r="2.2" fill="currentColor" className="logo-center-dot" />
    </svg>
  );
}
