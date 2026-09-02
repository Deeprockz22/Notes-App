import React, { useEffect, useState } from 'react';
import { Minimize2, Play, Pause, RotateCcw } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import ShinyText from '../react-bits/ShinyText';
import ZenLinearCrewScene from './ZenLinearCrewScene';
import FocusLogo from '../brand/FocusLogo';

export default function FullscreenZenMode({
  isOpen,
  onClose,
  timeLeft,
  totalDuration,
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
  mode,
  theme,
  companionType = 'dino',
  setCompanionType
}) {
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
          <FocusLogo size={22} className="brand-logo-icon" />
          <ShinyText text="PHOCUS ZEN" speed={3} />
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
          {mode === 'work' ? 'DEEP WORK FOCUS' : 'RECHARGE BREAK'}
        </div>

        <div className="zen-digits">{formattedTime}</div>

        {/* 🏃 Productivity Characters Scene on the Linear Bar */}
        <ZenLinearCrewScene
          progress={progress}
          activeCompanionId={companionType}
          onSelectCompanion={setCompanionType}
          mode={mode}
        />

        {/* Controls */}
        <div className="zen-controls">
          <MagnetButton
            className="btn-action primary zen-main-btn"
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning ? <Pause size={22} /> : <Play size={22} fill="currentColor" />}
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </MagnetButton>

          <MagnetButton
            className="btn-action secondary zen-reset-btn"
            onClick={resetTimer}
            title="Reset Timer"
          >
            <RotateCcw size={18} />
          </MagnetButton>
        </div>
      </div>
    </div>
  );
}
