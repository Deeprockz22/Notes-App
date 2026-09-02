import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMAL_CHARACTERS, SAGA_TOPICS, getSagaForTopic } from '../../utils/companionConversations';
import { fetchDailyTrendingSaga } from '../../utils/trendingTopicsService';

// 20 simultaneous non-overlapping cluster anchors
// Strict Exclusion Zone: Center 32%-68% width and 24%-76% height is 100% clear for clock & linear bar!
const CLUSTER_ANCHORS = [
  // --- Left Outer Wing (6 clusters in safe corridor 2% - 14%) ---
  { id: 'c-left-1', top: '7%', left: '2%', topic: 'planets' },
  { id: 'c-left-2', top: '22%', left: '2.5%', topic: 'funny' },
  { id: 'c-left-3', top: '37%', left: '2%', topic: 'dreams' },
  { id: 'c-left-4', top: '52%', left: '2.5%', topic: 'cheating_husband' },
  { id: 'c-left-5', top: '67%', left: '2%', topic: 'ghosts' },
  { id: 'c-left-6', bottom: '4%', left: '2%', topic: 'ancient' },

  // --- Right Outer Wing (6 clusters in safe corridor 86% - 98%) ---
  { id: 'c-right-1', top: '7%', right: '2%', topic: 'serious' },
  { id: 'c-right-2', top: '22%', right: '2.5%', topic: 'food' },
  { id: 'c-right-3', top: '37%', right: '2%', topic: 'cheating_wife' },
  { id: 'c-right-4', top: '52%', right: '2.5%', topic: 'space_mysteries' },
  { id: 'c-right-5', top: '67%', right: '2%', topic: 'ocean' },
  { id: 'c-right-6', bottom: '4%', right: '2%', topic: 'chill' },

  // --- Top Gallery Over Timer (4 clusters at safe high elevation top: 5.5%) ---
  // c-top-wing-l is the EXCLUSIVE SINGLE live daily trending topic!
  { id: 'c-top-wing-l', top: '5.5%', left: '15%', topic: 'funny', isTrendingTarget: true },
  { id: 'c-top-over-l', top: '5.5%', left: '29%', topic: 'cheating_husband' },
  { id: 'c-top-over-r', top: '5.5%', right: '29%', topic: 'cheating_wife' },
  { id: 'c-top-wing-r', top: '5.5%', right: '15%', topic: 'funny' },

  // --- Low Bottom Gallery (4 clusters at safe low floor bottom: 3.5%) ---
  { id: 'c-bot-1', bottom: '3.5%', left: '14%', topic: 'food' },
  { id: 'c-bot-2', bottom: '3.5%', left: '28%', topic: 'dreams' },
  { id: 'c-bot-3', bottom: '3.5%', right: '28%', topic: 'planets' },
  { id: 'c-bot-4', bottom: '3.5%', right: '14%', topic: 'ghosts' }
];

