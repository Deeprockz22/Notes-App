import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Sparkles, RefreshCw, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANIONS } from '../../utils/companionPresets';

const PRODUCTIVITY_DIALOGUES = [
  {
    speaker: '🦉 Archimedes',
    role: 'Cognitive Scientist',
    quote: "Working memory can only hold 4 chunks of info. Offload thoughts to your Brain Dump section to free up creative RAM!",
    tag: 'Neuroscience'
  },
  {
    speaker: '🦖 Neo',
    role: 'Flow Sprint Champion',
    quote: "Dopamine follows momentum, not motivation. Just focus for the first 2 minutes and the flow state takes over!",
    tag: 'Flow State'
  },
  {
    speaker: '🐱 Luna',
    role: 'Zen Tactician',
    quote: "The Zeigarnik effect causes mental drag for unfinished tasks. Writing them down closes the open loop in your brain.",
    tag: 'Task Clarity'
  },
  {
    speaker: '🚀 Cosmo',
    role: 'Orbit Commander',
    quote: "Single-tasking executes 2.5x faster than multitasking. Zero context switching means pure lightspeed output.",
    tag: 'Deep Work'
  },
  {
    speaker: '🤖 Byte',
    role: 'System Optimizer',
    quote: "Pomodoro rhythm works because it synchronizes with your brain's natural 25-90 minute ultradian cycles.",
    tag: 'Rhythm'
  },
  {
    speaker: '🐉 Pyro',
    role: 'Momentum Beast',
    quote: "Guard your deep work hours like a dragon guards gold. Turn off notifications and let nothing interrupt your fire!",
    tag: 'Protection'
  },
  {
    speaker: '👻 Spooky',
    role: 'Phantom Whisperer',
    quote: "The fear of starting is an illusion. Once you type the first word, the deadline monster disappears into thin air.",
    tag: 'Anti-Procrastination'
  }
];

export default function ZenLinearCrewScene({
  progress = 0,
  activeCompanionId = 'dino',
  onSelectCompanion,
  mode = 'work'
}) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isCheering, setIsCheering] = useState(false);

  // Cycle dialogue automatically every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDialogueIndex((prev) => (prev + 1) % PRODUCTIVITY_DIALOGUES.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const currentDialogue = PRODUCTIVITY_DIALOGUES[dialogueIndex];
  const activeCompanion = COMPANIONS.find((c) => c.id === activeCompanionId) || COMPANIONS[0];

  const triggerNextDialogue = (e) => {
    e?.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % PRODUCTIVITY_DIALOGUES.length);
    setIsCheering(true);
    setTimeout(() => setIsCheering(false), 600);

    // Subtle celebration confetti
    confetti({
      particleCount: 18,
      spread: 45,
      origin: { y: 0.65, x: Math.max(0.2, Math.min(0.8, progress / 100)) },
      colors: ['#22c55e', '#3b82f6', '#ec4899', '#f59e0b']
    });
  };

  // Clamp runner position so sprite stays cleanly inside boundaries
  const runnerLeftPercent = Math.min(96, Math.max(4, progress));

  return (
    <div className="zen-linear-crew-scene" aria-label="Productivity Characters Scene">
      {/* 💬 Productivity Dialogue Speech Bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={dialogueIndex}
          initial={{ opacity: 0, y: 8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.22 }}
          className="zen-dialogue-bubble"
          onClick={triggerNextDialogue}
          title="Click for next productivity tip"
        >
          <div className="dialogue-header">
            <span className="dialogue-speaker">{currentDialogue.speaker}</span>
            <span className="dialogue-tag">{currentDialogue.tag}</span>
            <button
              className="dialogue-refresh-btn"
              onClick={triggerNextDialogue}
              aria-label="Next tip"
            >
              <RefreshCw size={12} />
            </button>
          </div>
          <p className="dialogue-quote">“{currentDialogue.quote}”</p>
          <div className="dialogue-pointer" />
        </motion.div>
      </AnimatePresence>

      {/* 🏃 Characters Walking on the Linear Track */}
      <div className="zen-linear-track-wrapper">
        {/* Milestone Flags */}
        <div className="track-milestone milestone-25" title="25% - Warming Up">
          <span>25%</span>
        </div>
        <div className="track-milestone milestone-50" title="50% - Halfway Peak Flow">
          <span>50%</span>
        </div>
        <div className="track-milestone milestone-75" title="75% - Final Push">
          <span>75%</span>
        </div>

        {/* Linear Progress Bar */}
        <div className="zen-progress-bar-container">
          <div
            className="zen-progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 🦖 Moving Runner Mascot Character on the progress front */}
        <motion.div
          className={`zen-runner-mascot ${isCheering ? 'cheering' : ''}`}
          style={{ left: `${runnerLeftPercent}%` }}
          animate={{
            y: [0, -6, 0],
            rotate: isCheering ? [0, -10, 10, 0] : [0, 2, -2, 0]
          }}
          transition={{
            y: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
            rotate: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
          }}
          onClick={triggerNextDialogue}
          title={`${activeCompanion.name} (Click to cheer!)`}
        >
          <div className="runner-sprite-wrapper">
            <span className="runner-icon">{activeCompanion.icon}</span>
            <span className="runner-name-tag">{activeCompanion.name}</span>
          </div>
        </motion.div>

        {/* 🏁 Goal Line Mascot (Mentor / Goal Post) */}
        <div
          className="zen-finish-mascot"
          title="Goal Finish Line • 100% Flow Victory"
          onClick={triggerNextDialogue}
        >
          <span className="finish-flag">🏁</span>
          <span className="finish-mentor">🦉</span>
        </div>
      </div>

      {/* 👥 Quick Companion Switcher Crew Bar */}
      <div className="zen-crew-switcher-row">
        <span className="crew-label">CREW:</span>
        <div className="crew-avatars">
          {COMPANIONS.map((companion) => {
            const isSelected = companion.id === activeCompanionId;
            return (
              <button
                key={companion.id}
                onClick={() => onSelectCompanion && onSelectCompanion(companion.id)}
                className={`crew-avatar-btn ${isSelected ? 'active-crew' : ''}`}
                title={`Switch runner to ${companion.name}`}
              >
                <span>{companion.icon}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
