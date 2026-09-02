import React, { useEffect, useState } from 'react';
import { Minimize2, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import ShinyText from '../react-bits/ShinyText';
import FogSphere from '../react-bits/FogSphere';
import ZenLinearCrewScene from './ZenLinearCrewScene';
import AmbientCompanionUniverse from './AmbientCompanionUniverse';
import FocusLogo from '../brand/FocusLogo';

const ZEN_BG_PRESETS = [
  { id: 'auto', label: 'Auto', icon: '✨' },
  { id: 'fog', label: 'Fog Sphere', icon: '🔮' },
  { id: 'space', label: 'Cosmic', icon: '🌌' },
  { id: 'forest', label: 'Forest', icon: '🌲' },
  { id: 'sunset', label: 'Sunset', icon: '🌅' },
  { id: 'cafe', label: 'Cafe', icon: '☕' },
  { id: 'oled', label: 'OLED', icon: '🖤' }
];

function getFogColors(mode, zenBg) {
  if (zenBg === 'forest') return { core: '#16a34a', glow: '#34d399' };
  if (zenBg === 'sunset') return { core: '#f97316', glow: '#ec4899' };
  if (zenBg === 'cafe') return { core: '#d97706', glow: '#fbbf24' };
  if (zenBg === 'space') return { core: '#9333ea', glow: '#3b82f6' };

  // Mode-adaptive colors
  switch (mode) {
    case 'work':
      return { core: '#0284c7', glow: '#38bdf8' }; // Cyan & Electric Blue
    case 'shortBreak':
      return { core: '#059669', glow: '#34d399' }; // Mint & Emerald Dawn
    case 'longBreak':
      return { core: '#d97706', glow: '#f43f5e' }; // Sunset Amber & Rose
    case 'chill':
    default:
      return { core: '#9333ea', glow: '#6366f1' }; // Astral Violet & Indigo
  }
}

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
  const fogColors = getFogColors(mode, zenBg);
  const showFogSphere = zenBg !== 'oled';

  return (
    <div
      className={`fullscreen-zen-overlay zen-bg-${zenBg} mode-${mode} ${
        showUniverse ? 'ambient-universe-active' : ''
      }`}
      data-mode={mode}
    >
      {/* 🔮 Volumetric Ray-Marched Fog Sphere (React Bits Component) */}
      {showFogSphere && (
        <FogSphere
          coreColor={fogColors.core}
          glowColor={fogColors.glow}
          sphereRadius={1.75}
          rotationSpeed={0.5}
          opacity={zenBg === 'fog' ? 0.95 : 0.4}
          brightness={zenBg === 'fog' ? 1.25 : 1.05}
          rayMarchSteps={20}
          turbulenceIters={4}
        />
      )}

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
