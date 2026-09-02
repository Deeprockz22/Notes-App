import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AnimatedList Component from React Bits
 * Provides fluid entry, exit, and reorder animations for items.
 */
export default function AnimatedList({
  children,
  className = '',
  itemClassName = '',
  staggerDelay = 0.05
}) {
  return (
    <div className={`animated-list-container ${className}`}>
      <AnimatePresence mode="popLayout">
        {React.Children.map(children, (child, index) => {
          if (!child) return null;
          return (
            <motion.div
              key={child.key || index}
              layout
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{
                duration: 0.25,
                delay: index * staggerDelay,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className={itemClassName}
            >
              {child}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
