# Testing Guidelines

This document outlines the testing strategy and best practices for Haven Estate Suite.

> **Note**: Testing infrastructure is planned for future implementation. This document serves as a guide for when testing is added to the project.

## Testing Philosophy

### Why Test?

- **Confidence**: Ship code with confidence that it works
- **Documentation**: Tests serve as living documentation
- **Refactoring**: Safely refactor code without breaking functionality
- **Quality**: Catch bugs before they reach production
- **Collaboration**: Tests clarify expected behavior for team members

### Testing Pyramid

```
           ╱╲
          ╱  ╲       E2E Tests (Few)
         ╱    ╲      - Critical user journeys
        ╱──────╲     - Smoke tests
       ╱        ╲
      ╱          ╲   Integration Tests (Some)
     ╱            ╲  - Component interactions
    ╱──────────────╲ - API integration
   ╱                ╲
  ╱                  ╲ Unit Tests (Many)
 ╱                    ╲ - Pure functions
╱──────────────────────╲ - Hooks
                        - Utility functions
```

## Testing Stack (Planned)

### Tools

- **Vitest** - Fast unit test runner (Vite-native)
- **Testing Library** - React component testing
- **MSW** - API mocking for integration tests
- **Playwright** - E2E testing
- **@testing-library/jest-dom** - Custom matchers

### Installation (Future)

```bash
npm install -D vitest @vitest/ui
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install -D msw
npm install -D @playwright/test
```

## Unit Testing

### What to Test

✅ **DO** test:
- Pure functions and utilities
- Custom hooks
- Business logic
- Data transformations
- Validation logic

❌ **DON'T** test:
- Third-party libraries
- Implementation details
- Simple pass-through components

### Example: Testing Utilities

```typescript
// src/shared/lib/format-currency.ts
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

// src/shared/lib/format-currency.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency } from './format-currency';

describe('formatCurrency', () => {
  it('formats positive numbers correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative numbers correctly', () => {
    expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
  });

  it('rounds to two decimal places', () => {
    expect(formatCurrency(1234.567)).toBe('$1,234.57');
  });
});
```

### Example: Testing Custom Hooks

```typescript
// src/shared/hooks/use-debounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// src/shared/hooks/use-debounce.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useDebounce } from './use-debounce';

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('updates value after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'initial' } }
    );

    rerender({ value: 'updated' });

    await waitFor(() => {
      expect(result.current).toBe('updated');
    }, { timeout: 600 });
  });

  it('cancels previous timeout on value change', async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: 'first' } }
    );

    rerender({ value: 'second' });
    rerender({ value: 'third' });

    await waitFor(() => {
      expect(result.current).toBe('third');
    }, { timeout: 600 });
  });
});
```

## Component Testing

### What to Test

✅ **DO** test:
- Component renders correctly
- User interactions
- Conditional rendering
- Props handling
- Accessibility

❌ **DON'T** test:
- Styling details
- Component internals
- Third-party component behavior

### Example: Simple Component Test

```typescript
// src/shared/ui/button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByText('Click me'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('applies variant styles correctly', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-destructive');
  });
});
```

### Example: Complex Component Test

```typescript
// src/widgets/properties/ui/PropertyCard.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { PropertyCard } from './PropertyCard';
import type { Property } from '@/entities/property';

const mockProperty: Property = {
  id: '1',
  title: 'Modern Downtown Loft',
  price: 450000,
  status: 'active',
  bedrooms: 2,
  bathrooms: 2,
  squareFeet: 1200,
  address: '123 Main St',
  images: ['image1.jpg'],
  createdAt: '2025-01-01',
};

describe('PropertyCard', () => {
  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('Modern Downtown Loft')).toBeInTheDocument();
    expect(screen.getByText('$450,000')).toBeInTheDocument();
    expect(screen.getByText('2 bd')).toBeInTheDocument();
    expect(screen.getByText('2 ba')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();
    
    render(<PropertyCard property={mockProperty} onSelect={handleSelect} />);
    await user.click(screen.getByText('Modern Downtown Loft'));
    
    expect(handleSelect).toHaveBeenCalledWith('1');
  });

  it('displays status badge', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows placeholder when no image available', () => {
    const propertyWithoutImage = { ...mockProperty, images: [] };
    render(<PropertyCard property={propertyWithoutImage} />);
    
    expect(screen.getByTestId('property-placeholder')).toBeInTheDocument();
  });
});
```

## Integration Testing

### What to Test

✅ **DO** test:
- Multiple components working together
- Data flow between components
- API integration (with mocking)
- State management

### Example: API Integration Test

