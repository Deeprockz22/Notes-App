import React from 'react';
import { motion } from 'framer-motion';
import { themedAudio } from '../../utils/retroAudio';

/**
 * RetroArcadeSprites
 * Renders nostalgic 8-bit pixel characters (Dino, Helicopter, Pacman, Ghosts,
 * King Kong, Contra Soldier, Duck Hunt Ducks, Flappy Birds, Space Invaders)
 * animated across the home screen when switched to 8-Bit Retro Arcade theme.
 */

// ─── 8-Bit Pixel Character SVGs (Crisp Pixel-Grid Art) ───

// 1. Pixel Dino (Classic T-Rex)
const PixelDino = () => (
  <svg width="40" height="44" viewBox="0 0 20 22" style={{ imageRendering: 'pixelated' }}>
    {/* Body */}
    <rect x="11" y="0" width="8" height="6" fill="#22c55e" />
    <rect x="16" y="1" width="2" height="2" fill="#000" />
    <rect x="11" y="6" width="6" height="3" fill="#22c55e" />
    <rect x="7" y="7" width="10" height="7" fill="#22c55e" />
    <rect x="2" y="9" width="6" height="4" fill="#22c55e" />
    <rect x="0" y="8" width="3" height="3" fill="#22c55e" />
    {/* Arms */}
    <rect x="15" y="9" width="3" height="2" fill="#16a34a" />
    {/* Legs */}
    <rect x="6" y="14" width="3" height="5" fill="#15803d" className="dino-leg-left" />
    <rect x="11" y="14" width="3" height="5" fill="#16a34a" className="dino-leg-right" />
    {/* Feet */}
    <rect x="6" y="19" width="4" height="2" fill="#15803d" />
    <rect x="11" y="19" width="4" height="2" fill="#16a34a" />
  </svg>
);

// 2. Pixel Helicopter (Arcade Chopper with Spinning Rotor)
const PixelHelicopter = () => (
  <div className="pixel-chopper-wrapper">
    <div className="chopper-rotor-blade" />
    <svg width="52" height="34" viewBox="0 0 26 17" style={{ imageRendering: 'pixelated' }}>
      {/* Rotor shaft */}
      <rect x="12" y="0" width="2" height="3" fill="#94a3b8" />
      {/* Cockpit / Body */}
      <rect x="7" y="3" width="12" height="8" fill="#3b82f6" />
      <rect x="15" y="4" width="4" height="4" fill="#38bdf8" />
      <rect x="6" y="6" width="2" height="4" fill="#1d4ed8" />
      {/* Tail boom */}
      <rect x="0" y="5" width="7" height="3" fill="#2563eb" />
      <rect x="0" y="3" width="2" height="7" fill="#ef4444" className="chopper-tail-rotor" />
      {/* Skids */}
      <rect x="10" y="11" width="2" height="3" fill="#64748b" />
      <rect x="15" y="11" width="2" height="3" fill="#64748b" />
      <rect x="7" y="14" width="13" height="2" fill="#475569" />
    </svg>
  </div>
);

// 3. Pixel Pac-Man & Ghost
const PixelPacman = () => (
  <div className="pixel-pacman-duo">
    <div className="pacman-mouth-anim">
      <svg width="32" height="32" viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
        <circle cx="8" cy="8" r="7" fill="#eab308" />
        <polygon points="8,8 16,3 16,13" fill="#000" className="pacman-jaw" />
      </svg>
    </div>
    {/* Trailing Dot Pellets */}
    <div className="pacman-dot-stream">
      <span className="p-dot" />
      <span className="p-dot" />
      <span className="p-dot" />
    </div>
  </div>
);

const PixelGhost = ({ color = '#ef4444' }) => (
  <svg width="30" height="30" viewBox="0 0 15 15" style={{ imageRendering: 'pixelated' }}>
    {/* Ghost Head & Body */}
    <rect x="3" y="1" width="9" height="10" fill={color} />
    <rect x="1" y="4" width="13" height="8" fill={color} />
    {/* Ghost Skirt Fringe */}
    <rect x="1" y="12" width="3" height="2" fill={color} />
    <rect x="6" y="12" width="3" height="2" fill={color} />
    <rect x="11" y="12" width="3" height="2" fill={color} />
    {/* Eyes */}
    <rect x="3" y="4" width="3" height="4" fill="#ffffff" />
    <rect x="9" y="4" width="3" height="4" fill="#ffffff" />
    <rect x="4" y="5" width="2" height="2" fill="#1e3a8a" />
    <rect x="10" y="5" width="2" height="2" fill="#1e3a8a" />
  </svg>
);

