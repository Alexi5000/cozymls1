interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
  sizes?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
}

interface ResponsiveImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  options?: ImageOptimizationOptions;
}

// Image optimization utilities
export const imageUtils = {
  // Generate responsive image sources
  generateSrcSet: (src: string, widths: number[] = [480, 768, 1024, 1280, 1920]) => {
    return widths
      .map(width => `${src}?w=${width}&q=80 ${width}w`)
      .join(', ');
  },

  // Generate sizes attribute for responsive images
  generateSizes: (breakpoints?: string[]) => {
    const defaultBreakpoints = [
      '(max-width: 640px) 100vw',
      '(max-width: 1024px) 50vw',
      '33vw'
    ];
    return (breakpoints || defaultBreakpoints).join(', ');
  },

  // Create optimized image URL
  optimizeImageUrl: (src: string, options: ImageOptimizationOptions = {}) => {
    const {
      quality = 80,
      format = 'webp',
    } = options;

    const url = new URL(src, window.location.origin);
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('f', format);
    
    return url.toString();
  },

  // Preload critical images
  preloadImage: (src: string, options: ImageOptimizationOptions = {}) => {
    const optimizedSrc = imageUtils.optimizeImageUrl(src, options);
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = optimizedSrc;
    
    if (options.sizes) {
      link.setAttribute('imagesizes', options.sizes);
    }
    
    document.head.appendChild(link);
  },

  // Create blur placeholder
  createBlurPlaceholder: (src: string) => {
    // Simple base64 blur placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad">
            <stop offset="0%" style="stop-color:#f3f4f6"/>
            <stop offset="100%" style="stop-color:#e5e7eb"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grad)"/>
      </svg>
    `)}`;
  },

  // Intersection Observer for lazy loading
  createLazyLoader: (options: IntersectionObserverInit = {}) => {
    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const src = img.dataset.src;
          
          if (src) {
            img.src = src;
            img.classList.remove('blur-sm');
            img.classList.add('transition-all', 'duration-300');
            img.removeAttribute('data-src');
          }
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1,
      ...options,
    });
  },

  // Check if browser supports modern image formats
  supportsWebP: () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  },

  supportsAVIF: () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
  },

  // Get optimal format based on browser support
  getOptimalFormat: (): 'avif' | 'webp' | 'jpeg' => {
    if (imageUtils.supportsAVIF()) return 'avif';
    if (imageUtils.supportsWebP()) return 'webp';
    return 'jpeg';
  },
};

// Custom hook for image optimization
export function useImageOptimization() {
  const format = imageUtils.getOptimalFormat();
  
  const optimizeImage = (src: string, options: ImageOptimizationOptions = {}) => {
    return imageUtils.optimizeImageUrl(src, { format, ...options });
  };

  const createResponsiveProps = (src: string, options: ImageOptimizationOptions = {}) => {
    const optimizedSrc = optimizeImage(src, options);
    const srcSet = imageUtils.generateSrcSet(src);
    const sizes = imageUtils.generateSizes();
    
    return {
      src: optimizedSrc,
      srcSet,
      sizes,
      loading: options.loading || 'lazy' as const,
      placeholder: options.placeholder || imageUtils.createBlurPlaceholder(src),
    };
  };

  return {
    optimizeImage,
    createResponsiveProps,
    format,
    preloadImage: imageUtils.preloadImage,
  };
}