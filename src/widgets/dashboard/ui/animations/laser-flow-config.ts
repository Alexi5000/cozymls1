// 🎨 Laser Flow Animation Configuration
// NO MAGIC NUMBERS - All constants defined here

export const LASER_FLOW_CONFIG = {
  // Visual Props (used by LaserFlow component)
  WISP_DENSITY: 1,
  FLOW_SPEED: 0.35,
  VERTICAL_SIZING: 2.0,
  HORIZONTAL_SIZING: 0.5,
  FOG_INTENSITY: 0.45,
  FOG_SCALE: 0.3,
  WISP_SPEED: 15.0,
  WISP_INTENSITY: 5.0,
  FLOW_STRENGTH: 0.25,
  DECAY: 1.1,
  FALLOFF_START: 1.2,
  FOG_FALL_SPEED: 0.6,
  
  // Beam Positioning
  HORIZONTAL_BEAM_OFFSET: 0.1,
  VERTICAL_BEAM_OFFSET: 0.0,
  
  // Mouse Interaction
  MOUSE_SMOOTH_TIME: 0.0,
  MOUSE_TILT_STRENGTH: 0.01,
  
  // Colors (Theme-aware)
  COLOR: '#FF79C6',             // Primary laser color
  
  // Hero Section Integration
  HERO_OPACITY: 0.6,            // Background opacity behind hero
  HERO_Z_INDEX: 0,              // Layer behind content
} as const;

// Type safety
export type LaserFlowConfig = typeof LASER_FLOW_CONFIG;
