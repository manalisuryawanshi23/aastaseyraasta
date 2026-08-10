import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  routeKey: string;
  className?: string;
}

/**
 * PageTransition wrapped with Framer Motion AnimatePresence mode="wait"
 * Provides a subtle fade-in and upward slide for smooth navigation.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  routeKey,
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={routeKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1], // Custom smooth ease-out curve
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

interface ContentFadeProps {
  children: React.ReactNode;
  contentKey?: string | number;
  className?: string;
  delay?: number;
}

/**
 * ContentFade for subtle content updates (e.g. category filter changes, tab switching, search updates)
 */
export const ContentFade: React.FC<ContentFadeProps> = ({
  children,
  contentKey,
  className = '',
  delay = 0,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={contentKey}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          duration: 0.22,
          delay: delay,
          ease: 'easeOut',
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
