import { useEffect, useState } from 'react';

interface FontLoadingState {
  loaded: boolean;
  error: boolean;
  loading: boolean;
}

export const useFontLoading = (fontFamilies: string[]): FontLoadingState => {
  const [state, setState] = useState<FontLoadingState>({
    loaded: false,
    error: false,
    loading: true,
  });

  useEffect(() => {
    // Check if fonts are already loaded
    if (document.fonts && document.fonts.check) {
      const checkFonts = async () => {
        try {
          const promises = fontFamilies.map(family => 
            document.fonts.load(`16px ${family}`)
          );
          
          await Promise.all(promises);
          
          // Verify fonts are loaded
          const allLoaded = fontFamilies.every(family =>
            document.fonts.check(`16px ${family}`)
          );
          
          setState({
            loaded: allLoaded,
            error: false,
            loading: false,
          });
        } catch (error) {
          console.warn('Font loading failed:', error);
          setState({
            loaded: false,
            error: true,
            loading: false,
          });
        }
      };

      // Check if fonts are already ready
      if (document.fonts.ready) {
        document.fonts.ready.then(checkFonts);
      } else {
        checkFonts();
      }
    } else {
      // Fallback for browsers without font loading API
      setState({
        loaded: true,
        error: false,
        loading: false,
      });
    }
  }, [fontFamilies]);

  return state;
};

// Hook for the specific fonts used in the app
export const useAppFonts = () => {
  return useFontLoading(['Inter', 'Playfair Display']);
};