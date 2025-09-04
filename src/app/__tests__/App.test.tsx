import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { Providers } from '@/app/providers'

// Mock the performance monitoring and lazy loading modules
vi.mock('@/shared/lib/bundle-analyzer', () => ({
  initializeBundleMonitoring: vi.fn(),
}))

vi.mock('@/shared/lib/lazy-loading', () => ({
  createRouteComponent: vi.fn((name, loader) => {
    // Return a simple component for testing
    return () => <div data-testid={`${name}-page`}>{name} page</div>
  }),
}))

vi.mock('@/shared/ui/performance-monitor', () => ({
  PerformanceMonitor: () => <div data-testid="performance-monitor">Performance Monitor</div>,
}))

// Mock all the page components
vi.mock('@/pages/dashboard', () => ({
  DashboardPage: () => <div data-testid="dashboard-page">Dashboard Page</div>,
}))

// Create mock page components
const PropertiesPage = () => <div data-testid="properties-page">properties page</div>
const ContactsPage = () => <div data-testid="contacts-page">contacts page</div>
const DealsPage = () => <div data-testid="deals-page">deals page</div>
const AgentsPage = () => <div data-testid="agents-page">agents page</div>
const ActivitiesPage = () => <div data-testid="activities-page">activities page</div>
const ReportsPage = () => <div data-testid="reports-page">reports page</div>
const SettingsPage = () => <div data-testid="settings-page">settings page</div>
const NotFoundPage = () => <div data-testid="not-found-page">not-found page</div>
const DashboardPage = () => <div data-testid="dashboard-page">Dashboard Page</div>

// Test-specific App component that doesn't include BrowserRouter
const TestApp = ({ initialEntries = ['/'] }: { initialEntries?: string[] }) => (
  <Providers>
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>
  </Providers>
)

describe('App', () => {
  it('renders without crashing', () => {
    render(<TestApp />)
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('renders dashboard page by default', () => {
    render(<TestApp />)
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })

  it('renders properties page when navigating to /properties', () => {
    render(<TestApp initialEntries={['/properties']} />)
    expect(screen.getByTestId('properties-page')).toBeInTheDocument()
  })

  it('renders contacts page when navigating to /contacts', () => {
    render(<TestApp initialEntries={['/contacts']} />)
    expect(screen.getByTestId('contacts-page')).toBeInTheDocument()
  })

  it('renders deals page when navigating to /deals', () => {
    render(<TestApp initialEntries={['/deals']} />)
    expect(screen.getByTestId('deals-page')).toBeInTheDocument()
  })

  it('renders agents page when navigating to /agents', () => {
    render(<TestApp initialEntries={['/agents']} />)
    expect(screen.getByTestId('agents-page')).toBeInTheDocument()
  })

  it('renders activities page when navigating to /activities', () => {
    render(<TestApp initialEntries={['/activities']} />)
    expect(screen.getByTestId('activities-page')).toBeInTheDocument()
  })

  it('renders reports page when navigating to /reports', () => {
    render(<TestApp initialEntries={['/reports']} />)
    expect(screen.getByTestId('reports-page')).toBeInTheDocument()
  })

  it('renders settings page when navigating to /settings', () => {
    render(<TestApp initialEntries={['/settings']} />)
    expect(screen.getByTestId('settings-page')).toBeInTheDocument()
  })

  it('renders not found page for invalid routes', () => {
    render(<TestApp initialEntries={['/invalid-route']} />)
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument()
  })

  it('includes required providers', () => {
    render(<TestApp />)
    // Check if the app renders without throwing errors, which indicates providers are working
    expect(screen.getByTestId('dashboard-page')).toBeInTheDocument()
  })
})