// 4. Pixel King Kong (Arcade Ape)
const PixelKingKong = () => (
  <svg width="44" height="44" viewBox="0 0 22 22" style={{ imageRendering: 'pixelated' }}>
    {/* Head & Ears */}
    <rect x="5" y="1" width="12" height="7" fill="#78350f" />
    <rect x="3" y="3" width="2" height="3" fill="#92400e" />
    <rect x="17" y="3" width="2" height="3" fill="#92400e" />
    <rect x="7" y="3" width="2" height="2" fill="#fbbf24" />
    <rect x="13" y="3" width="2" height="2" fill="#fbbf24" />
    <rect x="8" y="5" width="6" height="2" fill="#d97706" />
    {/* Massive Chest */}
    <rect x="4" y="8" width="14" height="8" fill="#78350f" />
    <rect x="7" y="9" width="8" height="5" fill="#b45309" />
    {/* Arms (Pounding pose) */}
    <rect x="1" y="8" width="3" height="7" fill="#92400e" className="kong-arm-left" />
    <rect x="18" y="8" width="3" height="7" fill="#92400e" className="kong-arm-right" />
    {/* Legs */}
    <rect x="5" y="16" width="4" height="5" fill="#78350f" />
    <rect x="13" y="16" width="4" height="5" fill="#78350f" />
    <rect x="4" y="20" width="5" height="2" fill="#451a03" />
    <rect x="13" y="20" width="5" height="2" fill="#451a03" />
  </svg>
);

// 5. Pixel Contra Commando (Soldier with Laser Rifle)
const PixelContraCommando = () => (
  <div className="contra-commando-container">
    <svg width="38" height="42" viewBox="0 0 19 21" style={{ imageRendering: 'pixelated' }}>
      {/* Red Bandana */}
      <rect x="6" y="1" width="8" height="2" fill="#ef4444" />
      <rect x="3" y="2" width="3" height="2" fill="#ef4444" />
      {/* Face & Hair */}
      <rect x="6" y="3" width="7" height="4" fill="#fbcfe8" />
      <rect x="10" y="4" width="2" height="1" fill="#000" />
      {/* Camo Torso */}
      <rect x="5" y="7" width="9" height="6" fill="#15803d" />
      <rect x="7" y="8" width="3" height="4" fill="#166534" />
      {/* Rifle Gun */}
      <rect x="12" y="8" width="7" height="3" fill="#0f172a" />
      <rect x="18" y="9" width="1" height="1" fill="#f59e0b" className="contra-muzzle-flash" />
      {/* Legs */}
      <rect x="5" y="13" width="3" height="6" fill="#1e293b" />
      <rect x="10" y="13" width="3" height="6" fill="#0f172a" />
      <rect x="4" y="19" width="4" height="2" fill="#020617" />
      <rect x="10" y="19" width="4" height="2" fill="#020617" />
    </svg>
    {/* Fired Laser Projectile */}
    <div className="contra-laser-pellet" />
  </div>
);

// 6. Pixel Duck (Duck Hunt Flying Mallard)
const PixelDuckHunt = () => (
  <div className="pixel-duck-flapper">
    <svg width="36" height="32" viewBox="0 0 18 16" style={{ imageRendering: 'pixelated' }}>
      {/* Green Mallard Head */}
      <rect x="10" y="1" width="5" height="5" fill="#10b981" />
      <rect x="15" y="2" width="3" height="2" fill="#f59e0b" /> {/* Beak */}
      <rect x="12" y="2" width="1" height="1" fill="#000" />
      {/* Body */}
      <rect x="3" y="6" width="11" height="6" fill="#92400e" />
      <rect x="1" y="7" width="3" height="3" fill="#78350f" />
      {/* Flapping Wing */}
      <rect x="6" y="2" width="6" height="5" fill="#d97706" className="duck-wing" />
      {/* Orange Feet */}
      <rect x="5" y="12" width="3" height="2" fill="#ea580c" />
    </svg>
  </div>
);

// 7. Pixel Flappy Bird
const PixelFlappyBird = () => (
  <div className="pixel-bird-bob">
    <svg width="30" height="26" viewBox="0 0 15 13" style={{ imageRendering: 'pixelated' }}>
      {/* Body */}
      <rect x="2" y="2" width="10" height="8" fill="#facc15" />
      <rect x="8" y="2" width="4" height="4" fill="#ffffff" />
      <rect x="10" y="3" width="1" height="2" fill="#000" />
      {/* Big Orange Lips/Beak */}
      <rect x="12" y="5" width="3" height="4" fill="#f97316" />
      {/* White Wing */}
      <rect x="3" y="5" width="5" height="4" fill="#ffffff" className="flappy-wing" />
    </svg>
  </div>
);

// 8. Pixel Space Invader
const PixelSpaceInvader = ({ color = '#a855f7' }) => (
  <svg width="32" height="26" viewBox="0 0 16 13" style={{ imageRendering: 'pixelated' }}>
    {/* Classic Alien Shape */}
    <rect x="5" y="0" width="6" height="2" fill={color} />
    <rect x="3" y="2" width="10" height="2" fill={color} />
    <rect x="2" y="4" width="12" height="3" fill={color} />
    <rect x="0" y="5" width="16" height="2" fill={color} />
    {/* Eyes */}
    <rect x="4" y="4" width="2" height="2" fill="#000" />
    <rect x="10" y="4" width="2" height="2" fill="#000" />
    {/* Tentacles */}
    <rect x="0" y="7" width="2" height="4" fill={color} />
    <rect x="14" y="7" width="2" height="4" fill={color} />
    <rect x="4" y="9" width="2" height="3" fill={color} />
    <rect x="10" y="9" width="2" height="3" fill={color} />
  </svg>
);

