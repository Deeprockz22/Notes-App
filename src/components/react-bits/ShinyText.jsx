import React from 'react';

/**
 * ShinyText Component from React Bits
 * Adds an elegant shimmering light effect moving across the text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 3,
  className = ''
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        backgroundImage: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.9) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        animationDuration: animationDuration
      }}
    >
      {text}
    </span>
  );
}
