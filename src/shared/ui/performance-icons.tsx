/**
 * Performance-optimized icon loading strategy
 * This file provides guidelines and utilities for optimal icon usage
 */

import { CoreIcon } from './optimized-icon-simple';

// Common icon combinations for better bundling
export const NavigationIcons = {
  Home: 'home' as const,
  Menu: 'menu' as const,
  ChevronRight: 'chevron-right' as const,
  ChevronDown: 'chevron-down' as const,
  ArrowLeft: 'arrow-left' as const,
  ArrowRight: 'arrow-right' as const,
};

export const ActionIcons = {
  Plus: 'plus' as const,
  Edit: 'edit' as const,
  Delete: 'trash' as const,
  Save: 'save' as const,
  Search: 'search' as const,
  Filter: 'filter' as const,
};

export const BusinessIcons = {
  Users: 'users' as const,
  Building: 'building' as const,
  Dollar: 'dollar' as const,
  TrendingUp: 'trending-up' as const,
  Chart: 'chart' as const,
  Target: 'target' as const,
};

// Icon component with performance optimization  
export { CoreIcon as PerfIcon };

// Performance tips for developers
export const iconPerformanceTips = {
  // Use direct imports for frequently used icons
  preferDirectImport: true,
  
  // Bundle size impact of each icon category
  bundleImpact: {
    navigation: '~2KB',
    actions: '~3KB', 
    business: '~4KB',
    system: '~2KB',
  },
  
  // Recommended usage patterns
  usage: {
    // For icons used in multiple places
    reusable: 'Import directly from lucide-react',
    
    // For icons used once or rarely
    occasional: 'Use CoreIcon component with name prop',
    
    // For dynamic icon selection
    dynamic: 'Use icon registry in CoreIcon',
  },
} as const;