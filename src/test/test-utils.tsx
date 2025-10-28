import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

/**
 * Create a fresh QueryClient for each test
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });
}

/**
 * Test wrapper with all necessary providers
 */
interface AllTheProvidersProps {
  children: React.ReactNode;
}

export function AllTheProviders({ children }: AllTheProvidersProps) {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

/**
 * Custom render function with providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

/**
 * Mock property data for tests
 */
export const mockProperty = {
  id: '1',
  mls_id: 'MLS001',
  address: '123 Main St',
  city: 'Dublin',
  state: 'Dublin',
  zip_code: 'D01 X123',
  price: 450000,
  bedrooms: 3,
  bathrooms: 2,
  square_feet: 1500,
  lot_size: 2000,
  year_built: 2015,
  property_type: 'house' as const,
  status: 'active' as const,
  description: 'Beautiful modern house',
  features: ['garage', 'garden'],
  images: ['https://example.com/image1.jpg'],
  listing_date: '2024-01-01',
  days_on_market: 30,
  agent_id: 'agent-1',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

/**
 * Mock contact data for tests
 */
export const mockContact = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+353 1 234 5678',
  status: 'lead' as const,
  company: 'Acme Corp',
  tags: ['buyer', 'investor'],
  notes: 'Interested in Dublin properties',
  last_contact: '2024-01-01T00:00:00Z',
  created_by: 'user-1',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

/**
 * Mock deal data for tests
 */
export const mockDeal = {
  id: '1',
  title: 'House Purchase Deal',
  contact_id: '1',
  property_id: '1',
  agent_id: 'agent-1',
  value: 450000,
  stage: 'prospect' as const,
  probability: 50,
  expected_close_date: '2024-06-01',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

/**
 * Mock user/profile data for tests
 */
export const mockUser = {
  id: 'user-1',
  email: 'agent@example.com',
  user_metadata: {
    name: 'Jane Agent',
  },
};

export const mockProfile = {
  id: 'user-1',
  name: 'Jane Agent',
  email: 'agent@example.com',
  phone: '+353 1 234 5678',
  department: 'Sales',
  avatar_url: null,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  last_login: '2024-01-01T00:00:00Z',
};

// Re-export everything from testing-library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
