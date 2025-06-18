
// CozyMLS Brand System - Real Estate Platform
export const brand = {
  colors: {
    primary: {
      50: '#fef7f0',
      100: '#fdeee0',
      200: '#fbd9c0',
      300: '#f7be96',
      400: '#f2996a',
      500: '#ed7849',
      600: '#de5f35',
      700: '#b84a2d',
      800: '#923d2a',
      900: '#773327',
      950: '#401912',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#fef3f2',
      100: '#fee5e3',
      200: '#fdd0cc',
      300: '#faaea8',
      400: '#f57e76',
      500: '#ed544c',
      600: '#da3732',
      700: '#b92b27',
      800: '#992724',
      900: '#7f2623',
    },
    cozy: {
      50: '#fffcf5',
      100: '#fef8ea',
      200: '#fdeec9',
      300: '#fbe09d',
      400: '#f8cd6f',
      500: '#f5b849',
      600: '#e89d24',
      700: '#c1791b',
      800: '#9c5e1c',
      900: '#804e1b',
    },
    success: {
      500: '#10b981',
      600: '#059669',
    },
    warning: {
      500: '#f59e0b',
      600: '#d97706',
    },
    error: {
      500: '#ef4444',
      600: '#dc2626',
    }
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
  },
  spacing: {
    sidebar: '280px',
    header: '72px',
  }
} as const;

export type BrandColors = typeof brand.colors;
