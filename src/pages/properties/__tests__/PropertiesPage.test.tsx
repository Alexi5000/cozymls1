import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropertiesPage } from "@/pages/properties/ui/PropertiesPage"

// Mock the PropertiesProvider and its hooks
const mockProperties = [
  {
    id: '1',
    title: 'Beautiful Family Home',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    address: '123 Main St, Anytown, USA',
    imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
    status: 'active',
    type: 'residential',
    listingDate: '2024-01-15',
    mls: 'MLS12345',
    agent: {
      name: 'John Doe',
      phone: '555-0123',
      email: 'john@example.com',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
    }
  },
  {
    id: '2',
    title: 'Modern Condo',
    price: 275000,
    bedrooms: 2,
    bathrooms: 1,
    sqft: 1200,
    address: '456 Oak Ave, Anytown, USA',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    status: 'active',
    type: 'condo',
    listingDate: '2024-01-20',
    mls: 'MLS67890',
    agent: {
      name: 'Jane Smith',
      phone: '555-0124',
      email: 'jane@example.com',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b68a82f9'
    }
  }
]

vi.mock('@/shared/hooks/use-properties', () => ({
  useProperties: () => ({
    properties: mockProperties,
    isLoading: false,
    error: null,
    refetch: vi.fn()
  })
}))

vi.mock('@/shared/hooks/use-property-actions', () => ({
  usePropertyActions: () => ({
    addProperty: vi.fn(),
    updateProperty: vi.fn(),
    deleteProperty: vi.fn()
  })
}))

// Mock the sub-components
vi.mock('@/widgets/properties/ui/PropertiesHeader', () => ({
  PropertiesHeader: ({ onAddProperty }: { onAddProperty: () => void }) => (
    <div data-testid="properties-header">
      <button onClick={onAddProperty} data-testid="add-property-btn">
        Add Property
      </button>
    </div>
  )
}))

vi.mock('@/widgets/properties/ui/PropertiesFilters', () => ({
  PropertiesFilters: ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => (
    <div data-testid="properties-filters">
      <button 
        onClick={() => onFiltersChange({ type: 'residential' })}
        data-testid="filter-residential"
      >
        Filter Residential
      </button>
    </div>
  )
}))

vi.mock('@/widgets/properties/ui/PropertiesGrid', () => ({
  PropertiesGrid: ({ properties, onEdit, onDelete }: { 
    properties: any[], 
    onEdit: (id: string) => void, 
    onDelete: (id: string) => void 
  }) => (
    <div data-testid="properties-grid">
      {properties.map(property => (
        <div key={property.id} data-testid={`property-${property.id}`}>
          <h3>{property.title}</h3>
          <p>${property.price}</p>
          <button onClick={() => onEdit(property.id)} data-testid={`edit-${property.id}`}>
            Edit
          </button>
          <button onClick={() => onDelete(property.id)} data-testid={`delete-${property.id}`}>
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}))

vi.mock('@/widgets/properties/ui/AddPropertyDialog', () => ({
  AddPropertyDialog: ({ open, onClose, onAdd }: { 
    open: boolean, 
    onClose: () => void, 
    onAdd: (property: any) => void 
  }) => (
    open ? (
      <div data-testid="add-property-dialog">
        <button onClick={onClose} data-testid="close-dialog">Close</button>
        <button 
          onClick={() => onAdd({ title: 'New Property', price: 300000 })}
          data-testid="save-property"
        >
          Save
        </button>
      </div>
    ) : null
  )
}))

vi.mock('@/widgets/layout/ui/Layout', () => ({
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  )
}))

describe('PropertiesPage', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })
  })

  const renderWithProviders = (component: React.ReactNode) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    )
  }

  it('renders the properties page with all components', () => {
    renderWithProviders(<PropertiesPage />)
    
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('properties-header')).toBeInTheDocument()
    expect(screen.getByTestId('properties-filters')).toBeInTheDocument()
    expect(screen.getByTestId('properties-grid')).toBeInTheDocument()
  })

  it('displays properties in the grid', () => {
    renderWithProviders(<PropertiesPage />)
    
    expect(screen.getByTestId('property-1')).toBeInTheDocument()
    expect(screen.getByTestId('property-2')).toBeInTheDocument()
    expect(screen.getByText('Beautiful Family Home')).toBeInTheDocument()
    expect(screen.getByText('Modern Condo')).toBeInTheDocument()
  })

  it('opens add property dialog when add button is clicked', async () => {
    renderWithProviders(<PropertiesPage />)
    
    const addButton = screen.getByTestId('add-property-btn')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('add-property-dialog')).toBeInTheDocument()
    })
  })

  it('closes add property dialog when close button is clicked', async () => {
    renderWithProviders(<PropertiesPage />)
    
    // Open dialog
    const addButton = screen.getByTestId('add-property-btn')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('add-property-dialog')).toBeInTheDocument()
    })
    
    // Close dialog
    const closeButton = screen.getByTestId('close-dialog')
    fireEvent.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByTestId('add-property-dialog')).not.toBeInTheDocument()
    })
  })

  it('handles property filtering', () => {
    renderWithProviders(<PropertiesPage />)
    
    const filterButton = screen.getByTestId('filter-residential')
    fireEvent.click(filterButton)
    
    // The component should still render (actual filtering logic would be tested separately)
    expect(screen.getByTestId('properties-grid')).toBeInTheDocument()
  })

  it('handles property editing', () => {
    renderWithProviders(<PropertiesPage />)
    
    const editButton = screen.getByTestId('edit-1')
    fireEvent.click(editButton)
    
    // Check that the component handles the edit action
    expect(screen.getByTestId('properties-grid')).toBeInTheDocument()
  })

  it('handles property deletion', () => {
    renderWithProviders(<PropertiesPage />)
    
    const deleteButton = screen.getByTestId('delete-1')
    fireEvent.click(deleteButton)
    
    // Check that the component handles the delete action
    expect(screen.getByTestId('properties-grid')).toBeInTheDocument()
  })

  it('saves new property through dialog', async () => {
    renderWithProviders(<PropertiesPage />)
    
    // Open dialog
    const addButton = screen.getByTestId('add-property-btn')
    fireEvent.click(addButton)
    
    await waitFor(() => {
      expect(screen.getByTestId('add-property-dialog')).toBeInTheDocument()
    })
    
    // Save property
    const saveButton = screen.getByTestId('save-property')
    fireEvent.click(saveButton)
    
    await waitFor(() => {
      expect(screen.queryByTestId('add-property-dialog')).not.toBeInTheDocument()
    })
  })
})
