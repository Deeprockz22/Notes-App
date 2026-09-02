import React, { useState } from 'react';
import {
  Palette,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Tv,
  Check
} from 'lucide-react';
import ShinyText from './react-bits/ShinyText';
import MagnetButton from './react-bits/MagnetButton';
import FocusLogo from './brand/FocusLogo';
import { THEME_MODES } from '../utils/themePresets';
import { COMPANIONS } from '../utils/companionPresets';

export default function Header({
  theme,
  setTheme,
  soundEnabled,
  toggleSound,
  openSettings,
  openFullscreen,
  scanlinesEnabled,
  toggleScanlines,
  companionType = 'dino',
  openCompanionPicker
}) {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* Pet Wardrobe Switcher Button */}
        <button
          className="theme-mode-trigger-btn pet-wardrobe-trigger-btn"
          onClick={openCompanionPicker}
          title="Change Active Companion Pet"
        >
          <span className="theme-mode-icon">
            {COMPANIONS.find((c) => c.id === companionType)?.icon || '🦖'}
          </span>
          <span className="theme-mode-name">Pets</span>
        </button>

        {/* CRT Scanline Toggle for Retro Arcade mode */}
        {theme === 'retro-pixel' && (
          <button
            className={`icon-btn crt-toggle-btn ${scanlinesEnabled ? 'active-crt' : ''}`}
            onClick={toggleScanlines}
            title={scanlinesEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
          >
            <Tv size={16} />
          </button>
        )}

        {/* Sound toggle */}
        <MagnetButton
          className="icon-btn"
          onClick={toggleSound}
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} className="muted-icon" />}
        </MagnetButton>
      </div>

      <div className="header-center">
        <div className="brand-container">
          <FocusLogo size={22} className="brand-logo-icon" />
          <h1 className="brand-title">
            <ShinyText
              text={theme === 'retro-pixel' ? 'FOCUS 8-BIT' : theme === 'haunted' ? 'FOCUS' : 'FOCUS'}
              speed={2.5}
              className="brand-shiny"
            />
          </h1>
          <span className="brand-dot"></span>
        </div>
      </div>

      <div className="header-right">
        <MagnetButton
          className="icon-btn"
          onClick={openFullscreen}
          title="Fullscreen Zen Mode"
          aria-label="Fullscreen Zen Mode"
        >
          <Maximize2 size={18} />
        </MagnetButton>

        <MagnetButton
          className="icon-btn"
          onClick={openSettings}
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={18} />
        </MagnetButton>
      </div>
    </header>
  );
}
