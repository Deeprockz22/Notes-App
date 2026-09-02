import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ANIMAL_CHARACTERS, SAGA_TOPICS, getSagaForTopic } from '../../utils/companionConversations';
import { fetchDailyTrendingSaga } from '../../utils/trendingTopicsService';
import {
  fetchLiveAnimalFact, fetchRandomJoke, fetchWikipediaFact, fetchUselessFact,
  fetchDadJoke, fetchChuckNorrisFact, fetchTriviaQuestion, fetchAffirmation, fetchZenQuote
} from '../../utils/publicApisService';

// EXACTLY 20 mathematically collision-free, staggered clusters
// Strictly clear zone: Entire area under the linear bar and controls is 100% free of conversations!
const CLUSTER_ANCHORS = [
  // --- Outer Left Column ---
  { id: 'c-l1-1', top: '6%',    left: '2%',   topic: 'planets',          isDadJokeTarget: true     }, // 😄 DAD JOKE
  { id: 'c-l1-2', top: '28%',   left: '2%',   topic: 'funny',            isJokeTarget: true        }, // 😂 JOKE ZONE
  { id: 'c-l1-3', top: '50%',   left: '2%',   topic: 'cheating_husband' },
  { id: 'c-l1-4', top: '72%',   left: '2%',   topic: 'ghosts',           isChuckTarget: true       }, // 🥋 CHUCK NORRIS
  { id: 'c-l1-5', bottom: '3%', left: '2%',   topic: 'ancient' },

  // --- Inner Left Column ---
  { id: 'c-l2-1', top: '17%',   left: '17%',  topic: 'cheating_wife',    isAffirmationTarget: true }, // 💬 AFFIRMATION
  { id: 'c-l2-2', top: '39%',   left: '17%',  topic: 'food' },
  { id: 'c-l2-3', top: '61%',   left: '17%',  topic: 'dreams' },
  { id: 'c-l2-4', bottom: '6%', left: '17%',  topic: 'space_mysteries' },

  // --- Top Sky Arc ---
  { id: 'c-top-trending', top: '5%', left: '34%',  topic: 'funny',           isTrendingTarget: true    }, // 🔥 TRENDING
  { id: 'c-top-drama',    top: '5%', right: '34%', topic: 'cheating_husband', isAnimalFactTarget: true  }, // 🐾 ANIMAL FACT

  // --- Inner Right Column ---
  { id: 'c-r2-1', top: '17%',   right: '17%', topic: 'cheating_husband',  isTriviaTarget: true      }, // 🧠 TRIVIA
  { id: 'c-r2-2', top: '39%',   right: '17%', topic: 'space_mysteries',   isWikiTarget: true        }, // 🌐 WIKIPEDIA
  { id: 'c-r2-3', top: '61%',   right: '17%', topic: 'food' },
  { id: 'c-r2-4', bottom: '6%', right: '17%', topic: 'ocean',             isZenQuoteTarget: true    }, // ☯️ ZEN QUOTE

  // --- Outer Right Column ---
  { id: 'c-r1-1', top: '6%',    right: '2%',  topic: 'serious' },
  { id: 'c-r1-2', top: '28%',   right: '2%',  topic: 'cheating_wife',    isUselessFactTarget: true }, // 🤔 USELESS FACT
  { id: 'c-r1-3', top: '50%',   right: '2%',  topic: 'dreams' },
  { id: 'c-r1-4', top: '72%',   right: '2%',  topic: 'chill' },
  { id: 'c-r1-5', bottom: '3%', right: '2%',  topic: 'funny' }
];

