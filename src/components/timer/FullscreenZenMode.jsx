import React, { useEffect, useState } from 'react';
import { Minimize2, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import ShinyText from '../react-bits/ShinyText';
import ZenLinearCrewScene from './ZenLinearCrewScene';
import AmbientCompanionUniverse from './AmbientCompanionUniverse';
import FocusLogo from '../brand/FocusLogo';

const ZEN_BG_PRESETS = [
  { id: 'auto', label: 'Auto', icon: '✨' },
  { id: 'space', label: 'Cosmic', icon: '🌌' },
  { id: 'forest', label: 'Forest', icon: '🌲' },
  { id: 'sunset', label: 'Sunset', icon: '🌅' },
  { id: 'cafe', label: 'Cafe', icon: '☕' },
  { id: 'oled', label: 'OLED', icon: '🖤' }
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
  mode = 'work',
  theme,
  companionType = 'dino',
  setCompanionType
}) {
  // Automatically enable Ambient Living Universe for chill mode, or allow toggle
  const [showUniverse, setShowUniverse] = useState(mode === 'chill');

  // Background Scene Preset State (persisted)
  const [zenBg, setZenBg] = useState(() => {
    try {
      return localStorage.getItem('phocus_zen_bg') || 'auto';
    } catch {
      return 'auto';
    }
  });

  const cycleBackground = () => {
    setZenBg((current) => {
      const idx = ZEN_BG_PRESETS.findIndex((p) => p.id === current);
      const nextPreset = ZEN_BG_PRESETS[(idx + 1) % ZEN_BG_PRESETS.length];
      try {
        localStorage.setItem('phocus_zen_bg', nextPreset.id);
      } catch (e) {
        // ignore
      }
      return nextPreset.id;
    });
  };

  useEffect(() => {
    if (mode === 'chill') {
      setShowUniverse(true);
    }
  }, [mode]);

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

  const activeBgObj = ZEN_BG_PRESETS.find((p) => p.id === zenBg) || ZEN_BG_PRESETS[0];

  return (
    <div
      className={`fullscreen-zen-overlay zen-bg-${zenBg} mode-${mode} ${
        showUniverse ? 'ambient-universe-active' : ''
      }`}
      data-mode={mode}
    >
      {/* 🌌 Mode-Adaptive Atmospheric Aurora Glow Effects */}
      <div className="zen-mode-aurora-layer" />

      {/* 🌌 Ambient Living Companion Universe (20 Staggered Chit-Chat Clusters) */}
      {showUniverse && (
        <AmbientCompanionUniverse isRunning={isRunning} progress={progress} />
      )}

      <div className="fullscreen-top-bar">
        <div className="zen-brand">
          <FocusLogo size={22} className="brand-logo-icon" />
          <ShinyText text={mode === 'chill' ? 'CHILL LOUNGE' : 'PHOCUS ZEN'} speed={3} />
        </div>

        <div className="zen-top-actions">
          {/* Unified Glass Capsule Pill: Auto Background & Universe */}
          <div className="zen-control-pill-group">
            {/* Auto / Scene Switcher Button */}
            <button
              className={`zen-top-pill-btn zen-bg-picker-btn ${zenBg !== 'auto' ? 'custom-active' : ''}`}
              onClick={cycleBackground}
              title={`Background Scene: ${activeBgObj.label} (Click to switch)`}
            >
              <span className="zen-btn-icon">{activeBgObj.icon}</span>
              <span className="zen-btn-label">{activeBgObj.label}</span>
            </button>

            <div className="zen-pill-divider" />

            {/* Universe Toggle Button */}
            <button
              className={`zen-top-pill-btn zen-universe-toggle-btn ${showUniverse ? 'active-universe' : ''}`}
              onClick={() => setShowUniverse((prev) => !prev)}
              title={showUniverse ? 'Hide Companion Universe' : 'Show 20 Ambient Companion Chats'}
            >
              <Sparkles size={14} className="zen-sparkle-icon" />
              <span className="zen-btn-label">Universe</span>
              {showUniverse && <span className="zen-active-dot" />}
            </button>
          </div>

          {/* Close / Minimize Button */}
          <button
            className="icon-btn zen-close-btn"
            onClick={onClose}
            title="Exit Fullscreen (Esc)"
          >
            <Minimize2 size={18} />
          </button>
        </div>
      </div>

      <div className="fullscreen-center-content">
        <div className="zen-mode-tag">
          {mode === 'chill'
            ? 'RELAX & CHILL • 30 MIN LOUNGE'
            : mode === 'work'
            ? 'DEEP WORK FOCUS'
            : mode === 'shortBreak'
            ? 'QUICK REFRESH BREAK'
            : 'RESTORATIVE LONG BREAK'}
        </div>

        <div className="zen-digits">{formattedTime}</div>

        {/* 🏃 Duo Companions Subtle Conversation on the Linear Bar */}
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
