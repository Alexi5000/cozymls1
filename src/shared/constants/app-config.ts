/**
 * Application Configuration Constants
 * 
 * Centralized configuration to eliminate magic numbers and ensure consistency.
 * All hardcoded values should be defined here and imported where needed.
 */

export const APP_CONFIG = {
  /**
   * Pagination settings for list views
   */
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    MIN_PAGE_SIZE: 10,
  },

  /**
   * Default values for entity creation
   */
  DEFAULTS: {
    CONTACT_STATUS: 'lead' as const,
    DEAL_STAGE: 'prospect' as const,
    DEAL_PROBABILITY: 25,
    ACTIVITY_PRIORITY: 'medium' as const,
    PROPERTY_STATUS: 'available' as const,
  },

  /**
   * Application limits and constraints
   */
  LIMITS: {
    MAX_TAGS: 10,
    MAX_FILE_SIZE_MB: 5,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_TITLE_LENGTH: 100,
    MAX_NAME_LENGTH: 100,
    MAX_EMAIL_LENGTH: 255,
    MAX_PHONE_LENGTH: 20,
  },

  /**
   * Logging configuration
   */
  LOGGING: {
    ENABLED: import.meta.env.DEV || import.meta.env.VITE_ENABLE_LOGGING === 'true',
    LOG_LEVELS: ['🟢 INFO', '⚠️ WARN', '🔴 ERROR'] as const,
  },

  /**
   * UI thresholds and breakpoints
   */
  UI: {
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    DESKTOP_BREAKPOINT: 1280,
    DEBOUNCE_DELAY_MS: 300,
    TOAST_DURATION_MS: 3000,
  },

  /**
   * Query configuration for React Query
   */
  QUERY: {
    STALE_TIME_MS: 5 * 60 * 1000, // 5 minutes
    CACHE_TIME_MS: 10 * 60 * 1000, // 10 minutes
    RETRY_COUNT: 3,
    RETRY_DELAY_MS: 1000,
  },

  /**
   * Date format strings
   */
  DATE_FORMATS: {
    DISPLAY: 'MMM dd, yyyy',
    DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
    ISO: "yyyy-MM-dd'T'HH:mm:ss",
    DATE_ONLY: 'yyyy-MM-dd',
  },
} as const;

/**
 * Environment-aware configuration
 */
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
} as const;