export default function AmbientCompanionUniverse({ isRunning, progress = 0 }) {
  // Exactly 20 Simultaneous animal clusters: Each cluster has 2 dedicated companions facing each other
  const [clusters, setClusters] = useState(() => {
    return CLUSTER_ANCHORS.map((anchor, idx) => {
      const saga = getSagaForTopic(anchor.topic);
      // Pair 2 unique animal companions strictly dedicated to this cluster
      const animalA = ANIMAL_CHARACTERS[(idx * 2) % ANIMAL_CHARACTERS.length];
      const animalB = ANIMAL_CHARACTERS[(idx * 2 + 1) % ANIMAL_CHARACTERS.length];
      const maxPairs = Math.floor(saga.dialogues.length / 2) || 1;
      const initialTurn = (Math.floor(Math.random() * maxPairs) * 2) % saga.dialogues.length;

      return {
        ...anchor,
        saga,
        turn: initialTurn,
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

  // ─── Named helper: fetches all live API conversation data ───
  // forceRefresh=true bypasses localStorage → always fresh from API
  const REFRESH_INTERVAL_MS = 2 * 60 * 1000; // 2 minutes

  async function loadLiveConversations(setter, forceRefresh = false) {
    const safe = (fn) => fn.catch((err) => console.log('[Zencus] API notice:', err));

    safe(fetchRandomJoke(forceRefresh).then((joke) => {
      if (!joke) return;
      setter((prev) => prev.map((c) => c.id === 'c-l1-2' ? { ...c, turn: 0, saga: {
        id: 'live_joke_saga', title: 'Joke Zone', tag: '😂 JOKE ZONE',
        dialogues: [
          { speaker: 'A', text: `Hey, wanna hear one? "${joke.setup}"` },
          { speaker: 'B', text: "Oof… okay, hit me!" },
          { speaker: 'A', text: `${joke.punchline} 😄` },
          { speaker: 'B', text: "Oh no. That's terrible. I love it." }
        ]
      }} : c));
    }));

    safe(fetchWikipediaFact(forceRefresh).then((wiki) => {
      if (!wiki) return;
      setter((prev) => prev.map((c) => c.id === 'c-r2-2' ? { ...c, turn: 0, saga: {
        id: 'live_wiki_saga', title: `Wikipedia: ${wiki.title}`, tag: '🌐 WIKIPEDIA',
        dialogues: [
          { speaker: 'A', text: `Let's look up "${wiki.title}" on Wikipedia!` },
          { speaker: 'B', text: wiki.extract },
          { speaker: 'A', text: "Wow, I didn't know that. The world is fascinating!" },
          { speaker: 'B', text: "Every day is a school day! 📚" }
        ]
      }} : c));
    }));

    safe(fetchUselessFact(forceRefresh).then((fact) => {
      if (!fact) return;
      setter((prev) => prev.map((c) => c.id === 'c-r1-2' ? { ...c, turn: 0, saga: {
        id: 'live_useless_fact_saga', title: 'Useless Fact', tag: '🤔 USELESS FACT',
        dialogues: [
          { speaker: 'A', text: "Okay, random useless fact incoming —" },
          { speaker: 'B', text: fact },
          { speaker: 'A', text: "What?! How do people even discover these things?" },
          { speaker: 'B', text: "Someone, somewhere, had too much free time. Respect." }
        ]
      }} : c));
    }));

    safe(fetchDadJoke(forceRefresh).then((joke) => {
      if (!joke) return;
      setter((prev) => prev.map((c) => c.id === 'c-l1-1' ? { ...c, turn: 0, saga: {
        id: 'live_dad_joke_saga', title: 'Dad Joke Zone', tag: '😄 DAD JOKE',
        dialogues: [
          { speaker: 'A', text: "Brace yourself — dad joke incoming!" },
          { speaker: 'B', text: joke },
          { speaker: 'A', text: "…I can't believe I laughed at that." },
          { speaker: 'B', text: "You did. That's the power of the dad joke. 😤" }
        ]
      }} : c));
    }));

    safe(fetchChuckNorrisFact(forceRefresh).then((fact) => {
      if (!fact) return;
      setter((prev) => prev.map((c) => c.id === 'c-l1-4' ? { ...c, turn: 0, saga: {
        id: 'live_chuck_saga', title: 'Chuck Norris Facts', tag: '🥋 CHUCK NORRIS',
        dialogues: [
          { speaker: 'A', text: "Okay, Chuck Norris fact of the day:" },
          { speaker: 'B', text: fact },
          { speaker: 'A', text: "…Should we be scared?" },
          { speaker: 'B', text: "Always. The answer is always yes. 🥋" }
        ]
      }} : c));
    }));

    safe(fetchTriviaQuestion(forceRefresh).then((trivia) => {
      if (!trivia) return;
      setter((prev) => prev.map((c) => c.id === 'c-r2-1' ? { ...c, turn: 0, saga: {
        id: 'live_trivia_saga', title: 'Trivia Challenge', tag: '🧠 TRIVIA',
        dialogues: [
          { speaker: 'A', text: `Trivia time! "${trivia.question}"` },
          { speaker: 'B', text: "Hmm… okay, I give up. What's the answer?" },
          { speaker: 'A', text: `It's "${trivia.answer}"! 🏆` },
          { speaker: 'B', text: "I totally knew that. I was just testing you." }
        ]
      }} : c));
    }));

    safe(fetchAffirmation(forceRefresh).then((affirmation) => {
      if (!affirmation) return;
      setter((prev) => prev.map((c) => c.id === 'c-l2-1' ? { ...c, turn: 0, saga: {
        id: 'live_affirmation_saga', title: 'Daily Affirmation', tag: '💬 AFFIRMATION',
        dialogues: [
          { speaker: 'A', text: "Today's affirmation for both of us:" },
          { speaker: 'B', text: `"${affirmation}"` },
          { speaker: 'A', text: "I needed to hear that. Thank you." },
          { speaker: 'B', text: "You've got this. Now go focus! ✨" }
        ]
      }} : c));
    }));

    safe(fetchZenQuote(forceRefresh).then((zenQ) => {
      if (!zenQ) return;
      setter((prev) => prev.map((c) => c.id === 'c-r2-4' ? { ...c, turn: 0, saga: {
        id: 'live_zen_quote_saga', title: 'Zen Philosophy', tag: '☯️ ZEN QUOTE',
        dialogues: [
          { speaker: 'A', text: `"${zenQ.q}"` },
          { speaker: 'B', text: `— ${zenQ.a}` },
          { speaker: 'A', text: "That one actually hit deep. Let that sink in." },
          { speaker: 'B', text: "Philosophy. It's just high-tier staring into the void. 🌌" }
        ]
      }} : c));
    }));

    // Animal fact & MeowFacts — daily only, no 2-min refresh
    if (!forceRefresh) {
      safe(fetchLiveAnimalFact().then((fact) => {
        if (!fact) return;
        setter((prev) => prev.map((c) => c.id === 'c-top-drama' ? { ...c, turn: 0, saga: {
          id: 'live_animal_fact_saga', title: 'Daily Animal Trivia', tag: '🐾 ANIMAL FACT',
          dialogues: [
            { speaker: 'A', text: `Did you know? ${fact}` },
            { speaker: 'B', text: "Wait, seriously?! That is genuinely mind-blowing!" },
            { speaker: 'A', text: "Nature is full of incredible quirks." },
            { speaker: 'B', text: "Time to focus and be wise like an owl!" }
          ]
        }} : c));
      }));
    }
  }

  // 🔄 On mount: load today's trending + all conversation APIs (use cache)
  useEffect(() => {
    let isMounted = true;

    fetchDailyTrendingSaga()
      .then((trendingSaga) => {
        if (!isMounted || !trendingSaga?.dialogues?.length) return;
        setClusters((prev) => prev.map((c) =>
          c.id === 'c-top-trending' ? { ...c, saga: trendingSaga, turn: 0 } : c
        ));
      })
      .catch((err) => console.log('Trending topics notice:', err));

    loadLiveConversations(setClusters, false); // initial load from cache/API

    // ⏱️ Refresh all conversation content every 2 minutes (fresh from API)
    const refreshTimer = setInterval(() => {
      if (isMounted) loadLiveConversations(setClusters, true);
    }, REFRESH_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(refreshTimer);
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
        const isLiveTrending  = Boolean(cluster.saga.isLiveTrending);
        const isLiveFact       = Boolean(cluster.isAnimalFactTarget);
        const isJoke           = Boolean(cluster.isJokeTarget);
        const isWiki           = Boolean(cluster.isWikiTarget);
        const isUseless        = Boolean(cluster.isUselessFactTarget);
        const isDadJoke        = Boolean(cluster.isDadJokeTarget);
        const isChuck          = Boolean(cluster.isChuckTarget);
        const isTrivia         = Boolean(cluster.isTriviaTarget);
        const isAffirmation    = Boolean(cluster.isAffirmationTarget);
        const isZenQuote       = Boolean(cluster.isZenQuoteTarget);

        // Derive bubble CSS modifier
        const bubbleMod = isLiveTrending ? 'trending-bubble'
          : isLiveFact    ? 'fact-bubble'
          : isJoke        ? 'joke-bubble'
          : isWiki        ? 'wiki-bubble'
          : isUseless     ? 'useless-bubble'
          : isDadJoke     ? 'dadjoke-bubble'
          : isChuck       ? 'chuck-bubble'
          : isTrivia      ? 'trivia-bubble'
          : isAffirmation ? 'affirm-bubble'
          : isZenQuote    ? 'zenq-bubble'
          : '';

        // Derive tag CSS modifier
        const tagMod = isLiveTrending ? 'trending-tag'
          : isLiveFact    ? 'fact-tag'
          : isJoke        ? 'joke-tag'
          : isWiki        ? 'wiki-tag'
          : isUseless     ? 'useless-tag'
          : isDadJoke     ? 'dadjoke-tag'
          : isChuck       ? 'chuck-tag'
          : isTrivia      ? 'trivia-tag'
          : isAffirmation ? 'affirm-tag'
          : isZenQuote    ? 'zenq-tag'
          : '';

        // Derive center spark emoji
        const sparkEmoji = isLiveTrending ? '🔥'
          : isLiveFact    ? '🐾'
          : isJoke        ? '😂'
          : isWiki        ? '🌐'
          : isUseless     ? '🤔'
          : isDadJoke     ? '😄'
          : isChuck       ? '🥋'
          : isTrivia      ? '🧠'
          : isAffirmation ? '💬'
          : isZenQuote    ? '☯️'
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
