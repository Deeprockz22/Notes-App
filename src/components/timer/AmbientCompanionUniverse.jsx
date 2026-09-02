import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMAL_CHARACTERS, SAGA_TOPICS, getSagaForTopic } from '../../utils/companionConversations';
import { fetchDailyTrendingSaga } from '../../utils/trendingTopicsService';

// Richly staggered non-overlapping cluster anchors filling the entire screen canvas
// Strict Exclusion Zone: Center 34%-66% width and 34%-66% height is 100% reserved for clock digits & linear bar!
const CLUSTER_ANCHORS = [
  // --- Outer Left Wing (Column 1, left: 2%) ---
  { id: 'c-l1-1', top: '5%', left: '2%', topic: 'planets' },
  { id: 'c-l1-2', top: '19%', left: '2%', topic: 'funny' },
  { id: 'c-l1-3', top: '33%', left: '2%', topic: 'dreams' },
  { id: 'c-l1-4', top: '48%', left: '2%', topic: 'cheating_husband' },
  { id: 'c-l1-5', top: '63%', left: '2%', topic: 'ghosts' },
  { id: 'c-l1-6', top: '78%', left: '2%', topic: 'ancient' },
  { id: 'c-l1-7', bottom: '2%', left: '2%', topic: 'ocean' },

  // --- Inner Left Wing (Column 2, left: 15% - 17% -> Fills the large intermediate gap!) ---
  { id: 'c-l2-1', top: '16%', left: '15%', topic: 'cheating_wife' },
  { id: 'c-l2-2', top: '31%', left: '16%', topic: 'food' },
  { id: 'c-l2-3', top: '46%', left: '15%', topic: 'funny' },
  { id: 'c-l2-4', top: '61%', left: '16%', topic: 'space_mysteries' },
  { id: 'c-l2-5', top: '76%', left: '15%', topic: 'chill' },

  // --- Mid-Left Quadrant (Column 3, left: 28% - 30% -> Fills upper & lower space beside timer!) ---
  { id: 'c-l3-1', top: '14%', left: '29%', topic: 'cheating_husband' },
  { id: 'c-l3-2', top: '27%', left: '29%', topic: 'dreams' },
  { id: 'c-l3-3', top: '74%', left: '29%', topic: 'ghosts' },
  { id: 'c-l3-4', bottom: '2%', left: '27%', topic: 'food' },

  // --- Top Sky Gallery Arc (Above Timer at top: 4.5%) ---
  // c-top-trending is the EXCLUSIVE SINGLE live daily trending topic!
  { id: 'c-top-trending', top: '4.5%', left: '14%', topic: 'funny', isTrendingTarget: true },
  { id: 'c-top-2', top: '4.5%', left: '28%', topic: 'cheating_husband' },
  { id: 'c-top-3', top: '4.5%', right: '28%', topic: 'cheating_wife' },
  { id: 'c-top-4', top: '4.5%', right: '14%', topic: 'planets' },

  // --- Mid-Right Quadrant (Column 4, right: 28% - 30% -> Fills upper & lower space beside timer!) ---
  { id: 'c-r3-1', top: '14%', right: '29%', topic: 'funny' },
  { id: 'c-r3-2', top: '27%', right: '29%', topic: 'cheating_wife' },
  { id: 'c-r3-3', top: '74%', right: '29%', topic: 'ancient' },
  { id: 'c-r3-4', bottom: '2%', right: '27%', topic: 'planets' },

  // --- Inner Right Wing (Column 5, right: 15% - 17% -> Fills the right intermediate gap!) ---
  { id: 'c-r2-1', top: '16%', right: '15%', topic: 'dreams' },
  { id: 'c-r2-2', top: '31%', right: '16%', topic: 'cheating_husband' },
  { id: 'c-r2-3', top: '46%', right: '15%', topic: 'food' },
  { id: 'c-r2-4', top: '61%', right: '16%', topic: 'chill' },
  { id: 'c-r2-5', top: '76%', right: '15%', topic: 'space_mysteries' },

  // --- Outer Right Wing (Column 6, right: 2%) ---
  { id: 'c-r1-1', top: '5%', right: '2%', topic: 'serious' },
  { id: 'c-r1-2', top: '19%', right: '2%', topic: 'food' },
  { id: 'c-r1-3', top: '33%', right: '2%', topic: 'cheating_wife' },
  { id: 'c-r1-4', top: '48%', right: '2%', topic: 'space_mysteries' },
  { id: 'c-r1-5', top: '63%', right: '2%', topic: 'ocean' },
  { id: 'c-r1-6', top: '78%', right: '2%', topic: 'ghosts' },
  { id: 'c-r1-7', bottom: '2%', right: '2%', topic: 'ancient' },

  // --- Bottom Floor Flanks ---
  { id: 'c-bot-1', bottom: '2%', left: '14%', topic: 'chill' },
  { id: 'c-bot-2', bottom: '2%', right: '14%', topic: 'funny' }
];

export default function AmbientCompanionUniverse({ isRunning, progress = 0 }) {
  // Rich living constellation: Each cluster has 2 dedicated companions facing each other
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
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.8,
      duration: Math.random() * 3 + 2.5,
      delay: Math.random() * 2.5
    }));
  });

  // 🔄 Automatically fetch today's trending topics on load every day
  // Strictly assign to ONLY ONE cluster ('c-top-trending')
  useEffect(() => {
    let isMounted = true;
    fetchDailyTrendingSaga()
      .then((trendingSaga) => {
        if (!isMounted || !trendingSaga?.dialogues?.length) return;
        setClusters((prev) =>
          prev.map((cluster) => {
            // STRICTLY ONLY ONE cluster is the live trending channel!
            if (cluster.id === 'c-top-trending') {
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
        <span className="ambient-badge-label">LIVING ANIMAL GALAXY • 1 TRENDING CHANNEL</span>
      </div>

      {/* 🐾 Staggered Non-Overlapping Animal Conversational Clusters Filling All Space */}
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
