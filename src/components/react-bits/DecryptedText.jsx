import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText Component from React Bits
 * Decodes text with rapid shuffling characters into the final string.
 */
export default function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  animateOn = 'change', // 'change' | 'hover' | 'both'
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : characters.split('');

  const shuffleText = (originalText, currentIteration) => {
    if (useOriginalCharsOnly) {
      const positions = originalText.split('').map((char, i) => ({
        char,
        isSpace: char === ' ',
        index: i,
        isCorrect: false
      }));

      if (sequential) {
        return positions
          .map((p, i) => {
            if (p.isSpace) return ' ';
            if (i < currentIteration) return originalText[i];
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      } else {
        return originalText
          .split('')
          .map((char) => {
            if (char === ' ') return ' ';
            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      }
    } else {
      return originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (currentIteration >= maxIterations) return originalText[i];
          if (sequential && i < (currentIteration / maxIterations) * originalText.length) {
            return originalText[i];
          }
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join('');
    }
  };

  const triggerAnimation = () => {
    setIsScrambling(true);
    iterationRef.current = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      iterationRef.current += 1;
      setDisplayText(shuffleText(text, iterationRef.current));

      if (iterationRef.current >= maxIterations) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'change' || animateOn === 'both') {
      triggerAnimation();
    }
    return () => clearInterval(intervalRef.current);
  }, [text]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(true);
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover' || animateOn === 'both') {
      setIsHovering(false);
    }
  };

  return (
    <span
      className={`decrypted-text-container ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={`decrypted-text ${className}`}>{displayText}</span>
    </span>
  );
}
