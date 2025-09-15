// Instant rendering utilities for zero-delay preview loading

export const instantRender = {
  // Disable all CSS animations for instant loading
  disableAnimations: () => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-delay: 0ms !important;
          transition-duration: 0.01ms !important;
          transition-delay: 0ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  },

  // Remove image loading states for instant preview
  preloadImages: () => {
    if (typeof document !== 'undefined') {
      // Force all images to load eagerly
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.setAttribute('loading', 'eager');
      });
    }
  },

  // Instant state updates without loading delays
  instantState: <T>(initialValue: T) => ({
    value: initialValue,
    loading: false,
    error: null,
  }),

  // Skip intersection observer for instant loading
  noIntersection: () => ({
    inView: true,
    ref: () => {},
  }),
};

// Initialize instant rendering optimizations
if (typeof window !== 'undefined') {
  // Apply instant rendering on page load
  document.addEventListener('DOMContentLoaded', () => {
    instantRender.disableAnimations();
    instantRender.preloadImages();
  });
}