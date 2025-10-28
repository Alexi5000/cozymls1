// 🎨 Laser Flow Animation Configuration
// NO MAGIC NUMBERS - All constants defined here

export const LASER_FLOW_CONFIG = {
  // Camera Settings
  CAMERA_POSITION: [0, 0, 5] as const,
  CAMERA_FOV: 75,
  
  // Laser Line Settings
  LASER_COUNT: 50,              // Number of flowing laser lines
  LASER_LENGTH: 2,              // Length of each laser trail
  LASER_SPEED: 0.015,           // Animation speed
  LASER_SPREAD: 8,              // How spread out the lasers are
  
  // Colors (Theme-aware)
  LASER_COLORS: {
    PRIMARY: '#3b82f6',         // Blue
    SECONDARY: '#8b5cf6',       // Purple  
    ACCENT: '#06b6d4',          // Cyan
  },
  
  // Performance
  LASER_OPACITY: 0.6,
  PARTICLE_SIZE: 0.05,
  
  // Animation
  FLOW_DIRECTION: 'horizontal', // 'horizontal' | 'vertical' | 'diagonal'
  GLOW_INTENSITY: 1.2,
} as const;

// Type safety
export type LaserFlowConfig = typeof LASER_FLOW_CONFIG;
