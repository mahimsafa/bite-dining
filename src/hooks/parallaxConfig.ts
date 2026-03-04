export const PARALLAX_CONFIG = {
  section: {
    maxRotateDeg: 4,
    spring: { damping: 25, stiffness: 150 },
    perspective: 1200,
  },
  card: {
    maxRotateDeg: 6,
    spring: { damping: 22, stiffness: 180 },
    perspective: 800,
  },
} as const;
