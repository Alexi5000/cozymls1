import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Eager load all critical pages for instant navigation
import { DashboardPage } from '@/pages/dashboard';
import { PropertiesPage } from '@/pages/properties';
import { ContactsPage } from '@/pages/contacts';
import { DealsPage } from '@/pages/deals';
import { AgentsPage } from '@/pages/agents';
import { ActivitiesPage } from '@/pages/activities';

// Only lazy load non-essential pages
import { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
const ReportsPage = lazy(() => import('@/pages/reports').then(m => ({ default: m.ReportsPage })));
const SettingsPage = lazy(() => import('@/pages/settings').then(m => ({ default: m.SettingsPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then(m => ({ default: m.NotFoundPage })));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Critical routes load instantly */}
        <Route path="/" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        
        {/* Non-critical routes with minimal suspense */}
        <Route path="/reports" element={
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <ReportsPage />
          </Suspense>
        } />
        <Route path="/settings" element={
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <SettingsPage />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
            <NotFoundPage />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}
