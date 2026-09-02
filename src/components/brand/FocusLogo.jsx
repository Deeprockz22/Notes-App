import React from 'react';

/**
 * Minimalist Vector Logo for FOCUS (Dual Overlapping Flow Rings)
 * Precise geometric reproduction of the official minimalist brand mark.
 */
export default function FocusLogo({ size = 26, className = '', strokeWidth = 2.4 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`focus-brand-logo ${className}`}
      aria-label="phocus Logo"
    >
      {/* Top Flow Ring */}
      <circle
        cx="24"
        cy="17"
        r="9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Bottom Overlapping Flow Ring */}
      <circle
        cx="24"
        cy="27"
        r="9"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Left Modernist Stem */}
      <line
        x1="15"
        y1="27"
        x2="15"
        y2="42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
