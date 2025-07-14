# Import Graph Analysis Report

Generated: 2025-07-14T03:02:13.771Z

## Summary
- **Total Files**: 202
- **Total External Dependencies**: 52
- **Total Imports**: 703

## External Dependencies
- @hookform/resolvers/zod
- @radix-ui/react-accordion
- @radix-ui/react-alert-dialog
- @radix-ui/react-aspect-ratio
- @radix-ui/react-avatar
- @radix-ui/react-checkbox
- @radix-ui/react-collapsible
- @radix-ui/react-context-menu
- @radix-ui/react-dialog
- @radix-ui/react-dropdown-menu
- @radix-ui/react-hover-card
- @radix-ui/react-label
- @radix-ui/react-menubar
- @radix-ui/react-navigation-menu
- @radix-ui/react-popover
- @radix-ui/react-progress
- @radix-ui/react-radio-group
- @radix-ui/react-scroll-area
- @radix-ui/react-select
- @radix-ui/react-separator
- @radix-ui/react-slider
- @radix-ui/react-slot
- @radix-ui/react-switch
- @radix-ui/react-tabs
- @radix-ui/react-toast
- @radix-ui/react-toggle
- @radix-ui/react-toggle-group
- @radix-ui/react-tooltip
- @tanstack/react-query
- @testing-library/jest-dom
- @testing-library/react
- class-variance-authority
- clsx
- cmdk
- date-fns
- embla-carousel-react
- input-otp
- lucide-react
- lucide-react/dynamicIconImports
- next-themes
- react
- react-day-picker
- react-dom/client
- react-hook-form
- react-resizable-panels
- react-router-dom
- recharts
- sonner
- tailwind-merge
- vaul
- vitest
- zod

## Analysis Results

### Circular Dependencies
No circular dependencies found! 🎉

### Unused Files
- src/app/__tests__/App.test.tsx
- src/entities/activity/model/mock-data.ts
- src/entities/contact/model/mock-data.ts
- src/entities/dashboard/model/mock-data.ts
- src/entities/deal/model/mock-data.ts
- src/entities/property/model/mock-data.ts
- src/entities/report/model/mock-data.ts
- src/entities/user/model/mock-data.ts
- src/pages/activities/ui/ActivitiesPage.tsx
- src/pages/agents/ui/AgentsPage.tsx
- src/pages/contacts/ui/ContactsPage.tsx
- src/pages/dashboard/ui/DashboardPage.tsx
- src/pages/deals/ui/DealsPage.tsx
- src/pages/Index.tsx
- src/pages/not-found/ui/NotFoundPage.tsx
- src/pages/properties/__tests__/PropertiesPage.test.tsx
- src/pages/reports/ui/ReportsPage.tsx
- src/pages/settings/ui/SettingsPage.tsx
- src/shared/hooks/use-debounced-callback.ts
- src/shared/hooks/use-intersection-observer.ts
- src/shared/hooks/use-mobile-gestures.ts
- src/shared/hooks/use-orientation.ts
- src/shared/hooks/use-scroll-animation.ts
- src/shared/lib/performance-store.ts
- src/shared/types/crm.ts
- src/shared/types/mls.ts
- src/shared/ui/accordion.tsx
- src/shared/ui/alert-dialog.tsx
- src/shared/ui/aspect-ratio.tsx
- src/shared/ui/breadcrumb.tsx
- src/shared/ui/carousel.tsx
- src/shared/ui/chart.tsx
- src/shared/ui/checkbox.tsx
- src/shared/ui/collapsible.tsx
- src/shared/ui/command.tsx
- src/shared/ui/context-menu.tsx
- src/shared/ui/drawer.tsx
- src/shared/ui/enhanced-mobile-components.tsx
- src/shared/ui/enhanced-responsive-layout.tsx
- src/shared/ui/enhanced-responsive-navigation.tsx
- src/shared/ui/font-loader.tsx
- src/shared/ui/hover-card.tsx
- src/shared/ui/icon.tsx
- src/shared/ui/input-otp.tsx
- src/shared/ui/menubar.tsx
- src/shared/ui/mobile-bottom-sheet.tsx
- src/shared/ui/mobile-enhanced-input.tsx
- src/shared/ui/navigation-menu.tsx
- src/shared/ui/optimized-image.tsx
- src/shared/ui/pagination.tsx
- src/shared/ui/radio-group.tsx
- src/shared/ui/resizable.tsx
- src/shared/ui/responsive-form.tsx
- src/shared/ui/scroll-area.tsx
- src/shared/ui/slider.tsx
- src/shared/ui/table.tsx
- src/shared/ui/tabs.tsx
- src/shared/ui/toggle-group.tsx
- src/shared/ui/use-toast.ts
- src/shared/ui/__tests__/button.test.tsx
- src/test-setup.ts
- src/vite-env.d.ts
- src/widgets/activities/ui/ActivitiesGrid.tsx
- src/widgets/activities/ui/ActivitiesHeader.tsx
- src/widgets/activities/ui/ActivitiesStats.tsx
- src/widgets/activities/ui/ActivityFilters.tsx
- src/widgets/activities/ui/AddActivityDialog.tsx
- src/widgets/dashboard/ui/DealsOverview.tsx
- src/widgets/dashboard/ui/HeroSection.tsx
- src/widgets/dashboard/ui/MarketInsights.tsx
- src/widgets/dashboard/ui/MobileDashboardStats.tsx
- src/widgets/dashboard/ui/RecentActivity.tsx
- src/widgets/dashboard/ui/StatsCard.tsx
- src/widgets/layout/ui/EnhancedHeader.tsx
- src/widgets/mobile/ui/MobileLayout.tsx
- src/widgets/properties/ui/PropertiesFilters.tsx
- src/widgets/properties/ui/PropertiesGrid.tsx
- src/widgets/properties/ui/PropertiesHeader.tsx
- src/widgets/properties/ui/PropertiesStats.tsx
- src/widgets/reports/ui/ReportBuilder.tsx
- src/widgets/reports/ui/ReportCard.tsx
- src/widgets/reports/ui/ReportViewer.tsx

### Missing Imports
- src/main.tsx: ./index.css (resolved to src/index.css)

### Most Imported Files
- src/shared/lib/utils.ts: imported by 71 files
- src/shared/ui/button.tsx: imported by 40 files
- src/shared/ui/card.tsx: imported by 31 files
- src/shared/ui/badge.tsx: imported by 23 files
- src/shared/hooks/use-mobile.tsx: imported by 12 files
- src/shared/ui/input.tsx: imported by 12 files
- src/shared/hooks/use-responsive-breakpoint.ts: imported by 9 files
- src/entities/property/index.ts: imported by 8 files
- src/entities/activity/index.ts: imported by 7 files
- src/shared/hooks/use-touch.ts: imported by 7 files

## File Graph


### src/app/App.tsx
- **Imports**: 19 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/toaster.tsx (internal)
  - src/shared/ui/sonner.tsx (internal)
  - src/shared/ui/tooltip.tsx (internal)
  - @tanstack/react-query (external)
  - react-router-dom (external)
  - react (external)
  - src/shared/ui/error-boundary.tsx (internal)
  - src/shared/ui/loading-spinner.tsx (internal)
  - src/shared/ui/performance-monitor.tsx (internal)
  - src/shared/lib/lazy-loading.ts (internal)
  - src/pages/dashboard/index.ts (internal)
  - src/pages/properties/index.ts (internal)
  - src/pages/contacts/index.ts (internal)
  - src/pages/deals/index.ts (internal)
  - src/pages/agents/index.ts (internal)
  - src/pages/activities/index.ts (internal)
  - src/pages/reports/index.ts (internal)
  - src/pages/settings/index.ts (internal)
  - src/pages/not-found/index.ts (internal)

**Imported By:**
  - src/app/__tests__/App.test.tsx

**Exports:**
  - default (default)


### src/app/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/main.tsx

**Exports:**
  - default (named)


### src/app/__tests__/App.test.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**
  - @testing-library/react (external)
  - vitest (external)
  - react-router-dom (external)
  - src/app/App.tsx (internal)

**Imported By:**


**Exports:**



### src/entities/activity/index.ts
- **Imports**: 0 files
- **Imported by**: 7 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/pages/activities/ui/ActivitiesPage.tsx
  - src/widgets/activities/ui/ActivitiesGrid.tsx
  - src/widgets/activities/ui/ActivitiesStats.tsx
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/MobileActivityCard.tsx
  - src/widgets/dashboard/ui/MobileRecentActivity.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx

**Exports:**
  - mockActivities (named)


### src/entities/activity/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/activity/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockActivities (named)


### src/entities/activity/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/activity/model/mock-data.ts

**Exports:**
  - Activity (named)


### src/entities/contact/index.ts
- **Imports**: 0 files
- **Imported by**: 5 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/activities/ui/MobileActivityCard.tsx

**Exports:**
  - mockContacts (named)


### src/entities/contact/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/contact/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockContacts (named)


### src/entities/contact/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/contact/model/mock-data.ts

**Exports:**
  - Contact (named)


### src/entities/dashboard/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/pages/dashboard/ui/DashboardPage.tsx

**Exports:**
  - mockDashboardStats (named)


