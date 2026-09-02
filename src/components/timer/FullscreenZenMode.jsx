import React, { useEffect, useState } from 'react';
import { Minimize2, Play, Pause, RotateCcw, Sparkles, MessageSquare } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import ShinyText from '../react-bits/ShinyText';
import ZenLinearCrewScene from './ZenLinearCrewScene';
import AmbientCompanionUniverse from './AmbientCompanionUniverse';
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
  mode = 'work',
  theme,
  companionType = 'dino',
  setCompanionType
}) {
  // Automatically enable Ambient Living Universe for chill mode, or allow toggle
  const [showUniverse, setShowUniverse] = useState(mode === 'chill');

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

  return (
    <div className={`fullscreen-zen-overlay ${showUniverse ? 'ambient-universe-active' : ''}`}>
      {/* 🌌 Ambient Living Companion Universe (Multiple Chit-Chat Clusters) */}
      {showUniverse && (
        <AmbientCompanionUniverse isRunning={isRunning} progress={progress} />
      )}

      <div className="fullscreen-top-bar">
        <div className="zen-brand">
          <FocusLogo size={22} className="brand-logo-icon" />
          <ShinyText text={mode === 'chill' ? 'CHILL LOUNGE' : 'PHOCUS ZEN'} speed={3} />
        </div>

        <div className="zen-top-actions">
          {/* Ambient Universe Toggle */}
          <button
            className={`icon-btn zen-universe-toggle-btn ${showUniverse ? 'active-universe' : ''}`}
            onClick={() => setShowUniverse((prev) => !prev)}
            title={showUniverse ? 'Hide Companion Universe' : 'Show 50+ Ambient Companion Chats'}
          >
            <Sparkles size={16} />
            <span className="zen-btn-label">Universe</span>
          </button>

          <button
            className="icon-btn zen-close-btn"
            onClick={onClose}
            title="Exit Fullscreen (Esc)"
          >
            <Minimize2 size={20} />
          </button>
        </div>
      </div>

      <div className="fullscreen-center-content">
        <div className="zen-mode-tag">
          {mode === 'chill'
            ? 'RELAX & CHILL • 30 MIN LOUNGE'
            : mode === 'work'
            ? 'DEEP WORK FOCUS'
            : 'RECHARGE BREAK'}
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
