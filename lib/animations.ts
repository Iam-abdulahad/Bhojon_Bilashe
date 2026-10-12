/**
 * Motion constants from Style.md §7.1
 * Shared across Framer Motion and GSAP
 */

/** Easing curves as cubic-bezier arrays (compatible with Framer Motion) */
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
};

/** Durations in seconds */
export const duration = {
  micro: 0.2,
  base: 0.6,
  slow: 1.0,
  hero: 1.6,
};

/** Framer Motion transition presets */
export const transitions = {
  smooth: { duration: duration.base, ease: ease.smooth },
  slow: { duration: duration.slow, ease: ease.smooth },
  hero: { duration: duration.hero, ease: ease.smooth },
  micro: { duration: duration.micro, ease: ease.smooth },
  pageTransition: { duration: duration.base, ease: ease.inOut },
  bounce: { duration: duration.base, ease: ease.bounce },
} as const;

/** Standard reveal animation (fade up on scroll) */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/** Stagger children container */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

/** Scale up on enter */
export const scaleUpVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};
