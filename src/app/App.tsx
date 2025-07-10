import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { PerformanceMonitor } from "@/shared/ui/performance-monitor";

// Lazy load pages for code splitting
const DashboardPage = lazy(() => import("@/pages/dashboard").then(m => ({ default: m.DashboardPage })));
const PropertiesPage = lazy(() => import("@/pages/properties").then(m => ({ default: m.PropertiesPage })));
const ContactsPage = lazy(() => import("@/pages/contacts").then(m => ({ default: m.ContactsPage })));
const DealsPage = lazy(() => import("@/pages/deals").then(m => ({ default: m.DealsPage })));
const AgentsPage = lazy(() => import("@/pages/agents").then(m => ({ default: m.AgentsPage })));
const ActivitiesPage = lazy(() => import("@/pages/activities").then(m => ({ default: m.ActivitiesPage })));
const ReportsPage = lazy(() => import("@/pages/reports").then(m => ({ default: m.ReportsPage })));
const SettingsPage = lazy(() => import("@/pages/settings").then(m => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import("@/pages/not-found").then(m => ({ default: m.NotFoundPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <PerformanceMonitor />
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;