import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { THEME_MODES } from '../../utils/themePresets';

export default function DynamicIslandModesDock({ currentTheme, setTheme }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dockRef = useRef(null);

  const activeTheme = THEME_MODES.find((t) => t.id === currentTheme) || THEME_MODES[0];

  // Close when clicking outside (especially useful on mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('pointerdown', handleClickOutside);
    return () => document.removeEventListener('pointerdown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dockRef}
      className={`dynamic-island-dock-container ${isExpanded ? 'is-expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      aria-label="Theme Modes Dynamic Island"
    >
      <motion.div
        layout
        className="dynamic-island-island"
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
      >
        {/* Collapsed Pill View */}
        {!isExpanded && (
          <motion.button
            layout
            key="collapsed-pill"
            className="dynamic-island-collapsed"
            onClick={() => setIsExpanded(true)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            title="Switch Experience Mode"
            aria-expanded={false}
          >
            <span className="island-active-dot" />
            <span className="island-collapsed-label">{activeTheme.name}</span>
            <span className="island-badge-hint">MODES</span>
          </motion.button>
        )}

        {/* Expanded Island List View (Pure Typography, No Emojis) */}
        {isExpanded && (
          <motion.div
            layout
            key="expanded-list"
            className="dynamic-island-expanded"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
          >
            <div className="dynamic-island-header">
              <span className="island-header-title">EXPERIENCE MODES</span>
              <button
                className="island-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(false);
                }}
                aria-label="Collapse Modes Dock"
              >
                ✕
              </button>
            </div>

            <div className="dynamic-island-scroll-list">
              {THEME_MODES.map((mode) => {
                const isActive = currentTheme === mode.id;

                return (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setTheme(mode.id);
                    }}
                    className={`island-mode-item ${isActive ? 'active-mode' : ''}`}
                    aria-selected={isActive}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeModeIslandHighlight"
                        className="island-mode-highlight"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}

                    <span className="island-mode-dot" />
                    <span className="island-mode-name">{mode.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
