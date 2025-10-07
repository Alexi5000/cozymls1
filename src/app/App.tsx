import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/shared/hooks/use-auth";
import { ProtectedRoute } from "@/shared/lib/protected-route";
import { AuthPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";
import { PropertiesPage } from "@/pages/properties";
import { ContactsPage } from "@/pages/contacts";
import { DealsPage } from "@/pages/deals";
import { ActivitiesPage } from "@/pages/activities";
import { ReportsPage } from "@/pages/reports";
import { SettingsPage } from "@/pages/settings";
import { NotFoundPage } from "@/pages/not-found";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/properties" element={<ProtectedRoute><PropertiesPage /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute><ContactsPage /></ProtectedRoute>} />
            <Route path="/deals" element={<ProtectedRoute><DealsPage /></ProtectedRoute>} />
            <Route path="/activities" element={<ProtectedRoute><ActivitiesPage /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;