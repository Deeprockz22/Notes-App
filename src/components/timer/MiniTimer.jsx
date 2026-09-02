import React from 'react';
import { Play, Pause, Clock } from 'lucide-react';

export default function MiniTimer({
  timeLeft,
  isRunning,
  startTimer,
  pauseTimer,
  onClick,
  mode
}) {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className="mini-timer-pill" onClick={onClick} title="Return to Timer">
      <span className={`mini-timer-dot ${isRunning ? 'pulse' : ''}`} />
      <span className="mini-timer-mode">{mode === 'work' ? 'Focus' : 'Break'}</span>
      <span className="mini-timer-digits">{formattedTime}</span>

      <button
        className="mini-timer-toggle"
        onClick={(e) => {
          e.stopPropagation();
          isRunning ? pauseTimer() : startTimer();
        }}
        aria-label={isRunning ? 'Pause' : 'Start'}
      >
        {isRunning ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
      </button>
    </div>
  );
}
