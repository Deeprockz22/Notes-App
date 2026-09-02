import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, RefreshCw, Volume2, Compass, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANIONS } from '../../utils/companionPresets';
import { CONVERSATION_SCRIPTS, getRandomScript } from '../../utils/companionConversations';

// Initial cluster layout anchors spread across fullscreen corners and edges (safe from central timer)
const CLUSTER_ANCHORS = [
  { id: 'c-top-left', top: '16%', left: '10%', topic: 'planets' },
  { id: 'c-top-right', top: '16%', right: '10%', topic: 'ghosts' },
  { id: 'c-mid-left', top: '48%', left: '7%', topic: 'dreams' },
  { id: 'c-mid-right', top: '48%', right: '7%', topic: 'funny' },
  { id: 'c-bottom-left', bottom: '16%', left: '12%', topic: 'serious' },
  { id: 'c-bottom-right', bottom: '16%', right: '12%', topic: 'food' }
];

export default function AmbientCompanionUniverse({ isRunning, progress = 0 }) {
  // Cluster state: each cluster has an assigned script, dialogue turn, and assigned companions
  const [clusters, setClusters] = useState(() => {
    return CLUSTER_ANCHORS.map((anchor, idx) => {
      const script = getRandomScript(null, anchor.topic);
      // Assign two companions to each cluster
      const compA = COMPANIONS[idx % COMPANIONS.length];
      const compB = COMPANIONS[(idx + 2) % COMPANIONS.length];
      return {
        ...anchor,
        script,
        turn: 0,
        companions: [compA, compB],
        isWandering: false
      };
    });
  });

  // Background stars
  const [stars] = useState(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
  });

  // Conversation tick loop: steps dialogues and triggers wandering
  useEffect(() => {
    const interval = setInterval(() => {
      setClusters((prevClusters) => {
        return prevClusters.map((cluster) => {
          const nextTurn = cluster.turn + 1;

          // If conversation ended, pick new random script and occasionally swap a member
          if (nextTurn >= cluster.script.dialogues.length) {
            const nextScript = getRandomScript(cluster.script.id);
            // Rotate one companion randomly to simulate wandering arrival
            const newCompanions = [...cluster.companions];
            if (Math.random() > 0.4) {
              const randomGuest = COMPANIONS[Math.floor(Math.random() * COMPANIONS.length)];
              newCompanions[1] = randomGuest;
            }

            return {
              ...cluster,
              script: nextScript,
              turn: 0,
              companions: newCompanions,
              isWandering: false
            };
          }

          return {
            ...cluster,
            turn: nextTurn
          };
        });
      });
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const handleClusterClick = (clusterId, e) => {
    e?.stopPropagation();
    setClusters((prev) =>
      prev.map((c) => {
        if (c.id === clusterId) {
          const nextTurn = (c.turn + 1) % c.script.dialogues.length;
          return { ...c, turn: nextTurn };
        }
        return c;
      })
    );

    // Mini celebration confetti
    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) {
      confetti({
        particleCount: 12,
        spread: 35,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight
        },
        colors: ['#38bdf8', '#a855f7', '#f43f5e', '#22c55e']
      });
    }
  };

  return (
    <div className="ambient-universe-stage" aria-label="Ambient Living Companion Universe">
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
              opacity: [0.2, 0.9, 0.2],
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
        <span className="ambient-badge-label">COMPANION UNIVERSE • 50+ LIVE CHANNELS</span>
      </div>

      {/* 👥 Multiple Conversational Clusters */}
      {clusters.map((cluster) => {
        const currentDialogue = cluster.script.dialogues[cluster.turn] || cluster.script.dialogues[0];
        const speakerName = currentDialogue.speaker;

        // Position styles
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
            transition={{ duration: 0.6 }}
            onClick={(e) => handleClusterClick(cluster.id, e)}
            title={`Topic: ${cluster.script.title} (Click to skip)`}
          >
            {/* 💬 Tiny Subtle Speech Bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cluster.script.id}-${cluster.turn}`}
                initial={{ opacity: 0, y: 4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="ambient-tiny-bubble"
              >
                <div className="tiny-bubble-header">
                  <span className="tiny-speaker-name">{speakerName}</span>
                  <span className="tiny-topic-tag">{cluster.script.topic}</span>
                </div>
                <p className="tiny-bubble-text">{currentDialogue.text}</p>
                <div className="tiny-bubble-tail" />
              </motion.div>
            </AnimatePresence>

            {/* 🦖🦉 Companions Standing in this Cluster */}
            <div className="ambient-cluster-sprites">
              {cluster.companions.map((comp, idx) => {
                const isSpeaking = speakerName.includes(comp.name) || (idx === 0 && cluster.turn % 2 === 0);

                return (
                  <motion.div
                    key={`${comp.id}-${idx}`}
                    className={`ambient-sprite ${isSpeaking ? 'active-speaking' : ''}`}
                    animate={{
                      y: [0, -4, 0],
                      scale: isSpeaking ? 1.15 : 1
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: 2 + idx * 0.4, ease: 'easeInOut' },
                      scale: { duration: 0.2 }
                    }}
                  >
                    <span className="sprite-icon">{comp.icon}</span>
                    <span className="sprite-mini-badge">{comp.name}</span>
                    {isSpeaking && <span className="ambient-talking-flare" />}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
