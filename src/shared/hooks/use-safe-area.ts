import { useEffect, useState } from 'react';

interface SafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export function useSafeArea() {
  const [safeAreaInsets, setSafeAreaInsets] = useState<SafeAreaInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  });

  useEffect(() => {
    const updateSafeArea = () => {
      // Get CSS environment variables for safe area insets
      const computedStyle = getComputedStyle(document.documentElement);
      
      setSafeAreaInsets({
        top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0'),
        right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0'),
        bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
        left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0'),
      });
    };

    updateSafeArea();
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', updateSafeArea);
    window.addEventListener('resize', updateSafeArea);

    return () => {
      window.removeEventListener('orientationchange', updateSafeArea);
      window.removeEventListener('resize', updateSafeArea);
    };
  }, []);

  const applySafeArea = (element: 'top' | 'bottom' | 'left' | 'right' | 'all') => {
    const { top, right, bottom, left } = safeAreaInsets;
    
    switch (element) {
      case 'top':
        return { paddingTop: `${top}px` };
      case 'bottom':
        return { paddingBottom: `${bottom}px` };
      case 'left':
        return { paddingLeft: `${left}px` };
      case 'right':
        return { paddingRight: `${right}px` };
      case 'all':
        return {
          paddingTop: `${top}px`,
          paddingRight: `${right}px`,
          paddingBottom: `${bottom}px`,
          paddingLeft: `${left}px`,
        };
      default:
        return {};
    }
  };

  return {
    safeAreaInsets,
    applySafeArea,
    hasSafeArea: Object.values(safeAreaInsets).some(inset => inset > 0),
  };
}