export default function RetroArcadeSprites() {
  const handleSpriteClick = (soundType = 'coin') => {
    try {
      if (soundType === 'coin') themedAudio.play8BitCoin();
      else themedAudio.play8BitLevelClear();
    } catch (_) {}
  };

  return (
    <div className="retro-arcade-stage" aria-hidden="true">
      {/* 🚁 SKY PATROL: 8-Bit Helicopter flying across upper atmosphere */}
      <motion.div
        className="arcade-sprite-runner chopper-path"
        initial={{ x: '-15vw', y: '8vh' }}
        animate={{ x: '115vw', y: ['8vh', '11vh', '7vh', '10vh'] }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'linear',
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
        }}
        onClick={() => handleSpriteClick('coin')}
      >
        <PixelHelicopter />
      </motion.div>

      {/* 🦆 SKY HUNTER: Duck Hunt Duck flying diagonally */}
      <motion.div
        className="arcade-sprite-runner duck-path"
        initial={{ x: '-10vw', y: '45vh' }}
        animate={{ x: '110vw', y: '12vh' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          delay: 4,
          ease: 'linear'
        }}
        onClick={() => handleSpriteClick('coin')}
      >
        <PixelDuckHunt />
      </motion.div>

      {/* 🐦 RETRO BIRD: Flappy Bird bobbing across mid-sky */}
      <motion.div
        className="arcade-sprite-runner bird-path"
        initial={{ x: '115vw', y: '22vh' }}
        animate={{ x: '-15vw', y: ['22vh', '26vh', '20vh', '24vh'] }}
        transition={{
          duration: 19,
          repeat: Infinity,
          delay: 2,
          ease: 'linear',
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
        }}
        onClick={() => handleSpriteClick('coin')}
      >
        <PixelFlappyBird />
      </motion.div>

      {/* 👾 SPACE INVADER: Alien ship cruising */}
      <motion.div
        className="arcade-sprite-runner invader-path"
        initial={{ x: '-10vw', y: '28vh' }}
        animate={{ x: '110vw', y: ['28vh', '30vh', '27vh'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          delay: 7,
          ease: 'linear'
        }}
        onClick={() => handleSpriteClick('clear')}
      >
        <PixelSpaceInvader color="#c084fc" />
      </motion.div>

      {/* 🟡 PAC-MAN & GHOST CHASE: Mid-Screen Arcade Chase */}
      <motion.div
        className="arcade-sprite-runner pacman-chase-path"
        initial={{ x: '-30vw', y: '58vh' }}
        animate={{ x: '120vw', y: '58vh' }}
        transition={{
          duration: 18,
          repeat: Infinity,
          delay: 1,
          ease: 'linear'
        }}
        onClick={() => handleSpriteClick('coin')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          <PixelPacman />
          <PixelGhost color="#ef4444" />
          <PixelGhost color="#38bdf8" />
        </div>
      </motion.div>

      {/* 🪖 CONTRA COMMANDO: Running and firing laser pulse bullets */}
      <motion.div
        className="arcade-sprite-runner contra-path"
        initial={{ x: '115vw', y: '68vh' }}
        animate={{ x: '-20vw', y: '68vh' }}
        transition={{
          duration: 14,
          repeat: Infinity,
          delay: 5,
          ease: 'linear'
        }}
        onClick={() => handleSpriteClick('clear')}
      >
        <PixelContraCommando />
      </motion.div>

      {/* 🦖 GROUND PATROL: Classic Pixel Dino running along bottom floor */}
      <motion.div
        className="arcade-sprite-runner dino-runner-path"
        initial={{ x: '-15vw', y: '86vh' }}
        animate={{
          x: '115vw',
          y: ['86vh', '86vh', '81vh', '86vh', '86vh', '80vh', '86vh']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          delay: 0.5,
          ease: 'linear',
          y: { duration: 15, repeat: Infinity, times: [0, 0.25, 0.3, 0.35, 0.7, 0.75, 0.8] }
        }}
        onClick={() => handleSpriteClick('coin')}
      >
        <PixelDino />
      </motion.div>

      {/* 🦍 KING KONG: Heavy arcade ape stomping across ground */}
      <motion.div
        className="arcade-sprite-runner kong-path"
        initial={{ x: '115vw', y: '84vh' }}
        animate={{
          x: '-20vw',
          y: ['84vh', '83vh', '84vh', '83vh']
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          delay: 8,
          ease: 'linear',
          y: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
        }}
        onClick={() => handleSpriteClick('clear')}
      >
        <PixelKingKong />
      </motion.div>
    </div>
  );
}
