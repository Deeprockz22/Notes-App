import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckSquare, FileText } from 'lucide-react';

const TABS = [
  { id: 'timer', label: 'Timer', icon: Clock },
  { id: 'tasks', label: 'Tasks', icon: CheckSquare },
  { id: 'notes', label: 'Notes', icon: FileText }
];

export default function DockNav({ activeTab, setActiveTab, taskCount = 0, noteCount = 0 }) {
  return (
    <nav className="dock-nav-container" aria-label="Main Navigation">
      <div className="dock-nav">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          let badge = null;
          if (tab.id === 'tasks' && taskCount > 0) badge = taskCount;
          if (tab.id === 'notes' && noteCount > 0) badge = noteCount;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`dock-tab ${isActive ? 'active' : ''}`}
              role="tab"
              aria-selected={isActive}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDockIndicator"
                  className="dock-indicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              <span className="dock-icon">
                <Icon size={18} />
              </span>
              <span className="dock-label">{tab.label}</span>

              {badge !== null && (
                <span className="dock-badge">{badge}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
