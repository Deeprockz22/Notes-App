import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANIONS } from '../../utils/companionPresets';

const SUBTLE_PRODUCTIVITY_CONVERSATIONS = [
  {
    speakerA: { icon: '🦖', name: 'Neo' },
    speakerB: { icon: '🦉', name: 'Archimedes' },
    lineA: "How do we lock into flow?",
    lineB: "Eliminate friction. Write the first small sentence."
  },
  {
    speakerA: { icon: '🐱', name: 'Luna' },
    speakerB: { icon: '🦉', name: 'Archimedes' },
    lineA: "Brain feeling overloaded...",
    lineB: "Offload it to notes. Working memory only holds 4 items."
  },
  {
    speakerA: { icon: '🚀', name: 'Cosmo' },
    speakerB: { icon: '🦖', name: 'Neo' },
    lineA: "Distractions incoming at 3 o'clock!",
    lineB: "Shields up. Monotasking executes 2.5x faster."
  },
  {
    speakerA: { icon: '🤖', name: 'Byte' },
    speakerB: { icon: '🐱', name: 'Luna' },
    lineA: "Optimizing neural bandwidth...",
    lineB: "25-min sprints synchronize with ultradian brain rhythms."
  },
  {
    speakerA: { icon: '🐉', name: 'Pyro' },
    speakerB: { icon: '🚀', name: 'Cosmo' },
    lineA: "Ready to burn this backlog?",
    lineB: "Starting is 80% of the battle. Warp speed ahead!"
  },
  {
    speakerA: { icon: '👻', name: 'Spooky' },
    speakerB: { icon: '🦉', name: 'Archimedes' },
    lineA: "Fear of starting the hard task?",
    lineB: "Once you type the first word, fear dissolves."
  },
  {
    speakerA: { icon: '🦖', name: 'Neo' },
    speakerB: { icon: '🐱', name: 'Luna' },
    lineA: "Why write things down?",
    lineB: "To close open mental loops and stop the Zeigarnik drag."
  }
];

export default function ZenLinearCrewScene({
  progress = 0,
  activeCompanionId = 'dino',
  onSelectCompanion
}) {
  const [convoIndex, setConvoIndex] = useState(0);
  const [turn, setTurn] = useState(0); // 0 = speaker A, 1 = speaker B

  // Cycle conversation subtly
  useEffect(() => {
    const interval = setInterval(() => {
      setTurn((prevTurn) => {
        if (prevTurn === 0) {
          return 1;
        } else {
          setConvoIndex((prev) => (prev + 1) % SUBTLE_PRODUCTIVITY_CONVERSATIONS.length);
          return 0;
        }
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const currentConvo = SUBTLE_PRODUCTIVITY_CONVERSATIONS[convoIndex];
  const activeCompanion = COMPANIONS.find((c) => c.id === activeCompanionId) || COMPANIONS[0];

  // Secondary companion peer
  const partnerCompanion = COMPANIONS.find((c) => c.id !== activeCompanionId) || COMPANIONS[2];

  const speaker = turn === 0
    ? { icon: activeCompanion.icon, name: activeCompanion.name, text: currentConvo.lineA }
    : { icon: partnerCompanion.icon, name: partnerCompanion.name, text: currentConvo.lineB };

  const handleNextDialogue = () => {
    setTurn((prevTurn) => {
      if (prevTurn === 0) {
        return 1;
      } else {
        setConvoIndex((prev) => (prev + 1) % SUBTLE_PRODUCTIVITY_CONVERSATIONS.length);
        return 0;
      }
    });
  };

  // Clamped position for track traveler
  const runnerLeft = Math.min(94, Math.max(6, progress));

  return (
    <div className="zen-subtle-scene-container" aria-label="Subtle Companion Dialogue Scene">
      {/* 💬 Subtle Mini Speech Pill */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${convoIndex}-${turn}`}
          initial={{ opacity: 0, y: 4, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -4, scale: 0.97 }}
          transition={{ duration: 0.18 }}
          className="zen-subtle-bubble"
          onClick={handleNextDialogue}
          title="Click to next line"
        >
          <span className="bubble-speaker-avatar">{speaker.icon}</span>
          <span className="bubble-text">{speaker.text}</span>
        </motion.div>
      </AnimatePresence>

      {/* 🏃 2 Companions Standing Next to Each Other on the Linear Track */}
      <div className="zen-subtle-track-stage">
        {/* Track Milestones */}
        <div className="track-subtle-tick tick-25" title="25%">25%</div>
        <div className="track-subtle-tick tick-50" title="50%">50%</div>
        <div className="track-subtle-tick tick-75" title="75%">75%</div>

        {/* Linear Progress Bar */}
        <div className="zen-progress-bar-container">
          <div
            className="zen-progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 🦖🦉 Two Companions Standing Side by Side riding the progress */}
        <motion.div
          className="zen-duo-companions"
          style={{ left: `${runnerLeft}%` }}
          onClick={handleNextDialogue}
          title={`${activeCompanion.name} & ${partnerCompanion.name} having a productivity chat`}
        >
          {/* Companion A */}
          <motion.div
            className={`duo-sprite ${turn === 0 ? 'is-talking' : ''}`}
            animate={{
              y: [0, -3, 0],
              scale: turn === 0 ? 1.08 : 1
            }}
            transition={{
              y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
              scale: { duration: 0.2 }
            }}
          >
            <span className="duo-icon">{activeCompanion.icon}</span>
            {turn === 0 && <span className="talking-dot" />}
          </motion.div>

          {/* Companion B (Standing next to Companion A) */}
          <motion.div
            className={`duo-sprite ${turn === 1 ? 'is-talking' : ''}`}
            animate={{
              y: [0, -3, 0],
              scale: turn === 1 ? 1.08 : 1
            }}
            transition={{
              y: { repeat: Infinity, duration: 1.8, delay: 0.3, ease: 'easeInOut' },
              scale: { duration: 0.2 }
            }}
          >
            <span className="duo-icon">{partnerCompanion.icon}</span>
            {turn === 1 && <span className="talking-dot" />}
          </motion.div>
        </motion.div>

        {/* Goal Finish Post */}
        <div className="track-finish-flag" title="100% Finish Goal">
          <span>🏁</span>
        </div>
      </div>

      {/* Subtle Companion Picker Dots */}
      <div className="zen-subtle-crew-dots">
        {COMPANIONS.map((c) => (
          <button
            key={c.id}
            className={`subtle-dot-btn ${c.id === activeCompanionId ? 'active' : ''}`}
            onClick={() => onSelectCompanion && onSelectCompanion(c.id)}
            title={`Switch to ${c.name}`}
          >
            {c.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
