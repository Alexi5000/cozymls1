/**
 * Structured Logger with Emoji Indicators
 * 
 * Provides consistent, categorized logging across the application.
 * Logs are only active in development unless explicitly enabled.
 */

import { APP_CONFIG } from '@/shared/constants/app-config';

type LogLevel = '🟢 INFO' | '⚠️ WARN' | '🔴 ERROR';

/**
 * Internal logging function that respects configuration
 */
function log(level: LogLevel, context: string, message: string, data?: unknown) {
  if (!APP_CONFIG.LOGGING.ENABLED) return;

  const timestamp = new Date().toISOString();
  const logMessage = `${level} [${timestamp}] [${context}] ${message}`;

  switch (level) {
    case '🟢 INFO':
      console.log(logMessage, data !== undefined ? data : '');
      break;
    case '⚠️ WARN':
      console.warn(logMessage, data !== undefined ? data : '');
      break;
    case '🔴 ERROR':
      console.error(logMessage, data !== undefined ? data : '');
      break;
  }
}

/**
 * Structured logger with categorized methods
 */
export const logger = {
  /**
   * General informational messages
   */
  info: (context: string, message: string, data?: unknown) => {
    log('🟢 INFO', context, message, data);
  },

  /**
   * Warning messages for potential issues
   */
  warn: (context: string, message: string, data?: unknown) => {
    log('⚠️ WARN', context, message, data);
  },

  /**
   * Error messages for failures
   */
  error: (context: string, message: string, error?: unknown) => {
    log('🔴 ERROR', context, message, error);
  },

  /**
   * Database operations logging
   */
  database: (action: string, table: string, data?: unknown) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`💾 DB [${table}] ${action}`, data !== undefined ? data : '');
  },

  /**
   * Authentication events logging
   */
  auth: (event: string, data?: unknown) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`🔐 AUTH ${event}`, data !== undefined ? data : '');
  },

  /**
   * Network request logging
   */
  network: (method: string, url: string, status?: number) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    const statusText = status ? `[${status}]` : '';
    console.log(`🌐 ${method} ${url} ${statusText}`);
  },

  /**
   * UI interaction logging
   */
  ui: (component: string, action: string, data?: unknown) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`🎨 UI [${component}] ${action}`, data !== undefined ? data : '');
  },

  /**
   * Performance timing logging
   */
  performance: (operation: string, durationMs: number) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`⚡ PERF [${operation}] ${durationMs}ms`);
  },

  /**
   * Cache operations logging
   */
  cache: (action: string, key: string, data?: unknown) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`📦 CACHE [${key}] ${action}`, data !== undefined ? data : '');
  },

  /**
   * Form submission logging
   */
  form: (formName: string, action: string, data?: unknown) => {
    if (!APP_CONFIG.LOGGING.ENABLED) return;
    console.log(`📝 FORM [${formName}] ${action}`, data !== undefined ? data : '');
  },
};

/**
 * Performance measurement utility
 */
export function measurePerformance<T>(
  operation: string,
  fn: () => T | Promise<T>
): T | Promise<T> {
  const start = performance.now();
  const result = fn();

  if (result instanceof Promise) {
    return result.finally(() => {
      const duration = performance.now() - start;
      logger.performance(operation, Math.round(duration));
    }) as Promise<T>;
  }

  const duration = performance.now() - start;
  logger.performance(operation, Math.round(duration));
  return result;
}
