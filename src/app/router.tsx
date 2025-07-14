import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingSpinner } from '@/shared/ui/loading-spinner';
import { PerformanceMonitor } from '@/shared/ui/performance-monitor';
import { createRouteComponent } from '@/shared/lib/lazy-loading';

// Eager load dashboard for immediate loading, lazy load others
import { DashboardPage } from '@/pages/dashboard';
const PropertiesPage = createRouteComponent('properties', () => import('@/pages/properties').then(m => ({ default: m.PropertiesPage })));
const ContactsPage = createRouteComponent('contacts', () => import('@/pages/contacts').then(m => ({ default: m.ContactsPage })));
const DealsPage = createRouteComponent('deals', () => import('@/pages/deals').then(m => ({ default: m.DealsPage })));
const AgentsPage = createRouteComponent('agents', () => import('@/pages/agents').then(m => ({ default: m.AgentsPage })));
const ActivitiesPage = createRouteComponent('activities', () => import('@/pages/activities').then(m => ({ default: m.ActivitiesPage })));
const ReportsPage = createRouteComponent('reports', () => import('@/pages/reports').then(m => ({ default: m.ReportsPage })));
const SettingsPage = createRouteComponent('settings', () => import('@/pages/settings').then(m => ({ default: m.SettingsPage })));
const NotFoundPage = createRouteComponent('not-found', () => import('@/pages/not-found').then(m => ({ default: m.NotFoundPage })));

export function Router() {
  return (
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
      {/* Defer performance monitoring to avoid blocking initial render */}
      <Suspense fallback={null}>
        <PerformanceMonitor />
      </Suspense>
    </BrowserRouter>
  );
}
