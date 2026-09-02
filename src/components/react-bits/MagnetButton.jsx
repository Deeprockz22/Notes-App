import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * MagnetButton Component from React Bits
 * Provides a magnetic cursor-attraction effect for primary buttons and toggles.
 */
export default function MagnetButton({
  children,
  className = '',
  magnetStrength = 0.35,
  active = false,
  onClick,
  disabled = false,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * magnetStrength, y: middleY * magnetStrength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 18, mass: 0.1 }}
      onClick={onClick}
      disabled={disabled}
      className={`magnet-btn ${active ? 'active' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