### src/entities/dashboard/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/dashboard/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockDashboardStats (named)


### src/entities/dashboard/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/dashboard/model/mock-data.ts

**Exports:**
  - DashboardStats (named)


### src/entities/deal/index.ts
- **Imports**: 0 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/pages/deals/ui/DealsPage.tsx
  - src/widgets/dashboard/ui/DealsOverview.tsx

**Exports:**
  - mockDeals (named)


### src/entities/deal/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/deal/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockDeals (named)


### src/entities/deal/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/deal/model/mock-data.ts

**Exports:**
  - Deal (named)


### src/entities/property/index.ts
- **Imports**: 0 files
- **Imported by**: 8 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/shared/hooks/use-properties.ts
  - src/shared/lib/property-utils.ts
  - src/shared/providers/PropertiesProvider.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/properties/ui/MobilePropertyCard.tsx
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx
  - src/widgets/properties/ui/PropertyCard.tsx

**Exports:**
  - mockProperties (named)


### src/entities/property/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/property/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockProperties (named)


### src/entities/property/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/property/model/mock-data.ts

**Exports:**
  - Property (named)


### src/entities/report/index.ts
- **Imports**: 0 files
- **Imported by**: 4 files
- **Exports**: 3 items

**Imports:**


**Imported By:**
  - src/shared/lib/report-store.ts
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportCard.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - mockReportTemplates (named)
  - mockReportData (named)
  - mockReports (named)


### src/entities/report/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - src/entities/report/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockReportTemplates (named)
  - mockReportData (named)
  - mockReports (named)


### src/entities/report/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 7 items

**Imports:**


**Imported By:**
  - src/entities/report/model/mock-data.ts

**Exports:**
  - ReportTemplate (named)
  - ReportField (named)
  - Report (named)
  - ReportData (named)
  - ReportConfig (named)
  - ReportFilter (named)
  - DashboardReport (named)


### src/entities/user/index.ts
- **Imports**: 0 files
- **Imported by**: 3 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/agents/ui/AgentsGrid.tsx
  - src/widgets/agents/ui/MobileAgentCard.tsx

**Exports:**
  - mockUsers (named)


### src/entities/user/model/mock-data.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/entities/user/model/types.ts (internal)

**Imported By:**


**Exports:**
  - mockUsers (named)


### src/entities/user/model/types.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/entities/user/model/mock-data.ts

**Exports:**
  - User (named)


### src/main.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**
  - react-dom/client (external)
  - src/app/index.ts (internal)
  - src/index.css (internal)
  - src/shared/lib/bundle-analyzer.ts (internal)

**Imported By:**


**Exports:**



### src/pages/activities/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - ActivitiesPage (named)


### src/pages/activities/ui/ActivitiesPage.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/widgets/layout/ui/ResponsiveLayout.tsx (internal)
  - src/widgets/activities/index.ts (internal)
  - src/entities/activity/index.ts (internal)

**Imported By:**


**Exports:**
  - ActivitiesPage (named)


### src/pages/agents/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - AgentsPage (named)


### src/pages/agents/ui/AgentsPage.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/ui/ResponsiveLayout.tsx (internal)
  - src/widgets/agents/ui/AgentsHeader.tsx (internal)
  - src/widgets/agents/ui/AgentsGrid.tsx (internal)
  - src/widgets/agents/ui/AgentsStats.tsx (internal)

**Imported By:**


**Exports:**
  - AgentsPage (named)


### src/pages/contacts/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - ContactsPage (named)