```typescript
// src/integrations/supabase/hooks/use-properties.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useProperties } from './use-properties';

// Mock API server
const server = setupServer(
  http.get('/rest/v1/properties', () => {
    return HttpResponse.json([
      { id: '1', title: 'Property 1', price: 100000 },
      { id: '2', title: 'Property 2', price: 200000 },
    ]);
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('useProperties', () => {
  it('fetches properties successfully', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useProperties(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].title).toBe('Property 1');
  });

  it('handles error state', async () => {
    server.use(
      http.get('/rest/v1/properties', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useProperties(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });
});
```

## E2E Testing

### What to Test

✅ **DO** test:
- Critical user journeys
- Authentication flows
- Form submissions
- Navigation
- Data persistence

### Example: E2E Test with Playwright

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can sign up and log in', async ({ page }) => {
    // Navigate to auth page
    await page.goto('/auth');

    // Fill in signup form
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePassword123');
    await page.click('button:has-text("Sign Up")');

    // Wait for redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    // Verify user is logged in
    await expect(page.locator('text=Welcome')).toBeVisible();
  });

  test('user can log out', async ({ page }) => {
    // Assume user is logged in
    await page.goto('/dashboard');

    // Click user menu
    await page.click('[aria-label="User menu"]');

    // Click logout
    await page.click('text=Logout');

    // Verify redirect to auth page
    await expect(page).toHaveURL('/auth');
  });

  test('shows error for invalid credentials', async ({ page }) => {
    await page.goto('/auth');

    await page.fill('[name="email"]', 'wrong@example.com');
    await page.fill('[name="password"]', 'wrongpassword');
    await page.click('button:has-text("Login")');

    // Verify error message
    await expect(page.locator('text=Invalid credentials')).toBeVisible();
  });
});
```

## Testing Best Practices

### 1. AAA Pattern

```typescript
it('should do something', () => {
  // Arrange - Set up test data
  const input = 'test';
  const expected = 'TEST';

  // Act - Execute the code being tested
  const result = toUpperCase(input);

  // Assert - Verify the result
  expect(result).toBe(expected);
});
```

### 2. Clear Test Names

```typescript
// ❌ Bad
it('works', () => {});

// ✅ Good
it('returns uppercase string when given lowercase input', () => {});
it('throws error when input is null', () => {});
```

### 3. Test One Thing

```typescript
// ❌ Bad - testing multiple things
it('button works', () => {
  // Tests rendering
  expect(button).toBeInTheDocument();
  // Tests onClick
  expect(handleClick).toHaveBeenCalled();
  // Tests styling
  expect(button).toHaveClass('primary');
});

// ✅ Good - separate tests
it('renders button correctly', () => {
  expect(button).toBeInTheDocument();
});

it('calls onClick when clicked', () => {
  expect(handleClick).toHaveBeenCalled();
});

it('applies primary variant styles', () => {
  expect(button).toHaveClass('primary');
});
```

### 4. Use Test IDs Sparingly

```typescript
// ❌ Avoid - brittle, tied to implementation
const element = screen.getByTestId('submit-button');

// ✅ Prefer - user-facing queries
const element = screen.getByRole('button', { name: /submit/i });
const element = screen.getByLabelText('Email address');
const element = screen.getByText('Welcome');
```

### 5. Mock External Dependencies

```typescript
// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: mockData })),
      })),
    })),
  },
}));
```

### 6. Clean Up After Tests

```typescript
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
```

## Coverage Goals

Target coverage thresholds:

- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

Configure in `vitest.config.ts`:

```typescript
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      statements: 80,
      branches: 75,
      functions: 80,
      lines: 80,
    },
  },
});
```

## Running Tests (Future)

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage

# Run specific test file
npm test src/shared/lib/utils.test.ts

# Run E2E tests
npm test:e2e

# Run E2E tests in headed mode
npm test:e2e:headed
```

## CI Integration

Tests should run automatically in CI:

```yaml
# .github/workflows/ci.yml
test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test
    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

## Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<PropertyCard property={mockProperty} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## Visual Regression Testing (Future)

Consider adding visual regression testing with:
- **Chromatic** - For Storybook components
- **Percy** - For full-page snapshots
- **Playwright** - Built-in screenshot comparison

## Test Organization

```
src/
├── shared/
│   ├── lib/
│   │   ├── utils.ts
│   │   └── utils.test.ts         # Co-located with source
│   └── hooks/
│       ├── use-auth.tsx
│       └── use-auth.test.tsx     # Co-located with source
├── widgets/
│   └── properties/
│       └── ui/
│           ├── PropertyCard.tsx
│           └── PropertyCard.test.tsx
tests/
├── e2e/                          # E2E tests separate
│   ├── auth.spec.ts
│   └── properties.spec.ts
└── setup.ts                      # Global test setup
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [MSW](https://mswjs.io/)
- [Kent C. Dodds Testing Blog](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Related Documentation

- [Coding Standards](CODING_STANDARDS.md)
- [Setup Guide](SETUP.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)
