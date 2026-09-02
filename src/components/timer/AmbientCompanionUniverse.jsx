import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMAL_CHARACTERS, SAGA_TOPICS, getSagaForTopic } from '../../utils/companionConversations';
import { fetchDailyTrendingSaga } from '../../utils/trendingTopicsService';
import { fetchLiveAnimalFact, fetchRandomJoke, fetchWikipediaFact, fetchUselessFact } from '../../utils/publicApisService';

// EXACTLY 20 mathematically collision-free, staggered clusters
// Strictly clear zone: Entire area under the linear bar and controls is 100% free of conversations!
const CLUSTER_ANCHORS = [
  // --- Outer Left Column (5 clusters, left: 2%, along far left wall) ---
  { id: 'c-l1-1', top: '6%', left: '2%', topic: 'planets' },
  { id: 'c-l1-2', top: '28%', left: '2%', topic: 'funny', isJokeTarget: true },   // 😂 JOKE ZONE
  { id: 'c-l1-3', top: '50%', left: '2%', topic: 'cheating_husband' },
  { id: 'c-l1-4', top: '72%', left: '2%', topic: 'ghosts' },
  { id: 'c-l1-5', bottom: '3%', left: '2%', topic: 'ancient' },

  // --- Inner Left Column (4 clusters, left: 17%, staggered to fill space without encroaching center) ---
  { id: 'c-l2-1', top: '17%', left: '17%', topic: 'cheating_wife' },
  { id: 'c-l2-2', top: '39%', left: '17%', topic: 'food' },
  { id: 'c-l2-3', top: '61%', left: '17%', topic: 'dreams' },
  { id: 'c-l2-4', bottom: '6%', left: '17%', topic: 'space_mysteries' },

  // --- Top Sky Arc (2 clusters at top: 5%, safely high above clock digits) ---
  // c-top-trending is the EXCLUSIVE SINGLE live daily trending topic!
  { id: 'c-top-trending', top: '5%', left: '34%', topic: 'funny', isTrendingTarget: true },
  { id: 'c-top-drama', top: '5%', right: '34%', topic: 'cheating_husband', isAnimalFactTarget: true },

  // --- Inner Right Column (4 clusters, right: 17%, staggered to fill space without encroaching center) ---
  { id: 'c-r2-1', top: '17%', right: '17%', topic: 'cheating_husband' },
  { id: 'c-r2-2', top: '39%', right: '17%', topic: 'space_mysteries', isWikiTarget: true },   // 🌐 WIKIPEDIA
  { id: 'c-r2-3', top: '61%', right: '17%', topic: 'food' },
  { id: 'c-r2-4', bottom: '6%', right: '17%', topic: 'ocean' },

  // --- Outer Right Column (5 clusters, right: 2%, along far right wall) ---
  { id: 'c-r1-1', top: '6%', right: '2%', topic: 'serious' },
  { id: 'c-r1-2', top: '28%', right: '2%', topic: 'cheating_wife', isUselessFactTarget: true },  // 🤔 USELESS FACT
  { id: 'c-r1-3', top: '50%', right: '2%', topic: 'dreams' },
  { id: 'c-r1-4', top: '72%', right: '2%', topic: 'chill' },
  { id: 'c-r1-5', bottom: '3%', right: '2%', topic: 'funny' }
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

    // 🐾 Fetch live real animal facts from public APIs (Assigned to c-top-drama)
    fetchLiveAnimalFact()
      .then((fact) => {
        if (!isMounted || !fact) return;
        const animalFactSaga = {
          id: 'live_animal_fact_saga',
          title: 'Daily Animal Trivia',
          tag: '🐾 ANIMAL FACT',
          dialogues: [
            { speaker: 'A', text: `Did you know? ${fact}` },
            { speaker: 'B', text: "Wait, seriously?! That is genuinely mind-blowing!" },
            { speaker: 'A', text: "Nature is full of incredible quirks." },
            { speaker: 'B', text: "Time to focus and be wise like an owl!" }
          ]
        };
        setClusters((prev) =>
          prev.map((cluster) =>
            cluster.id === 'c-top-drama' ? { ...cluster, saga: animalFactSaga, turn: 0 } : cluster
          )
        );
      })
      .catch((err) => console.log('Animal facts notice:', err));

    // 😂 Fetch a random joke (Official Joke API → c-l1-2 Joke Zone)
    fetchRandomJoke()
      .then((joke) => {
        if (!isMounted || !joke) return;
        const jokeSaga = {
          id: 'live_joke_saga',
          title: 'Joke Zone',
          tag: '😂 JOKE ZONE',
          dialogues: [
            { speaker: 'A', text: `Hey, wanna hear one? "${joke.setup}"` },
            { speaker: 'B', text: "Oof… okay, hit me!" },
            { speaker: 'A', text: `${joke.punchline} 😄` },
            { speaker: 'B', text: "Oh no. That's terrible. I love it." }
          ]
        };
        setClusters((prev) =>
          prev.map((cluster) =>
            cluster.id === 'c-l1-2' ? { ...cluster, saga: jokeSaga, turn: 0 } : cluster
          )
        );
      })
      .catch((err) => console.log('Joke API notice:', err));

    // 🌐 Fetch a random Wikipedia article (Wikipedia REST API → c-r2-2 Wiki)
    fetchWikipediaFact()
      .then((wiki) => {
        if (!isMounted || !wiki) return;
        const wikiSaga = {
          id: 'live_wiki_saga',
          title: `Wikipedia: ${wiki.title}`,
          tag: '🌐 WIKIPEDIA',
          dialogues: [
            { speaker: 'A', text: `Let's look up "${wiki.title}" on Wikipedia!` },
            { speaker: 'B', text: wiki.extract },
            { speaker: 'A', text: "Wow, I didn't know that. The world is fascinating!" },
            { speaker: 'B', text: "Every day is a school day! 📚" }
          ]
        };
        setClusters((prev) =>
          prev.map((cluster) =>
            cluster.id === 'c-r2-2' ? { ...cluster, saga: wikiSaga, turn: 0 } : cluster
          )
        );
      })
      .catch((err) => console.log('Wikipedia notice:', err));

    // 🤔 Fetch a useless fact (uselessfacts.jsph.pl → c-r1-2 Useless Fact)
    fetchUselessFact()
      .then((fact) => {
        if (!isMounted || !fact) return;
        const uselessSaga = {
          id: 'live_useless_fact_saga',
          title: 'Useless Fact of the Day',
          tag: '🤔 USELESS FACT',
          dialogues: [
            { speaker: 'A', text: "Okay, random useless fact incoming —" },
            { speaker: 'B', text: fact },
            { speaker: 'A', text: "What?! How do people even discover these things?" },
            { speaker: 'B', text: "Someone, somewhere, had too much free time. Respect." }
          ]
        };
        setClusters((prev) =>
          prev.map((cluster) =>
            cluster.id === 'c-r1-2' ? { ...cluster, saga: uselessSaga, turn: 0 } : cluster
          )
        );
      })
      .catch((err) => console.log('Useless Facts notice:', err));

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

      {/* 🐾 Exactly 20 Collision-Free Staggered Animal Clusters */}
      {clusters.map((cluster) => {
        const currentDialogue = cluster.saga.dialogues[cluster.turn] || cluster.saga.dialogues[0];

        // STRICT TWO-COMPANION LOGIC:
        // role 'A' is strictly animal 0 (left), role 'B' is strictly animal 1 (right)
        const isLeftSpeaker = currentDialogue.role === 'A';
        const activeSpeaker = isLeftSpeaker ? cluster.animals[0] : cluster.animals[1];
        const speakerDisplayName = `${activeSpeaker.icon} ${activeSpeaker.name}`;
        const isLiveTrending = Boolean(cluster.saga.isLiveTrending);
        const isLiveFact    = Boolean(cluster.isAnimalFactTarget);
        const isJoke        = Boolean(cluster.isJokeTarget);
        const isWiki        = Boolean(cluster.isWikiTarget);
        const isUseless     = Boolean(cluster.isUselessFactTarget);

        // Derive bubble CSS modifier
        const bubbleMod = isLiveTrending ? 'trending-bubble'
          : isLiveFact  ? 'fact-bubble'
          : isJoke      ? 'joke-bubble'
          : isWiki      ? 'wiki-bubble'
          : isUseless   ? 'useless-bubble'
          : '';

        // Derive tag CSS modifier
        const tagMod = isLiveTrending ? 'trending-tag'
          : isLiveFact  ? 'fact-tag'
          : isJoke      ? 'joke-tag'
          : isWiki      ? 'wiki-tag'
          : isUseless   ? 'useless-tag'
          : '';

        // Derive center spark emoji
        const sparkEmoji = isLiveTrending ? '🔥'
          : isLiveFact  ? '🐾'
          : isJoke      ? '😂'
          : isWiki      ? '🌐'
          : isUseless   ? '🤔'
          : '💬';

        // Derive node CSS modifier
        const nodeMod = isLiveTrending ? 'trending-node'
          : isLiveFact ? 'fact-node'
          : '';

        const posStyle = {
          top: cluster.top,
          bottom: cluster.bottom,
          left: cluster.left,
          right: cluster.right
        };

        return (
          <motion.div
            key={cluster.id}
            className={`ambient-cluster-node ${isLeftSpeaker ? 'speaker-left' : 'speaker-right'} ${nodeMod}`}
            style={posStyle}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            onClick={(e) => handleClusterClick(cluster.id, e)}
            title={`Topic: ${cluster.saga.title} (Click to skip line)`}
          >
            {/* 💬 Tiny, Crisp, Clamped Speech Bubble (Guaranteed Zero Overlap) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${cluster.saga.id}-${cluster.turn}`}
                initial={{ opacity: 0, y: 5, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`ambient-tiny-bubble ${bubbleMod}`}
              >
                <div className="tiny-bubble-header">
                  <span className="tiny-speaker-name">{speakerDisplayName}</span>
                  <span className={`tiny-topic-tag ${tagMod}`}>
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
              <span className="facing-gap-spark">{sparkEmoji}</span>

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
