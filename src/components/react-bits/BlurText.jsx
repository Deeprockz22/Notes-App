import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * BlurText Component from React Bits
 * Animates text words or characters in with a smooth blur fade-in transition.
 */
export default function BlurText({
  text = '',
  delay = 100,
  className = '',
  animateBy = 'words', // 'words' | 'letters'
  direction = 'top', // 'top' | 'bottom'
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    setInView(true);
  }, [text]);

  const defaultFrom =
    direction === 'top'
      ? { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,-20px,0)' }
      : { filter: 'blur(10px)', opacity: 0, transform: 'translate3d(0,20px,0)' };

  const defaultTo = {
    filter: 'blur(0px)',
    opacity: 1,
    transform: 'translate3d(0,0,0)'
  };

  return (
    <p ref={ref} className={`blur-text-wrapper ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
        >
          {element === ' ' ? '\u00A0' : element}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </p>
  );
}