export default function AmbientCompanionUniverse({ isRunning, progress = 0 }) {
  // Exactly 20 Simultaneous animal clusters: Each cluster has 2 dedicated companions facing each other
  const [clusters, setClusters] = useState(() => {
    return CLUSTER_ANCHORS.map((anchor, idx) => {
      const saga = getSagaForTopic(anchor.topic);
      // Pair 2 unique animal companions strictly dedicated to this cluster
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
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 2.5
    }));
  });

  // 🔄 Automatically fetch today's trending topics on load every day
  // Strictly assign to ONLY ONE cluster ('c-top-wing-l')
  useEffect(() => {
    let isMounted = true;
    fetchDailyTrendingSaga()
      .then((trendingSaga) => {
        if (!isMounted || !trendingSaga?.dialogues?.length) return;
        setClusters((prev) =>
          prev.map((cluster) => {
            // ONLY ONE cluster is the trending topic!
            if (cluster.id === 'c-top-wing-l') {
              return {
                ...cluster,
                saga: trendingSaga,
                turn: 0
              };
            }
            return cluster;
          })
        );
      })
      .catch((err) => console.log('Trending topics notice:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  // Continuous dialogue progression: Step line every 9.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setClusters((prevClusters) => {
        return prevClusters.map((cluster) => {
          const totalLines = cluster.saga.dialogues.length;
          const nextTurn = (cluster.turn + 1) % totalLines;

          return {
            ...cluster,
            turn: nextTurn
          };
        });
      });
    }, 9500); // Exactly 9.5 seconds per line for relaxing, hilarious pace

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
        <span className="ambient-badge-label">ANIMAL UNIVERSE • 20 LIVE CHANNELS • 1 TRENDING CHANNEL</span>
      </div>

      {/* 🐾 20 Simultaneous Non-Overlapping Animal Conversational Clusters */}
      {clusters.map((cluster) => {
        const currentDialogue = cluster.saga.dialogues[cluster.turn] || cluster.saga.dialogues[0];

        // STRICT TWO-COMPANION LOGIC:
        // role 'A' is strictly animal 0 (left), role 'B' is strictly animal 1 (right)
        const isLeftSpeaker = currentDialogue.role === 'A';
        const activeSpeaker = isLeftSpeaker ? cluster.animals[0] : cluster.animals[1];
        const speakerDisplayName = `${activeSpeaker.icon} ${activeSpeaker.name}`;
        const isLiveTrending = Boolean(cluster.saga.isLiveTrending);

        const posStyle = {
          top: cluster.top,
          bottom: cluster.bottom,
          left: cluster.left,
          right: cluster.right
        };

        return (
          <motion.div
            key={cluster.id}
            className={`ambient-cluster-node ${isLeftSpeaker ? 'speaker-left' : 'speaker-right'} ${
              isLiveTrending ? 'trending-node' : ''
            }`}
            style={posStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleClusterClick(cluster.id, e)}
            title={`Topic: ${cluster.saga.title} (Click to skip line)`}
          >
            {/* 💬 Tiny, Crisp, Compact Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cluster.saga.id}-${cluster.turn}`}
                initial={{ opacity: 0, y: 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`ambient-tiny-bubble ${isLiveTrending ? 'trending-bubble' : ''}`}
              >
                <div className="tiny-bubble-header">
                  <span className="tiny-speaker-name">{speakerDisplayName}</span>
                  <span className={`tiny-topic-tag ${isLiveTrending ? 'trending-tag' : ''}`}>
                    {cluster.saga.tag}
                  </span>
                </div>
                <p className="tiny-bubble-text">{currentDialogue.text}</p>
                {/* Directional Tail pointing to active companion */}
                <div className={`tiny-bubble-tail ${isLeftSpeaker ? 'tail-left' : 'tail-right'}`} />
              </motion.div>
            </AnimatePresence>

            {/* 🐾 The TWO Animals Facing Each Other Nose-to-Nose */}
            <div className="ambient-cluster-sprites facing-pair">
              {/* Left Animal (Faces Right) */}
              <motion.div
                className={`ambient-sprite animal-left ${isLeftSpeaker ? 'active-speaking' : 'is-listening'}`}
                animate={{
                  y: isLeftSpeaker ? [0, -5, 0] : [0, -2, 0],
                  scale: isLeftSpeaker ? 1.15 : 1
                }}
                transition={{
                  y: { repeat: Infinity, duration: 1.8, ease: 'easeInOut' },
                  scale: { duration: 0.2 }
                }}
              >
                <span className="sprite-icon face-right">{cluster.animals[0].icon}</span>
                <span className="sprite-mini-badge">{cluster.animals[0].name}</span>
                {isLeftSpeaker && <span className="ambient-talking-flare" />}
              </motion.div>

              {/* Center Talking Spark */}
              <span className="facing-gap-spark">{isLiveTrending ? '🔥' : '💬'}</span>

              {/* Right Animal (Faces Left towards Animal A) */}
              <motion.div
                className={`ambient-sprite animal-right ${!isLeftSpeaker ? 'active-speaking' : 'is-listening'}`}
                animate={{
                  y: !isLeftSpeaker ? [0, -5, 0] : [0, -2, 0],
                  scale: !isLeftSpeaker ? 1.15 : 1
                }}
                transition={{
                  y: { repeat: Infinity, duration: 1.8, delay: 0.2, ease: 'easeInOut' },
                  scale: { duration: 0.2 }
                }}
              >
                <span className="sprite-icon face-left">{cluster.animals[1].icon}</span>
                <span className="sprite-mini-badge">{cluster.animals[1].name}</span>
                {!isLeftSpeaker && <span className="ambient-talking-flare" />}
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
