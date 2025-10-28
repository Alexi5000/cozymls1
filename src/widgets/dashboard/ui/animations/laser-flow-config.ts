// 🎨 Laser Flow Animation Configuration
// NO MAGIC NUMBERS - All constants defined here

export const LASER_FLOW_CONFIG = {
  // Visual Props (used by LaserFlow component)
  WISP_DENSITY: 1.5,            // 🔥 Increased visibility (was 1)
  FLOW_SPEED: 0.5,              // ⚡ Faster flow (was 0.35)
  VERTICAL_SIZING: 3.5,         // 📏 Taller beam to cover cards (was 2.0)
  HORIZONTAL_SIZING: 1.2,       // 📐 Wider beam (was 0.5)
  FOG_INTENSITY: 0.6,           // 🌫️ More intense fog (was 0.45)
  FOG_SCALE: 0.3,
  WISP_SPEED: 15.0,
  WISP_INTENSITY: 5.0,
  FLOW_STRENGTH: 0.25,
  DECAY: 1.1,
  FALLOFF_START: 1.2,
  FOG_FALL_SPEED: 0.6,
  
  // Beam Positioning - Target top-right card
  HORIZONTAL_BEAM_OFFSET: 0.35, // 👉 Push right towards card 2 (was 0.1)
  VERTICAL_BEAM_OFFSET: -0.4,   // ⬆️ Position at TOP for downward flow (was 0.0)
  
  // Mouse Interaction
  MOUSE_SMOOTH_TIME: 0.0,
  MOUSE_TILT_STRENGTH: 0.01,
  
  // Colors (Theme-aware)
  COLOR: 'hsl(20, 90%, 48%)',   // 🎨 Match button orange (was #FF79C6)
  
  // Hero Section Integration
  HERO_OPACITY: 0.8,            // 💫 More visible (was 0.6)
  HERO_Z_INDEX: 15,             // 📚 Layer ABOVE cards (z-10) but BELOW interactive content (was 0)
  
  // Container Positioning - Constrain to top-right quadrant
  CONTAINER_TOP: '0%',          // 📍 Position at top of hero
  CONTAINER_RIGHT: '0%',        // 📍 Align to right side
  CONTAINER_WIDTH: '60%',       // 📏 Cover top-right region
  CONTAINER_HEIGHT: '50%',      // 📏 Cover top half of hero
} as const;

// Type safety
export type LaserFlowConfig = typeof LASER_FLOW_CONFIG;
