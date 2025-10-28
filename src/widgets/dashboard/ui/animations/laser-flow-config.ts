// 🎨 Laser Flow Animation Configuration
// NO MAGIC NUMBERS - All constants defined here

export const LASER_FLOW_CONFIG = {
  // Visual Props (used by LaserFlow component)
  WISP_DENSITY: 2.0,            // 🔥 Increased visibility (was 1.5)
  FLOW_SPEED: 0.5,              // ⚡ Faster flow (was 0.35)
  VERTICAL_SIZING: 3.5,         // 📏 Taller beam to cover cards (was 2.0)
  HORIZONTAL_SIZING: 1.2,       // 📐 Wider beam (was 0.5)
  FOG_INTENSITY: 0.7,           // 🌫️ More intense fog (was 0.6)
  FOG_SCALE: 0.3,
  WISP_SPEED: 15.0,
  WISP_INTENSITY: 5.0,
  FLOW_STRENGTH: 0.25,
  DECAY: 1.1,
  FALLOFF_START: 1.2,
  FOG_FALL_SPEED: 0.6,
  
  // Beam Positioning - Target top-right card with downward flow
  HORIZONTAL_BEAM_OFFSET: 0.45, // 👉 More right for top-right card (was 0.35)
  VERTICAL_BEAM_OFFSET: -0.6,   // ⬆️ Higher up for stronger downward flow (was -0.4)
  
  // Mouse Interaction
  MOUSE_SMOOTH_TIME: 0.0,
  MOUSE_TILT_STRENGTH: 0.01,
  
  // Colors (Theme-aware)
  COLOR_HSL: 'hsl(20, 90%, 48%)',  // 🎨 Reference for theme consistency
  COLOR: '#E85D2E',                // 🎨 Hex format for hexToRGB parser (hsl(20,90%,48%) converted)
  
  // Hero Section Integration
  HERO_OPACITY: 0.9,            // 💫 More visible (was 0.8)
  HERO_Z_INDEX: 15,             // 📚 Layer ABOVE cards (z-10) but BELOW interactive content
  
  // Container Positioning - Responsive for mobile/tablet/desktop
  // Desktop (4-col grid) - Target top-right card
  CONTAINER_TOP_DESKTOP: '0%',
  CONTAINER_RIGHT_DESKTOP: '50%',  // 📍 Centered over card 1
  CONTAINER_WIDTH_DESKTOP: '30%',  // 📏 Narrower focus on top-right card
  
  // Mobile/Tablet (2-col grid) - Target top-right card
  CONTAINER_TOP_MOBILE: '15%',     // 📍 Offset for mobile header
  CONTAINER_RIGHT_MOBILE: '0%',    // 📍 Right edge alignment
  CONTAINER_WIDTH_MOBILE: '50%',   // 📏 Covers right column (50% of 2-col)
  
  // Shared
  CONTAINER_HEIGHT: '40%',         // 📏 Reduced height for tighter focus
} as const;

// Type safety
export type LaserFlowConfig = typeof LASER_FLOW_CONFIG;
