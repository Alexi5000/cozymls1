import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor';
            }
            if (id.includes('react-router-dom')) {
              return 'router';
            }
            if (id.includes('@radix-ui') || id.includes('cmdk')) {
              return 'ui';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            if (id.includes('clsx') || id.includes('class-variance-authority') || id.includes('tailwind-merge')) {
              return 'utils';
            }
          }
          
          // Feature chunks based on file paths
          if (id.includes('/pages/dashboard/') || id.includes('/widgets/dashboard/')) {
            return 'dashboard';
          }
          if (id.includes('/pages/properties/') || id.includes('/widgets/properties/')) {
            return 'properties';
          }
          if (id.includes('/pages/activities/') || id.includes('/widgets/activities/')) {
            return 'activities';
          }
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    // Enable source maps for production debugging
    sourcemap: mode === 'production' ? 'hidden' : true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  // Enable CSS code splitting
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
    devSourcemap: mode === 'development',
  },
}));
