import React, { useEffect, useState } from 'react';
import { Minimize2, Play, Pause, RotateCcw } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import BlurText from '../react-bits/BlurText';
import ShinyText from '../react-bits/ShinyText';

const FOCUS_QUOTES = [
  "Focus is a muscle. The more you practice, the stronger it gets.",
  "Deep work is the ability to focus without distraction on a cognitively demanding task.",
  "One task at a time. Maximum clarity, zero noise.",
  "Small steps every day lead to monumental achievements.",
  "Where attention goes, energy flows and results show.",
  "Simplicity is the ultimate sophistication."
];

export default function FullscreenZenMode({
  isOpen,
  onClose,
  timeLeft,
  totalDuration,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
  mode
}) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setQuoteIndex((prev) => (prev + 1) % FOCUS_QUOTES.length);
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;

  return (
    <div className="fullscreen-zen-overlay">
      <div className="fullscreen-top-bar">
        <div className="zen-brand">
          <ShinyText text="ZEN FOCUS" speed={3} />
        </div>
        <button
          className="icon-btn zen-close-btn"
          onClick={onClose}
          title="Exit Fullscreen (Esc)"
        >
          <Minimize2 size={20} />
        </button>
      </div>

      <div className="fullscreen-center-content">
        <div className="zen-mode-tag">
          {mode === 'work' ? 'DEEP WORK' : 'RECHARGE BREAK'}
        </div>

        <div className="zen-digits">{formattedTime}</div>

        <div className="zen-progress-bar-container">
          <div className="zen-progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="zen-quote-container">
          <BlurText
            key={quoteIndex}
            text={FOCUS_QUOTES[quoteIndex]}
            delay={30}
            animateBy="words"
            className="zen-quote-text"
          />
        </div>

        <div className="zen-controls">
          <MagnetButton
            className="btn-action primary zen-main-btn"
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </MagnetButton>

          <MagnetButton className="btn-action secondary zen-reset-btn" onClick={resetTimer}>
            <RotateCcw size={18} />
          </MagnetButton>
        </div>
      </div>
    </div>
  );
}
