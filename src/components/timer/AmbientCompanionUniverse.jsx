import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMAL_CHARACTERS, SAGA_TOPICS, getSagaForTopic } from '../../utils/companionConversations';

// 10 simultaneous cluster anchors covering all 10 distinct 30-minute sagas
const CLUSTER_ANCHORS = [
  { id: 'c-top-left', top: '12%', left: '6%', topic: 'planets' },
  { id: 'c-top-mid-left', top: '10%', left: '28%', topic: 'funny' },
  { id: 'c-top-mid-right', top: '10%', right: '28%', topic: 'dreams' },
  { id: 'c-top-right', top: '12%', right: '6%', topic: 'ghosts' },
  { id: 'c-mid-left', top: '44%', left: '5%', topic: 'serious' },
  { id: 'c-mid-right', top: '44%', right: '5%', topic: 'food' },
  { id: 'c-bottom-left', bottom: '14%', left: '7%', topic: 'chill' },
  { id: 'c-bottom-mid-left', bottom: '10%', left: '28%', topic: 'space_mysteries' },
  { id: 'c-bottom-mid-right', bottom: '10%', right: '28%', topic: 'ancient' },
  { id: 'c-bottom-right', bottom: '14%', right: '7%', topic: 'ocean' }
];

export default function AmbientCompanionUniverse({ isRunning, progress = 0 }) {
  // 10 Simultaneous animal clusters mapped to their 30-minute sagas
  const [clusters, setClusters] = useState(() => {
    return CLUSTER_ANCHORS.map((anchor, idx) => {
      const saga = getSagaForTopic(anchor.topic);
      // Assign two distinctive animals facing each other
      const animalA = ANIMAL_CHARACTERS[(idx * 2) % ANIMAL_CHARACTERS.length];
      const animalB = ANIMAL_CHARACTERS[(idx * 2 + 1) % ANIMAL_CHARACTERS.length];

      return {
        ...anchor,
        saga,
        turn: 0,
        animals: [animalA, animalB]
      };
    });
  });

  // Background stars
  const [stars] = useState(() => {
    return Array.from({ length: 55 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 1,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 2.5
    }));
  });

  // Continuous 30-minute dialogue progression: Step line every 9.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setClusters((prevClusters) => {
        return prevClusters.map((cluster) => {
          const totalLines = cluster.saga.dialogues.length;
          const nextTurn = (cluster.turn + 1) % totalLines;

          // Seamless loop or visitor rotation
          const newAnimals = [...cluster.animals];
          if (nextTurn === 0 && Math.random() > 0.4) {
            const visitor = ANIMAL_CHARACTERS[Math.floor(Math.random() * ANIMAL_CHARACTERS.length)];
            newAnimals[1] = visitor;
          }

          return {
            ...cluster,
            turn: nextTurn,
            animals: newAnimals
          };
        });
      });
    }, 9500); // 9.5 seconds per line for calm, readable 30-minute flow

    return () => clearInterval(interval);
  }, []);

  const handleClusterClick = (clusterId, e) => {
    e?.stopPropagation();
    setClusters((prev) =>
      prev.map((c) => {
        if (c.id === clusterId) {
          const nextTurn = (c.turn + 1) % c.saga.dialogues.length;
          return { ...c, turn: nextTurn };
        }
        return c;
      })
    );

    // Mini celebration confetti
    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) {
      confetti({
        particleCount: 14,
        spread: 40,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#38bdf8', '#a855f7', '#f43f5e', '#22c55e', '#f59e0b']
      });
    }
  };

  return (
    <div className="ambient-universe-stage" aria-label="Ambient Living Animal Universe">
      {/* 🌌 Ambient Starfield */}
      <div className="ambient-starfield">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="ambient-star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size
            }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* 🧭 Active Ambient Channel Header */}
      <div className="ambient-status-badge">
        <span className="ambient-pulse-dot" />
        <span className="ambient-badge-label">ANIMAL UNIVERSE • 10 LIVE 30-MIN SAGAS</span>
      </div>

      {/* 🐾 10 Simultaneous Animal Conversational Clusters */}
      {clusters.map((cluster) => {
        const currentDialogue = cluster.saga.dialogues[cluster.turn] || cluster.saga.dialogues[0];
        const speakerName = currentDialogue.speaker;

        const posStyle = {
          top: cluster.top,
          bottom: cluster.bottom,
          left: cluster.left,
          right: cluster.right
        };

        return (
          <motion.div
            key={cluster.id}
            className="ambient-cluster-node"
            style={posStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleClusterClick(cluster.id, e)}
            title={`Topic: ${cluster.saga.title} (Click to skip line)`}
          >
            {/* 💬 Tiny, Crisp, Ultra-Readable Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cluster.saga.id}-${cluster.turn}`}
                initial={{ opacity: 0, y: 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="ambient-tiny-bubble"
              >
                <div className="tiny-bubble-header">
                  <span className="tiny-speaker-name">{speakerName}</span>
                  <span className="tiny-topic-tag">{cluster.saga.tag}</span>
                </div>
                <p className="tiny-bubble-text">{currentDialogue.text}</p>
                <div className="tiny-bubble-tail" />
              </motion.div>
            </AnimatePresence>

            {/* 🐾 Two Animals Facing Each Other Nose-to-Nose */}
            <div className="ambient-cluster-sprites facing-pair">
              {/* Left Animal (Faces Right) */}
              {cluster.animals[0] && (() => {
                const isSpeaking = speakerName.includes(cluster.animals[0].name);
                return (
                  <motion.div
                    className={`ambient-sprite animal-left ${isSpeaking ? 'active-speaking' : ''}`}
                    animate={{
                      y: [0, -4, 0],
                      scale: isSpeaking ? 1.15 : 1
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <span className="sprite-icon face-right">{cluster.animals[0].icon}</span>
                    <span className="sprite-mini-badge">{cluster.animals[0].name}</span>
                    {isSpeaking && <span className="ambient-talking-flare" />}
                  </motion.div>
                );
              })()}

              {/* Center Talking Spark */}
              <span className="facing-gap-spark">💬</span>

              {/* Right Animal (Faces Left towards Left Animal) */}
              {cluster.animals[1] && (() => {
                const isSpeaking = speakerName.includes(cluster.animals[1].name);
                return (
                  <motion.div
                    className={`ambient-sprite animal-right ${isSpeaking ? 'active-speaking' : ''}`}
                    animate={{
                      y: [0, -4, 0],
                      scale: isSpeaking ? 1.15 : 1
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: 2.2, delay: 0.35, ease: 'easeInOut' },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <span className="sprite-icon face-left">{cluster.animals[1].icon}</span>
                    <span className="sprite-mini-badge">{cluster.animals[1].name}</span>
                    {isSpeaking && <span className="ambient-talking-flare" />}
                  </motion.div>
                );
              })()}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
