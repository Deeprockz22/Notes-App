/**
 * Database of dynamic companion speech, witty focus commentary, and scientific cognitive insights.
 */

export const COMPANION_PHRASES = {
  idle: [
    "Ready when you are! Feed me some focus minutes 🦖🍕",
    "Brain operating at optimal frequency. What are we conquering today?",
    "Procrastination detected within 500 meters. Activating motivational shields 🛡️",
    "Did you know? Writing notes improves memory consolidation by 32%! 🧠",
    "One tiny task now beats five giant tasks tomorrow.",
    "Your future self is watching you right now. Make them proud! 🚀",
    "Hydrate or diedrate! Drink some water right now 💧"
  ],
  working: [
    "Shhh! Hyper-focus mode engaged. Brain power > 9000 RPM ⚡",
    "Companion is watching you work. Zero distractions allowed! 🔥",
    "Entering flow state. Dopamine receptors synchronizing...",
    "Look at you go! Even Einstein would take notes from this 📝",
    "Keep pushing! The hard part is already behind you.",
    "Laser focus active. Phone notifications blocked in spirit 📵",
    "You're building momentum like an unstoppable locomotive 🚂"
  ],
  breakTime: [
    "Session complete! Time to stretch those limbs & rest the eyes 🧘‍♂️",
    "Science says: A 5-minute breather restores prefrontal cortex stamina 🌿",
    "Dopamine payout incoming! Great focus block 🎉",
    "Companion is taking a quick nap... zzz 💤",
    "Step away from the screen for 60 seconds. Look at something green! 🌳",
    "High five! That was crisp productivity ✋"
  ],
  streakMilestone: [
    "🔥 STREAK ON FIRE! You're an absolute productivity warlord!",
    "Level up achieved! Your dopamine receptors are thriving 🏆",
    "3+ sessions locked in! Brain neuroplasticity is peaking 🧠✨"
  ],
  cat: [
    "Purrrrr... Kneading positive thoughts into your brainstorm 🐾🧶",
    "Meow! You write so fast my whiskers are tingling 🐱✨",
    "Napping is great, but finishing your goals is purr-fect! 🐟",
    "Keep your eyes on the laser pointer of success! 🔴💨",
    "Soft paws, sharp focus! Let's get this done 🐾"
  ],
  owl: [
    "Hoo-hoo! Did you know? Sleep after note-taking increases recall by 40% 🦉📚",
    "Working memory is precious. Offload every detail to external memory!",
    "The disciplined mind turns complex chaos into elegant simplicity 👓",
    "Wisdom is not knowing everything, but having organized notes on where to find it 📜",
    "Focus is the master key to intellectual mastery 🔑"
  ],
  dragon: [
    "Rawrrr! Burning through your task backlog with dragon fire! 🐉🔥",
    "Guard your focus hours like a dragon guards a mountain of gold 🪙",
    "Let your ambition blaze brighter than a supernova! 💥",
    "One task slayed! Onwards to the next conquest! ⚔️",
    "Feel the fiery momentum! Nothing can stop us now 🌋"
  ],
  astronaut: [
    "Mission Control to Pilot: Floating in zero-distraction orbit 🚀🌌",
    "Gravitational pull of procrastination broken! Warp speed engaged 🪐",
    "Looking down at Earth from orbit... your potential is limitless ✨",
    "Oxygen levels nominal, focus trajectory locked on target 🛰️",
    "One giant leap for your daily productivity! 👨‍🚀"
  ],
  retro: [
    "PLAYER 1 READY! Insert coin to procrastinate 🕹️",
    "LEVEL 1-1: Complete your daily quest for +100 EXP! 🍄",
    "COMBO x3 ACTIVE! Keep the multiplier going! 👾",
    "It's dangerous to go alone! Take this task checklist 🗡️🛡️",
    "BONUS STAGE: 25 minutes of unbroken focus! 🌟"
  ],
  haunted: [
    "The ghost in your computer is judging your typing speed 👻💀",
    "Finish this task... or the deadline monster gets you 🩸",
    "I see dead projects... don't let this note become one 🪦",
    "Your focus is so sharp it could cut through a horror movie fog 🔪⚡",
    "Don't look behind you... look at the timer! 👁️"
  ],
  cyberpunk: [
    "Neural cyberdeck connected. Overclocking prefrontal cortex 🌆⚡",
    "Glitch in the matrix: You're being extraordinarily productive today 🤖",
    "Cyberpunk protocol 2077: Zero latency, maximum output 🦾",
    "Neon lasers calibrated. Burning through tasks like fiber-optic cables 💥",
    "Night City never sleeps, and neither does your ambition 🌃"
  ],
  scifi: [
    "Mission Control to Pilot: All telemetry nominal. Engaging warp focus 🚀",
    "Reactor core at 100% capacity. Hyper-drive initialized 🛰️",
    "Captain's Log: High-yield deep work session in progress 🪐",
    "AI Subroutines optimized: Extraneous cognitive load eradicated 🛸"
  ],
  notesCognitiveOffload: [
    "🧠 'Your brain is a processor, not a hard drive.' Offload your thoughts onto paper so you can create magic!",
    "💡 David Allen principle: 'Your mind is for HAVING ideas, not HOLDING them.' Dump your raw thoughts here!",
    "⚡ Cognitive Science Fact: Holding unwritten thoughts drains working memory by 40%. Jot it down and free your creative RAM!",
    "✍️ Unload the mental clutter! Once thoughts are captured on screen, your brain switches to pure high-performance problem solving 🚀",
    "🌟 Every breakthrough starts with an unorganized scribble. Don't trap brilliance in your head—let it flow!",
    "🎯 Capture the fleeting sparks! Offloading thoughts prevents the Zeigarnik effect and frees up subconscious computing power 🧠🔥"
  ]
};

export const FOCUS_RANKS = [
  { level: 1, title: 'Focus Novice 🌱', minXp: 0, maxXp: 100 },
  { level: 2, title: 'Dopamine Apprentice ⚡', minXp: 100, maxXp: 250 },
  { level: 3, title: 'Flow State Adept 🌊', minXp: 250, maxXp: 500 },
  { level: 4, title: 'Deep Work Master 🧙‍♂️', minXp: 500, maxXp: 1000 },
  { level: 5, title: 'Hyper-Focus Wizard 🌌', minXp: 1000, maxXp: 2500 },
  { level: 6, title: 'Cosmic Productivity Deity 👑', minXp: 2500, maxXp: 99999 }
];

export function getRank(xp) {
  for (let i = FOCUS_RANKS.length - 1; i >= 0; i--) {
    if (xp >= FOCUS_RANKS[i].minXp) {
      return FOCUS_RANKS[i];
    }
  }
  return FOCUS_RANKS[0];
}
