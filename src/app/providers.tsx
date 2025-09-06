import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/shared/ui/tooltip';
import { Toaster } from '@/shared/ui/toaster';
import { Toaster as Sonner } from '@/shared/ui/sonner';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { ThemeProvider } from "@/app/theme-provider";
import { AppDataProvider } from '@/app/data-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
      networkMode: 'always', // Always execute queries instantly
    },
    mutations: {
      retry: false,
      networkMode: 'always',
    },
  },
});

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppDataProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </QueryClientProvider>
        </AppDataProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
