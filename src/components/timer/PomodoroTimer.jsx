import React, { useState } from 'react';
import { Play, Pause, RotateCcw, SkipForward, Flame, Target, Sparkles, Volume2 } from 'lucide-react';
import MagnetButton from '../react-bits/MagnetButton';
import DecryptedText from '../react-bits/DecryptedText';
import SpotlightCard from '../react-bits/SpotlightCard';
import FocusCompanion from '../companion/FocusCompanion';
import StreakBadge from '../companion/StreakBadge';
import AmbientSoundscapes from '../ambient/AmbientSoundscapes';

const PRESETS = [
  { label: '15m', duration: 15 * 60 },
  { label: '25m', duration: 25 * 60 },
  { label: '45m', duration: 45 * 60 },
  { label: '60m', duration: 60 * 60 }
];

export default function PomodoroTimer({
  timeLeft,
  totalDuration,
  isRunning,
  mode,
  setMode,
  startTimer,
  pauseTimer,
  resetTimer,
  skipTimer,
  setCustomDuration,
  sessionsCompleted,
  totalFocusMinutes,
  xp = 0,
  companionType = 'dino',
  onOpenPicker,
  theme = 'dark'
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState(Math.floor(totalDuration / 60));

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
  const waterHeight = Math.max(5, 100 - progress);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const val = parseInt(editMinutes, 10);
    if (!isNaN(val) && val > 0 && val <= 180) {
      setCustomDuration(val * 60);
    }
    setIsEditing(false);
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'work':
        return 'Deep Focus Session';
      case 'shortBreak':
        return 'Quick Refresh Break';
      case 'longBreak':
        return 'Restorative Long Break';
      default:
        return 'Focus Session';
    }
  };

  return (
    <div className="timer-view">
      {/* Top XP & Level Bar */}
      <div className="timer-top-xp-row">
        <StreakBadge xp={xp} sessions={sessionsCompleted} />
      </div>

      {/* Interactive Companion Mascot & Dialogue */}
      <FocusCompanion
        state={isRunning ? 'working' : mode === 'work' ? 'idle' : 'breakTime'}
        sessionsCompleted={sessionsCompleted}
        streak={sessionsCompleted}
        theme={theme}
        companionType={companionType}
        onOpenPicker={onOpenPicker}
      />

      {/* Mode Selector */}
      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === 'work' ? 'active' : ''}`}
          onClick={() => setMode('work')}
        >
          <Target size={15} />
          <span>Work</span>
        </button>
        <button
          className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`}
          onClick={() => setMode('shortBreak')}
        >
          <Sparkles size={15} />
          <span>Short Break</span>
        </button>
        <button
          className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`}
          onClick={() => setMode('longBreak')}
        >
          <Flame size={15} />
          <span>Long Break</span>
        </button>
      </div>

      {/* Preset Pills */}
      <div className="preset-pills">
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            className={`preset-pill ${totalDuration === preset.duration ? 'active' : ''}`}
            onClick={() => setCustomDuration(preset.duration)}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Central Dial & Visualizer */}
      <div className="timer-visualizer-container">
        <div className={`timer-dial-wrapper ${isRunning ? 'running' : ''}`}>
          {/* Water Tank Animation */}
          <div className="water-tank-circle">
            <div
              className="water-fill"
              style={{
                height: `${waterHeight}%`,
                transition: isRunning ? 'height 1s linear' : 'height 0.4s ease'
              }}
            >
              <div className="water-wave wave-1" />
              <div className="water-wave wave-2" />
            </div>
          </div>

          {/* SVG Circular Ring */}
          <svg className="timer-svg-ring" viewBox="0 0 280 280">
            <circle
              className="ring-bg"
              cx="140"
              cy="140"
              r="125"
              strokeWidth="6"
            />
            <circle
              className="ring-progress"
              cx="140"
              cy="140"
              r="125"
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 125}
              strokeDashoffset={2 * Math.PI * 125 * (1 - progress / 100)}
            />
          </svg>

          {/* Center Content */}
          <div className="timer-inner-content">
            <div className="mode-badge">
              <DecryptedText
                text={getModeTitle()}
                speed={30}
                maxIterations={8}
                className="mode-badge-text"
              />
            </div>

            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="timer-edit-form">
                <input
                  type="number"
                  min="1"
                  max="180"
                  value={editMinutes}
                  onChange={(e) => setEditMinutes(e.target.value)}
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                  className="timer-edit-input"
                />
                <span className="timer-edit-label">min</span>
              </form>
            ) : (
              <div
                className="timer-digits"
                onClick={() => {
                  if (!isRunning) {
                    setEditMinutes(Math.floor(timeLeft / 60));
                    setIsEditing(true);
                  }
                }}
                title={isRunning ? undefined : 'Click to adjust minutes'}
              >
                {formatTime(timeLeft)}
              </div>
            )}

            <div className="timer-subtext">
              {isRunning ? (
                <span className="pulsing-text">⚡ Stay in flow</span>
              ) : (
                <span>Click digits to edit</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Action Controls */}
      <div className="timer-controls">
        <MagnetButton
          className={`btn-action primary ${isRunning ? 'btn-running' : ''}`}
          onClick={isRunning ? pauseTimer : startTimer}
          aria-label={isRunning ? 'Pause Timer' : 'Start Timer'}
        >
          {isRunning ? (
            <>
              <Pause size={18} />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>Start Focus</span>
            </>
          )}
        </MagnetButton>

        <MagnetButton
          className="btn-action secondary"
          onClick={resetTimer}
          aria-label="Reset Timer"
          title="Reset"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </MagnetButton>

        <MagnetButton
          className="btn-action secondary"
          onClick={skipTimer}
          aria-label="Skip to next session"
          title="Skip"
        >
          <SkipForward size={18} />
          <span>Skip</span>
        </MagnetButton>
      </div>

      {/* Procedural Ambient Soundscapes (Rain, White Noise, Alpha Beats) */}
      <AmbientSoundscapes />

      {/* Stats Cards with Spotlight */}
      <div className="stats-row">
        <SpotlightCard className="stat-card">
          <div className="stat-header">
            <Target size={16} className="stat-icon" />
            <span className="stat-label">Sessions Completed</span>
          </div>
          <div className="stat-value">{sessionsCompleted}</div>
        </SpotlightCard>

        <SpotlightCard className="stat-card">
          <div className="stat-header">
            <Flame size={16} className="stat-icon" />
            <span className="stat-label">Total Focus Time</span>
          </div>
          <div className="stat-value">{totalFocusMinutes} <span className="stat-unit">mins</span></div>
        </SpotlightCard>
      </div>
    </div>
  );
}
