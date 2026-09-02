import React from 'react';

/**
 * Minimalist Vector Logo for FOCUS (Concept 2: Dual Overlapping Flow Rings)
 * Represents dual-mode harmony: Pomodoro Deep Work + Brain Dump Cognitive Offloading
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
      aria-label="FOCUS Logo"
    >
      {/* Top Flow Ring */}
      <circle
        cx="24"
        cy="17"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Bottom Overlapping Flow Ring */}
      <circle
        cx="24"
        cy="28"
        r="10"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Left Modernist Stem */}
      <line
        x1="14"
        y1="17"
        x2="14"
        y2="41"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