### src/pages/contacts/ui/ContactsPage.tsx
- **Imports**: 9 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/mobile-optimized-card.tsx (internal)
  - src/entities/contact/index.ts (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - ContactsPage (named)


### src/pages/dashboard/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - DashboardPage (named)


### src/pages/dashboard/ui/DashboardPage.tsx
- **Imports**: 9 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/widgets/dashboard/index.ts (internal)
  - src/entities/dashboard/index.ts (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/shared/hooks/use-mobile-performance.ts (internal)
  - src/shared/ui/adaptive-layout.tsx (internal)
  - src/shared/ui/index.ts (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - DashboardPage (named)


### src/pages/deals/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - DealsPage (named)


### src/pages/deals/ui/DealsPage.tsx
- **Imports**: 11 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/progress.tsx (internal)
  - src/shared/ui/mobile-optimized-card.tsx (internal)
  - src/entities/deal/index.ts (internal)
  - src/entities/contact/index.ts (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - DealsPage (named)


### src/pages/Index.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/lib/brand.ts (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - default (default)


### src/pages/not-found/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - NotFoundPage (named)


### src/pages/not-found/ui/NotFoundPage.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/index.ts (internal)
  - src/shared/ui/button.tsx (internal)
  - react-router-dom (external)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - NotFoundPage (named)


### src/pages/properties/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - PropertiesPage (named)


### src/pages/properties/ui/PropertiesPage.tsx
- **Imports**: 8 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/widgets/properties/index.ts (internal)
  - src/shared/ui/property-skeleton.tsx (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/shared/providers/PropertiesProvider.tsx (internal)
  - src/shared/ui/error-boundary.tsx (internal)

**Imported By:**
  - src/pages/properties/__tests__/PropertiesPage.test.tsx

**Exports:**
  - PropertiesPage (named)


### src/pages/properties/__tests__/PropertiesPage.test.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**
  - @testing-library/react (external)
  - vitest (external)
  - @tanstack/react-query (external)
  - src/pages/properties/ui/PropertiesPage.tsx (internal)

**Imported By:**


**Exports:**



### src/pages/reports/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - ReportsPage (named)


### src/pages/reports/ui/ReportsPage.tsx
- **Imports**: 12 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/shared/hooks/use-toast.ts (internal)
  - src/shared/lib/report-store.ts (internal)
  - src/widgets/reports/index.ts (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - ReportsPage (named)


### src/pages/settings/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**


**Imported By:**
  - src/app/App.tsx

**Exports:**
  - default (named)


### src/pages/settings/ui/SettingsPage.tsx
- **Imports**: 6 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/index.ts (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - default (default)


### src/shared/hooks/use-debounced-callback.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 2 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - useDebouncedCallback (named)
  - useThrottledCallback (named)


### src/shared/hooks/use-font-loading.ts
- **Imports**: 1 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/ui/font-loader.tsx

**Exports:**
  - useFontLoading (named)
  - useAppFonts (named)


### src/shared/hooks/use-intersection-observer.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - useIntersectionObserver (named)
  - useLazyImage (named)
  - useLazyComponent (named)


### src/shared/hooks/use-memory-optimization.ts
- **Imports**: 1 files
- **Imported by**: 3 files
- **Exports**: 3 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/ui/optimized-image-v2.tsx
  - src/shared/ui/optimized-list.tsx
  - src/shared/ui/performance-monitor.tsx

**Exports:**
  - useMemoryOptimization (named)
  - useObjectPool (named)
  - useDOMCleanup (named)


### src/shared/hooks/use-mobile-gestures.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - useMobileGestures (named)


### src/shared/hooks/use-mobile-performance.ts
- **Imports**: 2 files
- **Imported by**: 3 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)

**Imported By:**
  - src/pages/dashboard/ui/DashboardPage.tsx
  - src/shared/ui/performance-monitor.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - useMobilePerformance (named)


### src/shared/hooks/use-mobile.tsx
- **Imports**: 1 files
- **Imported by**: 12 files
- **Exports**: 1 items

**Imports:**
  - react (external)

**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/dashboard/ui/DashboardPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/properties/ui/PropertiesPage.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/pages/settings/ui/SettingsPage.tsx
  - src/shared/ui/adaptive-layout.tsx
  - src/shared/ui/sidebar.tsx
  - src/widgets/activities/ui/ActivitiesGrid.tsx
  - src/widgets/agents/ui/AgentsGrid.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - useIsMobile (named)


### src/shared/hooks/use-optimized-memo.ts
- **Imports**: 1 files
- **Imported by**: 1 files
- **Exports**: 5 items

**Imports:**
  - react (external)

**Imported By:**
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx

**Exports:**
  - createOptimizedMemo (named)
  - useStableCallback (named)
  - useStableMemo (named)
  - createListItemMemo (named)
  - useComputationCache (named)


### src/shared/hooks/use-orientation.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 2 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - Orientation (named)
  - useOrientation (named)


### src/shared/hooks/use-performance.ts
- **Imports**: 1 files
- **Imported by**: 2 files
- **Exports**: 3 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/hooks/use-render-optimization.ts
  - src/shared/ui/performance-monitor.tsx

**Exports:**
  - usePerformanceMonitor (named)
  - useIntersectionObserver (named)
  - performanceUtils (named)


### src/shared/hooks/use-properties.ts
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - src/entities/property/index.ts (internal)
  - src/entities/property/index.ts (internal)

**Imported By:**
  - src/shared/providers/PropertiesProvider.tsx

**Exports:**
  - PropertiesFilters (named)
  - PropertiesState (named)
  - useProperties (named)


### src/shared/hooks/use-property-actions.ts
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-toast.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/MobilePropertyCard.tsx

**Exports:**
  - usePropertyActions (named)


### src/shared/hooks/use-render-optimization.ts
- **Imports**: 2 files
- **Imported by**: 3 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-performance.ts (internal)

**Imported By:**
  - src/shared/ui/optimized-image-v2.tsx
  - src/shared/ui/optimized-list.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - useRenderOptimization (named)
  - useListOptimization (named)
  - useImageOptimization (named)


### src/shared/hooks/use-responsive-breakpoint.ts
- **Imports**: 1 files
- **Imported by**: 9 files
- **Exports**: 2 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/hooks/use-mobile-performance.ts
  - src/shared/ui/enhanced-mobile-components.tsx
  - src/shared/ui/enhanced-responsive-layout.tsx
  - src/shared/ui/enhanced-responsive-navigation.tsx
  - src/shared/ui/responsive-form.tsx
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/dashboard/ui/StatsCard.tsx
  - src/widgets/layout/ui/ResponsiveLayout.tsx
  - src/widgets/mobile/ui/MobileLayout.tsx

**Exports:**
  - Breakpoint (named)
  - useResponsiveBreakpoint (named)


### src/shared/hooks/use-safe-area.ts
- **Imports**: 1 files
- **Imported by**: 4 files
- **Exports**: 1 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/ui/mobile-bottom-sheet.tsx
  - src/shared/ui/mobile-drawer.tsx
  - src/shared/ui/mobile-tab-bar.tsx
  - src/widgets/mobile/ui/MobileHeader.tsx

**Exports:**
  - useSafeArea (named)


### src/shared/hooks/use-scroll-animation.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - useScrollAnimation (named)
  - useStaggeredAnimation (named)
  - useParallax (named)


### src/shared/hooks/use-toast.ts
- **Imports**: 0 files
- **Imported by**: 5 files
- **Exports**: 0 items

**Imports:**


**Imported By:**
  - src/pages/reports/ui/ReportsPage.tsx
  - src/shared/hooks/use-property-actions.ts
  - src/shared/ui/toaster.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**



### src/shared/hooks/use-touch.ts
- **Imports**: 1 files
- **Imported by**: 7 files
- **Exports**: 1 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/ui/mobile-bottom-sheet.tsx
  - src/shared/ui/mobile-card.tsx
  - src/shared/ui/mobile-drawer.tsx
  - src/shared/ui/mobile-list-item.tsx
  - src/shared/ui/mobile-optimized-button.tsx
  - src/shared/ui/mobile-optimized-card.tsx
  - src/shared/ui/touch-button.tsx

**Exports:**
  - useTouch (named)


### src/shared/hooks/use-virtual-scroll.ts
- **Imports**: 1 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)

**Imported By:**
  - src/shared/ui/virtual-list.tsx

**Exports:**
  - useVirtualScroll (named)
  - useDynamicVirtualScroll (named)


### src/shared/lib/brand.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**


**Imported By:**
  - src/pages/Index.tsx

**Exports:**
  - BRAND_NAME (named)
  - BRAND_DESCRIPTION (named)


### src/shared/lib/bundle-analyzer.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**


**Imported By:**
  - src/main.tsx

**Exports:**
  - bundleAnalyzer (named)
  - initializeBundleMonitoring (named)


### src/shared/lib/image-optimization.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**


**Imported By:**
  - src/shared/ui/optimized-image.tsx

**Exports:**
  - imageUtils (named)
  - useImageOptimization (named)


### src/shared/lib/lazy-loading.ts
- **Imports**: 1 files
- **Imported by**: 1 files
- **Exports**: 5 items

**Imports:**
  - react (external)

**Imported By:**
  - src/app/App.tsx

**Exports:**
  - createLazyComponent (named)
  - preloadComponent (named)
  - createPreloadableLazyComponent (named)
  - componentRegistry (named)
  - createRouteComponent (named)


### src/shared/lib/performance-store.ts
- **Imports**: 0 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**


**Imported By:**


**Exports:**
  - performanceStore (named)


### src/shared/lib/property-utils.ts
- **Imports**: 1 files
- **Imported by**: 2 files
- **Exports**: 8 items

**Imports:**
  - src/entities/property/index.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/MobilePropertyCard.tsx
  - src/widgets/properties/ui/PropertiesStats.tsx

**Exports:**
  - formatPrice (named)
  - formatSquareFeet (named)
  - getFullAddress (named)
  - getAgentInitials (named)
  - getStatusColors (named)
  - calculateAveragePrice (named)
  - calculateAverageDaysOnMarket (named)
  - getActiveListingsCount (named)


### src/shared/lib/report-store.ts
- **Imports**: 2 files
- **Imported by**: 4 files
- **Exports**: 1 items

**Imports:**
  - src/entities/report/index.ts (internal)
  - src/entities/report/index.ts (internal)

**Imported By:**
  - src/pages/reports/ui/ReportsPage.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportCard.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - reportStore (named)


### src/shared/lib/utils.ts
- **Imports**: 2 files
- **Imported by**: 71 files
- **Exports**: 1 items

**Imports:**
  - clsx (external)
  - tailwind-merge (external)

**Imported By:**
  - src/pages/settings/ui/SettingsPage.tsx
  - src/shared/ui/accordion.tsx
  - src/shared/ui/alert-dialog.tsx
  - src/shared/ui/alert.tsx
  - src/shared/ui/avatar.tsx
  - src/shared/ui/badge.tsx
  - src/shared/ui/breadcrumb.tsx
  - src/shared/ui/button.tsx
  - src/shared/ui/calendar.tsx
  - src/shared/ui/card.tsx
  - src/shared/ui/carousel.tsx
  - src/shared/ui/chart.tsx
  - src/shared/ui/checkbox.tsx
  - src/shared/ui/command.tsx
  - src/shared/ui/context-menu.tsx
  - src/shared/ui/dialog.tsx
  - src/shared/ui/drawer.tsx
  - src/shared/ui/dropdown-menu.tsx
  - src/shared/ui/enhanced-mobile-components.tsx
  - src/shared/ui/enhanced-responsive-layout.tsx
  - src/shared/ui/enhanced-responsive-navigation.tsx
  - src/shared/ui/font-loader.tsx
  - src/shared/ui/form.tsx
  - src/shared/ui/hover-card.tsx
  - src/shared/ui/input-otp.tsx
  - src/shared/ui/input.tsx
  - src/shared/ui/label.tsx
  - src/shared/ui/loading-spinner.tsx
  - src/shared/ui/menubar.tsx
  - src/shared/ui/mobile-bottom-sheet.tsx
  - src/shared/ui/mobile-card.tsx
  - src/shared/ui/mobile-drawer.tsx
  - src/shared/ui/mobile-enhanced-input.tsx
  - src/shared/ui/mobile-list-item.tsx
  - src/shared/ui/mobile-optimized-button.tsx
  - src/shared/ui/mobile-optimized-card.tsx
  - src/shared/ui/mobile-tab-bar.tsx
  - src/shared/ui/navigation-menu.tsx
  - src/shared/ui/optimized-image-v2.tsx
  - src/shared/ui/optimized-image.tsx
  - src/shared/ui/optimized-list.tsx
  - src/shared/ui/pagination.tsx
  - src/shared/ui/performance-monitor.tsx
  - src/shared/ui/popover.tsx
  - src/shared/ui/progress.tsx
  - src/shared/ui/pull-to-refresh.tsx
  - src/shared/ui/radio-group.tsx
  - src/shared/ui/resizable.tsx
  - src/shared/ui/responsive-form.tsx
  - src/shared/ui/scroll-area.tsx
  - src/shared/ui/select.tsx
  - src/shared/ui/separator.tsx
  - src/shared/ui/sheet.tsx
  - src/shared/ui/sidebar.tsx
  - src/shared/ui/skeleton.tsx
  - src/shared/ui/slider.tsx
  - src/shared/ui/switch.tsx
  - src/shared/ui/table.tsx
  - src/shared/ui/tabs.tsx
  - src/shared/ui/textarea.tsx
  - src/shared/ui/toast.tsx
  - src/shared/ui/toggle-group.tsx
  - src/shared/ui/toggle.tsx
  - src/shared/ui/tooltip.tsx
  - src/shared/ui/touch-button.tsx
  - src/shared/ui/virtual-list.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/layout/ui/Sidebar.tsx
  - src/widgets/mobile/ui/MobileHeader.tsx
  - src/widgets/mobile/ui/MobileLayout.tsx
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx

**Exports:**
  - cn (named)


### src/shared/providers/PropertiesProvider.tsx
- **Imports**: 3 files
- **Imported by**: 4 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-properties.ts (internal)
  - src/entities/property/index.ts (internal)

**Imported By:**
  - src/pages/properties/ui/PropertiesPage.tsx
  - src/widgets/properties/ui/PropertiesFilters.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx
  - src/widgets/properties/ui/PropertiesStats.tsx

**Exports:**
  - PropertiesProvider (named)
  - usePropertiesContext (named)


### src/shared/types/crm.ts
- **Imports**: 0 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**


**Imported By:**


**Exports:**



### src/shared/types/mls.ts
- **Imports**: 0 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**


**Imported By:**


**Exports:**
  - Property (named)


### src/shared/ui/accordion.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - @radix-ui/react-accordion (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Accordion (named)
  - AccordionItem (named)
  - AccordionTrigger (named)
  - AccordionContent (named)


### src/shared/ui/adaptive-layout.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-mobile.tsx (internal)

**Imported By:**
  - src/pages/dashboard/ui/DashboardPage.tsx

**Exports:**
  - AdaptiveLayout (named)
  - ResponsiveGrid (named)


### src/shared/ui/alert-dialog.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 12 items

**Imports:**
  - react (external)
  - @radix-ui/react-alert-dialog (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - AlertDialog (named)
  - AlertDialogPortal (named)
  - AlertDialogOverlay (named)
  - AlertDialogTrigger (named)
  - AlertDialogContent (named)
  - AlertDialogHeader (named)
  - AlertDialogFooter (named)
  - AlertDialogTitle (named)
  - AlertDialogDescription (named)
  - AlertDialogAction (named)
  - AlertDialogCancel (named)
  -  (named)


### src/shared/ui/alert.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - Alert (named)
  - AlertTitle (named)
  - AlertDescription (named)


### src/shared/ui/aspect-ratio.tsx
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - @radix-ui/react-aspect-ratio (external)

**Imported By:**


**Exports:**
  - AspectRatio (named)


### src/shared/ui/avatar.tsx
- **Imports**: 3 files
- **Imported by**: 5 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - @radix-ui/react-avatar (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/MobileActivityCard.tsx
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/agents/ui/MobileAgentCard.tsx
  - src/widgets/layout/ui/UserAccountDropdown.tsx

**Exports:**
  - Avatar (named)
  - AvatarImage (named)
  - AvatarFallback (named)


### src/shared/ui/badge.tsx
- **Imports**: 3 files
- **Imported by**: 23 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/Index.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/MobileActivityCard.tsx
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/agents/ui/MobileAgentCard.tsx
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/dashboard/ui/MarketInsights.tsx
  - src/widgets/dashboard/ui/MobileDashboardStats.tsx
  - src/widgets/dashboard/ui/MobileRecentActivity.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx
  - src/widgets/layout/ui/NotificationsDropdown.tsx
  - src/widgets/layout/ui/UserAccountDropdown.tsx
  - src/widgets/properties/ui/MobilePropertyCard.tsx
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx
  - src/widgets/properties/ui/PropertyCard.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportCard.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - BadgeProps (named)
  - Badge (named)
  - badgeVariants (named)


### src/shared/ui/breadcrumb.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 8 items

**Imports:**
  - react (external)
  - @radix-ui/react-slot (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Breadcrumb (named)
  - BreadcrumbList (named)
  - BreadcrumbItem (named)
  - BreadcrumbLink (named)
  - BreadcrumbPage (named)
  - BreadcrumbSeparator (named)
  - BreadcrumbEllipsis (named)
  -  (named)


### src/shared/ui/button.tsx
- **Imports**: 4 files
- **Imported by**: 40 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - @radix-ui/react-slot (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/Index.tsx
  - src/pages/not-found/ui/NotFoundPage.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/shared/ui/alert-dialog.tsx
  - src/shared/ui/calendar.tsx
  - src/shared/ui/carousel.tsx
  - src/shared/ui/enhanced-mobile-components.tsx
  - src/shared/ui/enhanced-responsive-navigation.tsx
  - src/shared/ui/error-boundary.tsx
  - src/shared/ui/mobile-bottom-sheet.tsx
  - src/shared/ui/mobile-drawer.tsx
  - src/shared/ui/pagination.tsx
  - src/shared/ui/responsive-form.tsx
  - src/shared/ui/sidebar.tsx
  - src/shared/ui/touch-button.tsx
  - src/shared/ui/__tests__/button.test.tsx
  - src/widgets/activities/ui/ActivitiesHeader.tsx
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/ActivityFilters.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/agents/ui/AddAgentDialog.tsx
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/agents/ui/AgentsHeader.tsx
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx
  - src/widgets/layout/ui/NotificationsDropdown.tsx
  - src/widgets/layout/ui/SettingsDropdown.tsx
  - src/widgets/layout/ui/UserAccountDropdown.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx
  - src/widgets/properties/ui/PropertiesFilters.tsx
  - src/widgets/properties/ui/PropertiesHeader.tsx
  - src/widgets/properties/ui/PropertyCard.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportCard.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - ButtonProps (named)
  - Button (named)
  - buttonVariants (named)


### src/shared/ui/calendar.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - react-day-picker (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**
  - src/widgets/activities/ui/AddActivityDialog.tsx

**Exports:**
  - CalendarProps (named)
  - Calendar (named)


### src/shared/ui/card.tsx
- **Imports**: 2 files
- **Imported by**: 31 files
- **Exports**: 6 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/Index.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/pages/settings/ui/SettingsPage.tsx
  - src/shared/ui/enhanced-mobile-components.tsx
  - src/shared/ui/error-boundary.tsx
  - src/shared/ui/mobile-card.tsx
  - src/shared/ui/mobile-optimized-card.tsx
  - src/shared/ui/property-skeleton.tsx
  - src/widgets/activities/ui/ActivitiesStats.tsx
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/activities/ui/ActivityFilters.tsx
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/agents/ui/AgentsStats.tsx
  - src/widgets/dashboard/ui/DealsOverview.tsx
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/dashboard/ui/MarketInsights.tsx
  - src/widgets/dashboard/ui/MobileDashboardStats.tsx
  - src/widgets/dashboard/ui/MobileRecentActivity.tsx
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/dashboard/ui/StatsCard.tsx
  - src/widgets/layout/ui/NotificationsDropdown.tsx
  - src/widgets/layout/ui/SettingsDropdown.tsx
  - src/widgets/layout/ui/UserAccountDropdown.tsx
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx
  - src/widgets/properties/ui/PropertiesStats.tsx
  - src/widgets/properties/ui/PropertyCard.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportCard.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - Card (named)
  - CardHeader (named)
  - CardFooter (named)
  - CardTitle (named)
  - CardDescription (named)
  - CardContent (named)


### src/shared/ui/carousel.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 7 items

**Imports:**
  - react (external)
  - embla-carousel-react (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - type CarouselApi (named)
  - Carousel (named)
  - CarouselContent (named)
  - CarouselItem (named)
  - CarouselPrevious (named)
  - CarouselNext (named)
  -  (named)


### src/shared/ui/chart.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 8 items

**Imports:**
  - react (external)
  - recharts (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - ChartConfig (named)
  - ChartContainer (named)
  - ChartTooltip (named)
  - ChartTooltipContent (named)
  - ChartLegend (named)
  - ChartLegendContent (named)
  - ChartStyle (named)
  -  (named)


### src/shared/ui/checkbox.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-checkbox (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Checkbox (named)


### src/shared/ui/collapsible.tsx
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - @radix-ui/react-collapsible (external)

**Imported By:**


**Exports:**
  - Collapsible (named)
  - CollapsibleTrigger (named)
  - CollapsibleContent (named)


### src/shared/ui/command.tsx
- **Imports**: 6 files
- **Imported by**: 0 files
- **Exports**: 10 items

**Imports:**
  - react (external)
  - @radix-ui/react-dialog (external)
  - cmdk (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/dialog.tsx (internal)

**Imported By:**


**Exports:**
  - Command (named)
  - CommandDialog (named)
  - CommandInput (named)
  - CommandList (named)
  - CommandEmpty (named)
  - CommandGroup (named)
  - CommandItem (named)
  - CommandShortcut (named)
  - CommandSeparator (named)
  -  (named)


### src/shared/ui/context-menu.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 16 items

**Imports:**
  - react (external)
  - @radix-ui/react-context-menu (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - ContextMenu (named)
  - ContextMenuTrigger (named)
  - ContextMenuContent (named)
  - ContextMenuItem (named)
  - ContextMenuCheckboxItem (named)
  - ContextMenuRadioItem (named)
  - ContextMenuLabel (named)
  - ContextMenuSeparator (named)
  - ContextMenuShortcut (named)
  - ContextMenuGroup (named)
  - ContextMenuPortal (named)
  - ContextMenuSub (named)
  - ContextMenuSubContent (named)
  - ContextMenuSubTrigger (named)
  - ContextMenuRadioGroup (named)
  -  (named)


### src/shared/ui/dialog.tsx
- **Imports**: 4 files
- **Imported by**: 6 files
- **Exports**: 11 items

**Imports:**
  - react (external)
  - @radix-ui/react-dialog (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/command.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/agents/ui/AddAgentDialog.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx
  - src/widgets/reports/ui/ReportViewer.tsx

**Exports:**
  - Dialog (named)
  - DialogPortal (named)
  - DialogOverlay (named)
  - DialogClose (named)
  - DialogTrigger (named)
  - DialogContent (named)
  - DialogHeader (named)
  - DialogFooter (named)
  - DialogTitle (named)
  - DialogDescription (named)
  -  (named)


### src/shared/ui/drawer.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 11 items

**Imports:**
  - react (external)
  - vaul (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Drawer (named)
  - DrawerPortal (named)
  - DrawerOverlay (named)
  - DrawerTrigger (named)
  - DrawerClose (named)
  - DrawerContent (named)
  - DrawerHeader (named)
  - DrawerFooter (named)
  - DrawerTitle (named)
  - DrawerDescription (named)
  -  (named)


### src/shared/ui/dropdown-menu.tsx
- **Imports**: 4 files
- **Imported by**: 3 files
- **Exports**: 16 items

**Imports:**
  - react (external)
  - @radix-ui/react-dropdown-menu (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/ActivityCard.tsx
  - src/widgets/agents/ui/AgentCard.tsx
  - src/widgets/reports/ui/ReportCard.tsx

**Exports:**
  - DropdownMenu (named)
  - DropdownMenuTrigger (named)
  - DropdownMenuContent (named)
  - DropdownMenuItem (named)
  - DropdownMenuCheckboxItem (named)
  - DropdownMenuRadioItem (named)
  - DropdownMenuLabel (named)
  - DropdownMenuSeparator (named)
  - DropdownMenuShortcut (named)
  - DropdownMenuGroup (named)
  - DropdownMenuPortal (named)
  - DropdownMenuSub (named)
  - DropdownMenuSubContent (named)
  - DropdownMenuSubTrigger (named)
  - DropdownMenuRadioGroup (named)
  -  (named)


### src/shared/ui/enhanced-mobile-components.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - MobilePageLayout (named)
  - ResponsiveCard (named)
  - ResponsiveList (named)
  - ResponsiveHeader (named)


### src/shared/ui/enhanced-responsive-layout.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)

**Imported By:**


**Exports:**
  - ResponsiveContainer (named)
  - ResponsiveGrid (named)
  - ResponsiveGridContainer (named)
  - ResponsiveStack (named)


### src/shared/ui/enhanced-responsive-navigation.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - ResponsiveNavigation (named)


### src/shared/ui/error-boundary.tsx
- **Imports**: 4 files
- **Imported by**: 3 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/card.tsx (internal)
  - lucide-react (external)

**Imported By:**
  - src/app/App.tsx
  - src/pages/properties/ui/PropertiesPage.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - ErrorBoundary (named)
  - withErrorBoundary (named)


### src/shared/ui/font-loader.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-font-loading.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - FontLoader (named)
  - DisplayText (named)
  - BodyText (named)


### src/shared/ui/form.tsx
- **Imports**: 6 files
- **Imported by**: 2 files
- **Exports**: 9 items

**Imports:**
  - react (external)
  - @radix-ui/react-label (external)
  - @radix-ui/react-slot (external)
  - react-hook-form (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/label.tsx (internal)

**Imported By:**
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**
  - useFormField (named)
  - Form (named)
  - FormItem (named)
  - FormLabel (named)
  - FormControl (named)
  - FormDescription (named)
  - FormMessage (named)
  - FormField (named)
  -  (named)


### src/shared/ui/hover-card.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - @radix-ui/react-hover-card (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - HoverCard (named)
  - HoverCardTrigger (named)
  - HoverCardContent (named)


### src/shared/ui/icon.tsx
- **Imports**: 17 files
- **Imported by**: 0 files
- **Exports**: 48 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - lucide-react/dynamicIconImports (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - BundledIcons (named)
  - Icon (named)
  - // Navigation
  ChevronRight (named)
  - ChevronDown (named)
  - ChevronLeft (named)
  - ChevronUp (named)
  - ArrowLeft (named)
  - ArrowRight (named)
  - ArrowUp (named)
  - ArrowDown (named)
  - Home (named)
  - Menu (named)
  - // Actions
  Plus (named)
  - Minus (named)
  - X (named)
  - Check (named)
  - Search (named)
  - Filter (named)
  - Edit (named)
  - Trash2 (named)
  - Download (named)
  - Upload (named)
  - Save (named)
  - // Communication
  Mail (named)
  - Phone (named)
  - MessageSquare (named)
  - Bell (named)
  - // Business
  Users (named)
  - User (named)
  - Building (named)
  - Calendar (named)
  - Clock (named)
  - DollarSign (named)
  - TrendingUp (named)
  - TrendingDown (named)
  - BarChart3 (named)
  - Target (named)
  - // System
  Settings (named)
  - Cog (named)
  - Info (named)
  - AlertTriangle (named)
  - CheckCircle (named)
  - Circle (named)
  - // Media
  Image (named)
  - FileText (named)
  - File (named)
  - Folder (named)
  -  (named)


### src/shared/ui/index.ts
- **Imports**: 0 files
- **Imported by**: 3 files
- **Exports**: 6 items

**Imports:**


**Imported By:**
  - src/pages/dashboard/ui/DashboardPage.tsx
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/layout/ui/ResponsiveLayout.tsx

**Exports:**
  - Toaster (named)
  - Toaster (named)
  - ResponsiveContainer (named)
  - ResponsiveGrid (named)
  - ResponsiveStack (named)
  - ResponsiveGridContainer (named)


### src/shared/ui/input-otp.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - input-otp (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - InputOTP (named)
  - InputOTPGroup (named)
  - InputOTPSlot (named)
  - InputOTPSeparator (named)


### src/shared/ui/input.tsx
- **Imports**: 2 files
- **Imported by**: 12 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/pages/reports/ui/ReportsPage.tsx
  - src/shared/ui/responsive-form.tsx
  - src/shared/ui/sidebar.tsx
  - src/widgets/activities/ui/ActivitiesHeader.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/agents/ui/AddAgentDialog.tsx
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx
  - src/widgets/mobile/ui/MobileHeader.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/properties/ui/PropertiesFilters.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**
  - Input (named)


### src/shared/ui/label.tsx
- **Imports**: 4 files
- **Imported by**: 5 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-label (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/form.tsx
  - src/shared/ui/responsive-form.tsx
  - src/widgets/activities/ui/ActivityFilters.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/agents/ui/AddAgentDialog.tsx

**Exports:**
  - Label (named)


### src/shared/ui/loading-spinner.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/app/App.tsx

**Exports:**
  - LoadingSpinner (named)


### src/shared/ui/menubar.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 17 items

**Imports:**
  - react (external)
  - @radix-ui/react-menubar (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Menubar (named)
  - MenubarMenu (named)
  - MenubarTrigger (named)
  - MenubarContent (named)
  - MenubarItem (named)
  - MenubarSeparator (named)
  - MenubarLabel (named)
  - MenubarCheckboxItem (named)
  - MenubarRadioGroup (named)
  - MenubarRadioItem (named)
  - MenubarPortal (named)
  - MenubarSubContent (named)
  - MenubarSubTrigger (named)
  - MenubarGroup (named)
  - MenubarSub (named)
  - MenubarShortcut (named)
  -  (named)


### src/shared/ui/mobile-bottom-sheet.tsx
- **Imports**: 6 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)
  - src/shared/hooks/use-safe-area.ts (internal)
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - MobileBottomSheet (named)


### src/shared/ui/mobile-card.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/MobilePropertyCard.tsx

**Exports:**
  - MobileCard (named)


### src/shared/ui/mobile-drawer.tsx
- **Imports**: 6 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)
  - src/shared/hooks/use-safe-area.ts (internal)
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)

**Imported By:**
  - src/widgets/mobile/ui/MobileHeader.tsx

**Exports:**
  - MobileDrawer (named)


### src/shared/ui/mobile-enhanced-input.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)
  - lucide-react (external)
  - src/shared/ui/mobile-optimized-button.tsx (internal)

**Imported By:**


**Exports:**
  - MobileInputProps (named)
  - MobileInput (named)
  - MobileSearchInput (named)
  - mobileInputVariants (named)


### src/shared/ui/mobile-list-item.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/activities/ui/MobileActivityCard.tsx

**Exports:**
  - MobileListItem (named)


### src/shared/ui/mobile-optimized-button.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - @radix-ui/react-slot (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)

**Imported By:**
  - src/shared/ui/mobile-enhanced-input.tsx

**Exports:**
  - MobileButtonProps (named)
  - MobileButton (named)
  - mobileButtonVariants (named)


### src/shared/ui/mobile-optimized-card.tsx
- **Imports**: 4 files
- **Imported by**: 3 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-touch.ts (internal)

**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/widgets/agents/ui/MobileAgentCard.tsx

**Exports:**
  - MobileOptimizedCard (named)


### src/shared/ui/mobile-tab-bar.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - react-router-dom (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-safe-area.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/mobile/ui/MobileNavigation.tsx

**Exports:**
  - MobileTabBar (named)


### src/shared/ui/navigation-menu.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 10 items

**Imports:**
  - react (external)
  - @radix-ui/react-navigation-menu (external)
  - class-variance-authority (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - navigationMenuTriggerStyle (named)
  - NavigationMenu (named)
  - NavigationMenuList (named)
  - NavigationMenuItem (named)
  - NavigationMenuContent (named)
  - NavigationMenuTrigger (named)
  - NavigationMenuLink (named)
  - NavigationMenuIndicator (named)
  - NavigationMenuViewport (named)
  -  (named)


### src/shared/ui/optimized-image-v2.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-render-optimization.ts (internal)
  - src/shared/hooks/use-memory-optimization.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx

**Exports:**
  - OptimizedImageV2 (named)
  - OptimizedBackgroundImage (named)


### src/shared/ui/optimized-image.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/lib/image-optimization.ts (internal)

**Imported By:**


**Exports:**
  - OptimizedImage (named)


### src/shared/ui/optimized-list.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-render-optimization.ts (internal)
  - src/shared/hooks/use-memory-optimization.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - OptimizedList (named)
  - SimpleOptimizedList (named)


### src/shared/ui/pagination.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 8 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**
  - Pagination (named)
  - PaginationContent (named)
  - PaginationEllipsis (named)
  - PaginationItem (named)
  - PaginationLink (named)
  - PaginationNext (named)
  - PaginationPrevious (named)
  -  (named)


### src/shared/ui/performance-monitor.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-performance.ts (internal)
  - src/shared/hooks/use-mobile-performance.ts (internal)
  - src/shared/hooks/use-memory-optimization.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/app/App.tsx

**Exports:**
  - PerformanceMonitor (named)


### src/shared/ui/popover.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - @radix-ui/react-popover (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/AddActivityDialog.tsx

**Exports:**
  - Popover (named)
  - PopoverTrigger (named)
  - PopoverContent (named)


### src/shared/ui/progress.tsx
- **Imports**: 3 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-progress (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/pages/deals/ui/DealsPage.tsx
  - src/widgets/dashboard/ui/DealsOverview.tsx

**Exports:**
  - Progress (named)


### src/shared/ui/property-skeleton.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**
  - react (external)
  - src/shared/ui/skeleton.tsx (internal)
  - src/shared/ui/card.tsx (internal)

**Imported By:**
  - src/pages/properties/ui/PropertiesPage.tsx

**Exports:**
  - PropertyCardSkeleton (named)
  - MobilePropertyCardSkeleton (named)
  - PropertiesGridSkeleton (named)


### src/shared/ui/pull-to-refresh.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/mobile/ui/MobileLayout.tsx

**Exports:**
  - PullToRefresh (named)


### src/shared/ui/radio-group.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - @radix-ui/react-radio-group (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - RadioGroup (named)
  - RadioGroupItem (named)


### src/shared/ui/resizable.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - lucide-react (external)
  - react-resizable-panels (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - ResizablePanelGroup (named)
  - ResizablePanel (named)
  - ResizableHandle (named)


### src/shared/ui/responsive-form.tsx
- **Imports**: 6 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/label.tsx (internal)

**Imported By:**


**Exports:**
  - ResponsiveForm (named)
  - ResponsiveFormField (named)
  - ResponsiveInput (named)
  - ResponsiveButtonGroup (named)


### src/shared/ui/scroll-area.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - @radix-ui/react-scroll-area (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - ScrollArea (named)
  - ScrollBar (named)


### src/shared/ui/select.tsx
- **Imports**: 4 files
- **Imported by**: 5 files
- **Exports**: 11 items

**Imports:**
  - react (external)
  - @radix-ui/react-select (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/ActivityFilters.tsx
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/agents/ui/AddAgentDialog.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**
  - Select (named)
  - SelectGroup (named)
  - SelectValue (named)
  - SelectTrigger (named)
  - SelectContent (named)
  - SelectLabel (named)
  - SelectItem (named)
  - SelectSeparator (named)
  - SelectScrollUpButton (named)
  - SelectScrollDownButton (named)
  -  (named)


### src/shared/ui/separator.tsx
- **Imports**: 3 files
- **Imported by**: 5 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-separator (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/sidebar.tsx
  - src/widgets/layout/ui/NotificationsDropdown.tsx
  - src/widgets/layout/ui/SettingsDropdown.tsx
  - src/widgets/layout/ui/UserAccountDropdown.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**
  - Separator (named)


### src/shared/ui/sheet.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 10 items

**Imports:**
  - @radix-ui/react-dialog (external)
  - class-variance-authority (external)
  - lucide-react (external)
  - react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/sidebar.tsx

**Exports:**
  - Sheet (named)
  - SheetClose (named)
  - SheetContent (named)
  - SheetDescription (named)
  - SheetFooter (named)
  - SheetHeader (named)
  - SheetOverlay (named)
  - SheetPortal (named)
  - SheetTitle (named)
  - SheetTrigger (named)


### src/shared/ui/sidebar.tsx
- **Imports**: 12 files
- **Imported by**: 2 files
- **Exports**: 25 items

**Imports:**
  - react (external)
  - @radix-ui/react-slot (external)
  - class-variance-authority (external)
  - lucide-react (external)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/separator.tsx (internal)
  - src/shared/ui/sheet.tsx (internal)
  - src/shared/ui/skeleton.tsx (internal)
  - src/shared/ui/tooltip.tsx (internal)

**Imported By:**
  - src/widgets/layout/ui/Layout.tsx
  - src/widgets/layout/ui/Sidebar.tsx

**Exports:**
  - Sidebar (named)
  - SidebarContent (named)
  - SidebarFooter (named)
  - SidebarGroup (named)
  - SidebarGroupAction (named)
  - SidebarGroupContent (named)
  - SidebarGroupLabel (named)
  - SidebarHeader (named)
  - SidebarInput (named)
  - SidebarInset (named)
  - SidebarMenu (named)
  - SidebarMenuAction (named)
  - SidebarMenuBadge (named)
  - SidebarMenuButton (named)
  - SidebarMenuItem (named)
  - SidebarMenuSkeleton (named)
  - SidebarMenuSub (named)
  - SidebarMenuSubButton (named)
  - SidebarMenuSubItem (named)
  - SidebarProvider (named)
  - SidebarRail (named)
  - SidebarSeparator (named)
  - SidebarTrigger (named)
  - useSidebar (named)
  -  (named)


### src/shared/ui/skeleton.tsx
- **Imports**: 1 files
- **Imported by**: 4 files
- **Exports**: 1 items

**Imports:**
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/property-skeleton.tsx
  - src/shared/ui/sidebar.tsx
  - src/widgets/properties/ui/MobilePropertyCard.tsx
  - src/widgets/properties/ui/PropertyCard.tsx

**Exports:**
  - Skeleton (named)


### src/shared/ui/slider.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-slider (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Slider (named)


### src/shared/ui/sonner.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - next-themes (external)
  - sonner (external)

**Imported By:**
  - src/app/App.tsx

**Exports:**
  - Toaster (named)
  - toast (named)


### src/shared/ui/switch.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - @radix-ui/react-switch (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/layout/ui/SettingsDropdown.tsx

**Exports:**
  - Switch (named)


### src/shared/ui/table.tsx
- **Imports**: 2 files
- **Imported by**: 0 files
- **Exports**: 9 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Table (named)
  - TableHeader (named)
  - TableBody (named)
  - TableFooter (named)
  - TableHead (named)
  - TableRow (named)
  - TableCell (named)
  - TableCaption (named)
  -  (named)


### src/shared/ui/tabs.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - @radix-ui/react-tabs (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - Tabs (named)
  - TabsList (named)
  - TabsTrigger (named)
  - TabsContent (named)


### src/shared/ui/textarea.tsx
- **Imports**: 2 files
- **Imported by**: 3 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/AddActivityDialog.tsx
  - src/widgets/properties/ui/AddPropertyDialog.tsx
  - src/widgets/reports/ui/ReportBuilder.tsx

**Exports:**
  - TextareaProps (named)
  - Textarea (named)


### src/shared/ui/toast.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 10 items

**Imports:**
  - react (external)
  - @radix-ui/react-toast (external)
  - class-variance-authority (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/toaster.tsx

**Exports:**
  - type ToastProps (named)
  - type ToastActionElement (named)
  - ToastProvider (named)
  - ToastViewport (named)
  - Toast (named)
  - ToastTitle (named)
  - ToastDescription (named)
  - ToastClose (named)
  - ToastAction (named)
  -  (named)


### src/shared/ui/toaster.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/hooks/use-toast.ts (internal)
  - src/shared/ui/toast.tsx (internal)

**Imported By:**
  - src/app/App.tsx

**Exports:**
  - Toaster (named)


### src/shared/ui/toggle-group.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - @radix-ui/react-toggle-group (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/toggle.tsx (internal)

**Imported By:**


**Exports:**
  - ToggleGroup (named)
  - ToggleGroupItem (named)


### src/shared/ui/toggle.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 2 items

**Imports:**
  - react (external)
  - @radix-ui/react-toggle (external)
  - class-variance-authority (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/shared/ui/toggle-group.tsx

**Exports:**
  - Toggle (named)
  - toggleVariants (named)


### src/shared/ui/tooltip.tsx
- **Imports**: 3 files
- **Imported by**: 2 files
- **Exports**: 4 items

**Imports:**
  - react (external)
  - @radix-ui/react-tooltip (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/app/App.tsx
  - src/shared/ui/sidebar.tsx

**Exports:**
  - Tooltip (named)
  - TooltipTrigger (named)
  - TooltipContent (named)
  - TooltipProvider (named)


### src/shared/ui/touch-button.tsx
- **Imports**: 4 files
- **Imported by**: 3 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/button.tsx (internal)
  - src/shared/hooks/use-touch.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/dashboard/ui/MobileRecentActivity.tsx
  - src/widgets/mobile/ui/MobileHeader.tsx
  - src/widgets/properties/ui/MobilePropertyCard.tsx

**Exports:**
  - TouchButton (named)


### src/shared/ui/use-toast.ts
- **Imports**: 1 files
- **Imported by**: 0 files
- **Exports**: 3 items

**Imports:**
  - react (external)

**Imported By:**


**Exports:**
  - reducer (named)
  - useToast (named)
  - toast (named)


### src/shared/ui/virtual-list.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-virtual-scroll.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - VirtualList (named)


### src/shared/ui/__tests__/button.test.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**
  - @testing-library/react (external)
  - vitest (external)
  - src/shared/ui/button.tsx (internal)

**Imported By:**


**Exports:**



### src/test-setup.ts
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**
  - @testing-library/jest-dom (external)
  - vitest (external)
  - @testing-library/react (external)

**Imported By:**


**Exports:**



### src/vite-env.d.ts
- **Imports**: 0 files
- **Imported by**: 0 files
- **Exports**: 0 items

**Imports:**


**Imported By:**


**Exports:**



### src/widgets/activities/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 7 items

**Imports:**


**Imported By:**
  - src/pages/activities/ui/ActivitiesPage.tsx

**Exports:**
  - ActivitiesHeader (named)
  - ActivitiesStats (named)
  - ActivitiesGrid (named)
  - ActivityCard (named)
  - MobileActivityCard (named)
  - AddActivityDialog (named)
  - ActivityFilters (named)


### src/widgets/activities/ui/ActivitiesGrid.tsx
- **Imports**: 6 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/widgets/activities/ui/ActivityCard.tsx (internal)
  - src/widgets/activities/ui/MobileActivityCard.tsx (internal)
  - src/entities/activity/index.ts (internal)
  - sonner (external)

**Imported By:**


**Exports:**
  - ActivitiesGrid (named)


### src/widgets/activities/ui/ActivitiesHeader.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)

**Imported By:**


**Exports:**
  - ActivitiesHeader (named)


### src/widgets/activities/ui/ActivitiesStats.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - lucide-react (external)
  - src/shared/ui/card.tsx (internal)
  - src/entities/activity/index.ts (internal)

**Imported By:**


**Exports:**
  - ActivitiesStats (named)


### src/widgets/activities/ui/ActivityCard.tsx
- **Imports**: 9 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - date-fns (external)
  - lucide-react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/avatar.tsx (internal)
  - src/shared/ui/dropdown-menu.tsx (internal)
  - src/entities/activity/index.ts (internal)
  - src/entities/contact/index.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/ActivitiesGrid.tsx

**Exports:**
  - ActivityCard (named)


### src/widgets/activities/ui/ActivityFilters.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/label.tsx (internal)
  - src/shared/ui/select.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - ActivityFilters (named)


### src/widgets/activities/ui/AddActivityDialog.tsx
- **Imports**: 14 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - date-fns (external)
  - src/shared/ui/dialog.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/label.tsx (internal)
  - src/shared/ui/textarea.tsx (internal)
  - src/shared/ui/select.tsx (internal)
  - src/shared/ui/calendar.tsx (internal)
  - src/shared/ui/popover.tsx (internal)
  - src/shared/lib/utils.ts (internal)
  - src/entities/contact/index.ts (internal)
  - sonner (external)

**Imported By:**


**Exports:**
  - AddActivityDialog (named)


### src/widgets/activities/ui/MobileActivityCard.tsx
- **Imports**: 7 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - date-fns (external)
  - lucide-react (external)
  - src/shared/ui/mobile-list-item.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/avatar.tsx (internal)
  - src/entities/activity/index.ts (internal)
  - src/entities/contact/index.ts (internal)

**Imported By:**
  - src/widgets/activities/ui/ActivitiesGrid.tsx

**Exports:**
  - MobileActivityCard (named)


### src/widgets/agents/index.ts
- **Imports**: 0 files
- **Imported by**: 0 files
- **Exports**: 6 items

**Imports:**


**Imported By:**


**Exports:**
  - AgentsHeader (named)
  - AgentsGrid (named)
  - AgentsStats (named)
  - AgentCard (named)
  - MobileAgentCard (named)
  - AddAgentDialog (named)


### src/widgets/agents/ui/AddAgentDialog.tsx
- **Imports**: 6 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/dialog.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/label.tsx (internal)
  - src/shared/ui/select.tsx (internal)
  - react (external)

**Imported By:**
  - src/widgets/agents/ui/AgentsHeader.tsx

**Exports:**
  - AddAgentDialog (named)


### src/widgets/agents/ui/AgentCard.tsx
- **Imports**: 7 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/avatar.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - lucide-react (external)
  - src/shared/ui/dropdown-menu.tsx (internal)
  - src/entities/user/index.ts (internal)

**Imported By:**
  - src/widgets/agents/ui/AgentsGrid.tsx

**Exports:**
  - AgentCard (named)


### src/widgets/agents/ui/AgentsGrid.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/entities/user/index.ts (internal)
  - src/widgets/agents/ui/AgentCard.tsx (internal)
  - src/widgets/agents/ui/MobileAgentCard.tsx (internal)
  - src/shared/hooks/use-mobile.tsx (internal)

**Imported By:**
  - src/pages/agents/ui/AgentsPage.tsx

**Exports:**
  - AgentsGrid (named)


### src/widgets/agents/ui/AgentsHeader.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)
  - src/widgets/agents/ui/AddAgentDialog.tsx (internal)
  - react (external)

**Imported By:**
  - src/pages/agents/ui/AgentsPage.tsx

**Exports:**
  - AgentsHeader (named)


### src/widgets/agents/ui/AgentsStats.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - lucide-react (external)

**Imported By:**
  - src/pages/agents/ui/AgentsPage.tsx

**Exports:**
  - AgentsStats (named)


### src/widgets/agents/ui/MobileAgentCard.tsx
- **Imports**: 5 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/mobile-optimized-card.tsx (internal)
  - src/shared/ui/avatar.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - lucide-react (external)
  - src/entities/user/index.ts (internal)

**Imported By:**
  - src/widgets/agents/ui/AgentsGrid.tsx

**Exports:**
  - MobileAgentCard (named)


### src/widgets/dashboard/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 5 items

**Imports:**


**Imported By:**
  - src/pages/dashboard/ui/DashboardPage.tsx

**Exports:**
  - StatsCard (named)
  - RecentActivity (named)
  - DealsOverview (named)
  - HeroSection (named)
  - MarketInsights (named)


### src/widgets/dashboard/ui/DealsOverview.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/progress.tsx (internal)
  - src/entities/deal/index.ts (internal)

**Imported By:**


**Exports:**
  - DealsOverview (named)


### src/widgets/dashboard/ui/HeroSection.tsx
- **Imports**: 9 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - react-router-dom (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - lucide-react (external)
  - src/widgets/properties/ui/AddPropertyDialog.tsx (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/shared/ui/index.ts (internal)

**Imported By:**


**Exports:**
  - HeroSection (named)


### src/widgets/dashboard/ui/MarketInsights.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - MarketInsights (named)


### src/widgets/dashboard/ui/MobileDashboardStats.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - MobileDashboardStats (named)


### src/widgets/dashboard/ui/MobileRecentActivity.tsx
- **Imports**: 6 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/touch-button.tsx (internal)
  - src/entities/activity/index.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/dashboard/ui/RecentActivity.tsx

**Exports:**
  - MobileRecentActivity (named)


### src/widgets/dashboard/ui/RecentActivity.tsx
- **Imports**: 9 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/entities/activity/index.ts (internal)
  - src/entities/property/index.ts (internal)
  - src/widgets/properties/ui/PropertyCard.tsx (internal)
  - src/widgets/dashboard/ui/MobileRecentActivity.tsx (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - RecentActivity (named)


### src/widgets/dashboard/ui/StatsCard.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - lucide-react (external)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)

**Imported By:**


**Exports:**
  - StatsCard (named)


### src/widgets/layout/index.ts
- **Imports**: 0 files
- **Imported by**: 7 files
- **Exports**: 7 items

**Imports:**


**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/dashboard/ui/DashboardPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/not-found/ui/NotFoundPage.tsx
  - src/pages/properties/ui/PropertiesPage.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/pages/settings/ui/SettingsPage.tsx

**Exports:**
  - Layout (named)
  - Header (named)
  - Sidebar (named)
  - ResponsiveLayout (named)
  - MobileNavigation (named)
  - MobileHeader (named)
  - MobileLayout (named)


### src/widgets/layout/ui/EnhancedHeader.tsx
- **Imports**: 8 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/widgets/layout/ui/NotificationsDropdown.tsx (internal)
  - src/widgets/layout/ui/SettingsDropdown.tsx (internal)
  - src/widgets/layout/ui/UserAccountDropdown.tsx (internal)

**Imported By:**


**Exports:**
  - Header (named)


### src/widgets/layout/ui/Header.tsx
- **Imports**: 8 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/widgets/layout/ui/NotificationsDropdown.tsx (internal)
  - src/widgets/layout/ui/SettingsDropdown.tsx (internal)
  - src/widgets/layout/ui/UserAccountDropdown.tsx (internal)

**Imported By:**
  - src/widgets/layout/ui/Layout.tsx

**Exports:**
  - Header (named)


### src/widgets/layout/ui/Layout.tsx
- **Imports**: 3 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/layout/ui/Sidebar.tsx (internal)
  - src/widgets/layout/ui/Header.tsx (internal)
  - src/shared/ui/sidebar.tsx (internal)

**Imported By:**
  - src/widgets/layout/ui/ResponsiveLayout.tsx

**Exports:**
  - Layout (named)


### src/widgets/layout/ui/NotificationsDropdown.tsx
- **Imports**: 6 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/separator.tsx (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx

**Exports:**
  - NotificationsDropdown (named)


### src/widgets/layout/ui/ResponsiveLayout.tsx
- **Imports**: 5 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/widgets/layout/ui/Layout.tsx (internal)
  - src/widgets/mobile/index.ts (internal)
  - src/shared/ui/index.ts (internal)

**Imported By:**
  - src/pages/activities/ui/ActivitiesPage.tsx
  - src/pages/agents/ui/AgentsPage.tsx

**Exports:**
  - ResponsiveLayout (named)


### src/widgets/layout/ui/SettingsDropdown.tsx
- **Imports**: 6 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/separator.tsx (internal)
  - src/shared/ui/switch.tsx (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx

**Exports:**
  - SettingsDropdown (named)


### src/widgets/layout/ui/Sidebar.tsx
- **Imports**: 4 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react-router-dom (external)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)
  - src/shared/ui/sidebar.tsx (internal)

**Imported By:**
  - src/widgets/layout/ui/Layout.tsx

**Exports:**
  - Sidebar (named)


### src/widgets/layout/ui/UserAccountDropdown.tsx
- **Imports**: 7 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/separator.tsx (internal)
  - src/shared/ui/avatar.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/layout/ui/EnhancedHeader.tsx
  - src/widgets/layout/ui/Header.tsx

**Exports:**
  - UserAccountDropdown (named)


### src/widgets/mobile/index.ts
- **Imports**: 0 files
- **Imported by**: 7 files
- **Exports**: 3 items

**Imports:**


**Imported By:**
  - src/pages/contacts/ui/ContactsPage.tsx
  - src/pages/dashboard/ui/DashboardPage.tsx
  - src/pages/deals/ui/DealsPage.tsx
  - src/pages/properties/ui/PropertiesPage.tsx
  - src/pages/reports/ui/ReportsPage.tsx
  - src/pages/settings/ui/SettingsPage.tsx
  - src/widgets/layout/ui/ResponsiveLayout.tsx

**Exports:**
  - MobileNavigation (named)
  - MobileHeader (named)
  - MobileLayout (named)


### src/widgets/mobile/ui/MobileHeader.tsx
- **Imports**: 7 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - lucide-react (external)
  - src/shared/ui/touch-button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/mobile-drawer.tsx (internal)
  - src/shared/hooks/use-safe-area.ts (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/mobile/ui/MobileLayout.tsx

**Exports:**
  - MobileHeader (named)


### src/widgets/mobile/ui/MobileLayout.tsx
- **Imports**: 5 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/widgets/mobile/ui/MobileHeader.tsx (internal)
  - src/widgets/mobile/ui/MobileNavigation.tsx (internal)
  - src/shared/hooks/use-responsive-breakpoint.ts (internal)
  - src/shared/ui/pull-to-refresh.tsx (internal)
  - src/shared/lib/utils.ts (internal)

**Imported By:**


**Exports:**
  - MobileLayout (named)


### src/widgets/mobile/ui/MobileNavigation.tsx
- **Imports**: 2 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - lucide-react (external)
  - src/shared/ui/mobile-tab-bar.tsx (internal)

**Imported By:**
  - src/widgets/mobile/ui/MobileLayout.tsx

**Exports:**
  - MobileNavigation (named)


### src/widgets/properties/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 7 items

**Imports:**


**Imported By:**
  - src/pages/properties/ui/PropertiesPage.tsx

**Exports:**
  - PropertiesHeader (named)
  - PropertiesFilters (named)
  - PropertiesStats (named)
  - PropertiesGrid (named)
  - PropertyCard (named)
  - MobilePropertyCard (named)
  - AddPropertyDialog (named)


### src/widgets/properties/ui/AddPropertyDialog.tsx
- **Imports**: 12 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - react-hook-form (external)
  - @hookform/resolvers/zod (external)
  - zod (external)
  - src/shared/ui/dialog.tsx (internal)
  - src/shared/ui/form.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/textarea.tsx (internal)
  - src/shared/ui/select.tsx (internal)
  - src/shared/hooks/use-toast.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/dashboard/ui/HeroSection.tsx
  - src/widgets/properties/ui/PropertiesHeader.tsx

**Exports:**
  - AddPropertyDialog (named)


### src/widgets/properties/ui/MobilePropertyCard.tsx
- **Imports**: 9 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/touch-button.tsx (internal)
  - src/shared/ui/mobile-card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/skeleton.tsx (internal)
  - src/entities/property/index.ts (internal)
  - lucide-react (external)
  - src/shared/lib/property-utils.ts (internal)
  - src/shared/hooks/use-property-actions.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - MobilePropertyCard (named)


### src/widgets/properties/ui/OptimizedPropertyCard.tsx
- **Imports**: 9 files
- **Imported by**: 1 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/optimized-image-v2.tsx (internal)
  - src/shared/hooks/use-optimized-memo.ts (internal)
  - src/entities/property/index.ts (internal)
  - lucide-react (external)
  - src/shared/lib/utils.ts (internal)

**Imported By:**
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - OptimizedPropertyCard (named)


### src/widgets/properties/ui/PropertiesFilters.tsx
- **Imports**: 4 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - lucide-react (external)
  - src/shared/providers/PropertiesProvider.tsx (internal)

**Imported By:**


**Exports:**
  - PropertiesFilters (named)


### src/widgets/properties/ui/PropertiesGrid.tsx
- **Imports**: 13 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/widgets/properties/ui/PropertyCard.tsx (internal)
  - src/widgets/properties/ui/MobilePropertyCard.tsx (internal)
  - src/widgets/properties/ui/OptimizedPropertyCard.tsx (internal)
  - src/entities/property/index.ts (internal)
  - src/shared/hooks/use-mobile.tsx (internal)
  - src/shared/ui/virtual-list.tsx (internal)
  - src/shared/ui/optimized-list.tsx (internal)
  - src/shared/hooks/use-mobile-performance.ts (internal)
  - src/shared/providers/PropertiesProvider.tsx (internal)
  - src/shared/hooks/use-render-optimization.ts (internal)
  - src/shared/ui/error-boundary.tsx (internal)
  - src/shared/ui/alert.tsx (internal)

**Imported By:**


**Exports:**
  - PropertiesGrid (named)


### src/widgets/properties/ui/PropertiesHeader.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/button.tsx (internal)
  - lucide-react (external)
  - src/widgets/properties/ui/AddPropertyDialog.tsx (internal)

**Imported By:**


**Exports:**
  - PropertiesHeader (named)


### src/widgets/properties/ui/PropertiesStats.tsx
- **Imports**: 3 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/providers/PropertiesProvider.tsx (internal)
  - src/shared/lib/property-utils.ts (internal)

**Imported By:**


**Exports:**
  - PropertiesStats (named)


### src/widgets/properties/ui/PropertyCard.tsx
- **Imports**: 7 files
- **Imported by**: 2 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/skeleton.tsx (internal)
  - src/entities/property/index.ts (internal)
  - lucide-react (external)

**Imported By:**
  - src/widgets/dashboard/ui/RecentActivity.tsx
  - src/widgets/properties/ui/PropertiesGrid.tsx

**Exports:**
  - PropertyCard (named)


### src/widgets/reports/index.ts
- **Imports**: 0 files
- **Imported by**: 1 files
- **Exports**: 3 items

**Imports:**


**Imported By:**
  - src/pages/reports/ui/ReportsPage.tsx

**Exports:**
  - ReportBuilder (named)
  - ReportCard (named)
  - ReportViewer (named)


### src/widgets/reports/ui/ReportBuilder.tsx
- **Imports**: 17 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - react-hook-form (external)
  - @hookform/resolvers/zod (external)
  - zod (external)
  - src/shared/ui/dialog.tsx (internal)
  - src/shared/ui/form.tsx (internal)
  - src/shared/ui/input.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/textarea.tsx (internal)
  - src/shared/ui/select.tsx (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/shared/ui/separator.tsx (internal)
  - src/shared/hooks/use-toast.ts (internal)
  - src/shared/lib/report-store.ts (internal)
  - src/entities/report/index.ts (internal)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - ReportBuilder (named)


### src/widgets/reports/ui/ReportCard.tsx
- **Imports**: 7 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/entities/report/index.ts (internal)
  - src/shared/lib/report-store.ts (internal)
  - lucide-react (external)
  - src/shared/ui/dropdown-menu.tsx (internal)

**Imported By:**


**Exports:**
  - ReportCard (named)


### src/widgets/reports/ui/ReportViewer.tsx
- **Imports**: 9 files
- **Imported by**: 0 files
- **Exports**: 1 items

**Imports:**
  - react (external)
  - src/shared/ui/dialog.tsx (internal)
  - src/shared/ui/card.tsx (internal)
  - src/shared/ui/button.tsx (internal)
  - src/shared/ui/badge.tsx (internal)
  - src/entities/report/index.ts (internal)
  - src/shared/lib/report-store.ts (internal)
  - recharts (external)
  - lucide-react (external)

**Imported By:**


**Exports:**
  - ReportViewer (named)

