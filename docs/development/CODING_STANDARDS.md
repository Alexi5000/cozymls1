# Coding Standards

This document outlines the coding standards and best practices for Haven Estate Suite.

## General Principles

1. **Write code for humans first** - Code is read more than written
2. **Keep it simple** - Prefer simple, clear solutions over clever ones
3. **Be consistent** - Follow existing patterns in the codebase
4. **Don't repeat yourself (DRY)** - Extract reusable logic
5. **Fail fast** - Validate early and provide clear error messages

## TypeScript Guidelines

### Type Safety

✅ **DO**: Use proper types
```typescript
interface Property {
  id: string;
  title: string;
  price: number;
}

function getProperty(id: string): Property {
  // Implementation
}
```

❌ **DON'T**: Use `any`
```typescript
function getProperty(id: any): any {  // Avoid!
  // Implementation
}
```

### Type Definitions

✅ **DO**: Define types for all props and return values
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

✅ **DO**: Use `type` for unions, `interface` for objects
```typescript
// Type for unions
type Status = 'active' | 'pending' | 'sold';

// Interface for objects
interface Property {
  id: string;
  status: Status;
}
```

### Nullable Values

✅ **DO**: Be explicit about nullable values
```typescript
interface User {
  name: string;
  email?: string;  // Optional
  age: number | null;  // Can be null
}
```

### Generics

✅ **DO**: Use generics for reusable components
```typescript
interface DataTableProps<T> {
  data: T[];
  renderRow: (item: T) => React.ReactNode;
}

export function DataTable<T>({ data, renderRow }: DataTableProps<T>) {
  return <div>{data.map(renderRow)}</div>;
}
```

## React Best Practices

### Component Structure

```typescript
// 1. Imports (external first, then internal)
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/shared/ui/button';
import { useAuth } from '@/shared/hooks/use-auth';

import type { Property } from '@/entities/property';

// 2. Types/Interfaces
interface PropertyCardProps {
  property: Property;
  onSelect?: (id: string) => void;
}

// 3. Component
export function PropertyCard({ property, onSelect }: PropertyCardProps) {
  // 3a. Hooks
  const [isExpanded, setIsExpanded] = useState(false);
  
  // 3b. Derived state
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(property.price);
  
  // 3c. Event handlers
  const handleClick = () => {
    onSelect?.(property.id);
  };
  
  // 3d. Effects
  useEffect(() => {
    // Side effects
  }, []);
  
  // 3e. Render
  return (
    <div onClick={handleClick}>
      <h3>{property.title}</h3>
      <p>{formattedPrice}</p>
    </div>
  );
}
```

### Hooks Rules

✅ **DO**: Extract reusable logic into custom hooks
```typescript
// src/shared/hooks/use-properties.ts
export function useProperties(status?: PropertyStatus) {
  return useQuery({
    queryKey: ['properties', status],
    queryFn: async () => {
      let query = supabase.from('properties').select('*');
      if (status) query = query.eq('status', status);
      const { data } = await query;
      return data;
    },
  });
}

// Usage
const { data, isLoading } = useProperties('active');
```

✅ **DO**: Follow Rules of Hooks
- Only call hooks at the top level
- Only call hooks from React functions
- Use ESLint plugin to enforce rules

❌ **DON'T**: Call hooks conditionally
```typescript
// Bad
if (condition) {
  const [state, setState] = useState();  // Violates rules!
}

// Good
const [state, setState] = useState();
if (condition) {
  // Use state here
}
```

### Props Handling

✅ **DO**: Destructure props
```typescript
export function Button({ children, onClick, variant }: ButtonProps) {
  // ...
}
```

✅ **DO**: Use optional chaining for optional callbacks
```typescript
const handleClick = () => {
  onSelect?.(property.id);
};
```

✅ **DO**: Provide default values
```typescript
export function Button({ variant = 'primary', ...props }: ButtonProps) {
  // ...
}
```

### Component Composition

✅ **DO**: Prefer composition over prop drilling
```typescript
// Good
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content
  </CardContent>
</Card>

// Avoid
<Card title="Title" content="Content" />
```

### Conditional Rendering

✅ **DO**: Use clear conditional rendering
```typescript
// Simple conditions
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <DataTable data={data} />}

// Complex conditions - use early returns
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
return <DataTable data={data} />;
```

## File Naming Conventions

### Files and Folders

- **Components**: PascalCase - `PropertyCard.tsx`
- **Hooks**: camelCase with `use` prefix - `use-auth.tsx`
- **Utilities**: camelCase - `format-currency.ts`
- **Types**: camelCase - `types.ts`
- **Constants**: camelCase or UPPER_CASE - `constants.ts`

### Examples

```
src/
├── widgets/
│   └── properties/
│       ├── index.ts
│       └── ui/
│           ├── PropertyCard.tsx        # PascalCase component
│           └── PropertiesGrid.tsx
├── shared/
│   ├── hooks/
│   │   ├── use-auth.tsx               # camelCase hook
│   │   └── use-properties.tsx
│   ├── lib/
│   │   ├── utils.ts                   # camelCase utility
│   │   └── format-currency.ts
│   └── types/
│       └── crm.ts                     # camelCase types file
```

## Import Organization

### Order

1. React and external libraries
2. Internal absolute imports (by layer: widgets → entities → shared)
3. Relative imports
4. Type imports
5. Styles

```typescript
// 1. External
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal (by layer)
import { PropertiesGrid } from '@/widgets/properties';
import { mockProperties } from '@/entities/property';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';

// 3. Relative
import { PropertyCard } from './PropertyCard';
import { filters } from './filters';

// 4. Types
import type { Property } from '@/entities/property';
import type { FilterOptions } from './types';

// 5. Styles
import './styles.css';
```

### Path Aliases

Use `@/` for absolute imports:

```typescript
// ✅ Good
import { Button } from '@/shared/ui/button';

// ❌ Avoid
import { Button } from '../../../shared/ui/button';
```

## Styling Guidelines

### Tailwind CSS

✅ **DO**: Use design tokens from `index.css`
```typescript
// Use semantic colors
<div className="bg-primary text-primary-foreground">

// Use spacing tokens
<div className="p-4 m-2">

// Use responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
```

❌ **DON'T**: Use arbitrary values excessively
```typescript
// Avoid
<div className="p-[13px] text-[#ff0000]">

// Prefer tokens
<div className="p-3 text-destructive">
```

### Component Variants

Use `class-variance-authority` for variant styling:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

### Utility Function

Use `cn()` to merge class names:

```typescript
import { cn } from '@/shared/lib/utils';

<div className={cn(
  'base-class',
  isActive && 'active-class',
  className  // Accept additional classes
)}>
```

## Performance Best Practices

### Memoization

✅ **DO**: Memoize expensive computations
```typescript
const expensiveValue = useMemo(
  () => computeExpensiveValue(data),
  [data]
);
```

✅ **DO**: Memoize callback functions passed as props
```typescript
const handleClick = useCallback(
  () => onSelect(property.id),
  [property.id, onSelect]
);
```

✅ **DO**: Memoize components that receive same props
```typescript
export const PropertyCard = React.memo(function PropertyCard({ property }) {
  return <div>{/* render */}</div>;
});
```

### Code Splitting

✅ **DO**: Lazy load route components
```typescript
const DashboardPage = lazy(() => import('@/pages/dashboard'));

<Route 
  path="/dashboard" 
  element={
    <Suspense fallback={<Spinner />}>
      <DashboardPage />
    </Suspense>
  } 
/>
```

### List Rendering

✅ **DO**: Use stable keys
```typescript
// Good - stable ID
{properties.map(property => (
  <PropertyCard key={property.id} property={property} />
))}

// Avoid - array index
{properties.map((property, index) => (
  <PropertyCard key={index} property={property} />  // Bad!
))}
```

## Error Handling

### API Calls

✅ **DO**: Handle errors gracefully
```typescript
const { data, error, isLoading } = useQuery({
  queryKey: ['properties'],
  queryFn: fetchProperties,
});

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage message={error.message} />;
return <PropertiesGrid properties={data} />;
```

### Form Validation

✅ **DO**: Validate user input
```typescript
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

const form = useForm({
  resolver: zodResolver(schema),
});
```

## Accessibility (a11y)

### Semantic HTML

✅ **DO**: Use semantic elements
```typescript
// Good
<button onClick={handleClick}>Click me</button>
<nav><a href="/home">Home</a></nav>
<main><h1>Title</h1></main>

// Avoid
<div onClick={handleClick}>Click me</div>
```

### ARIA Attributes

✅ **DO**: Add ARIA labels when needed
```typescript
<button aria-label="Close dialog" onClick={onClose}>
  <X className="h-4 w-4" />
</button>
```

### Keyboard Navigation

✅ **DO**: Support keyboard navigation
```typescript
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
```

## Comments and Documentation

### When to Comment

✅ **DO**: Comment complex logic
```typescript
// Calculate commission based on tiered structure
// Tier 1: 0-500k = 3%
// Tier 2: 500k-1M = 2.5%
// Tier 3: 1M+ = 2%
const commission = calculateTieredCommission(price);
```

✅ **DO**: Document public APIs
```typescript
/**
 * Formats a price value as USD currency
 * @param value - The numeric value to format
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}
```

❌ **DON'T**: State the obvious
```typescript
// Bad - obvious from code
// Set the name
setName(newName);

// Good - explains why
// Reset name to default when switching users
setName(defaultName);
```

## Testing (Future)

### Unit Tests

```typescript
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';

describe('PropertyCard', () => {
  it('renders property title', () => {
    const property = { id: '1', title: 'Test Property' };
    render(<PropertyCard property={property} />);
    expect(screen.getByText('Test Property')).toBeInTheDocument();
  });
});
```

## Git Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Tests
- `chore`: Maintenance

### Examples

```
feat(properties): add filtering by price range

Add min/max price inputs and filter properties in real-time.

Closes #123
```

```
fix(auth): resolve login redirect loop

Users were stuck in redirect loop after authentication.
Added session state check before redirecting.

Fixes #456
```

## Code Review Checklist

Before submitting PR:

- [ ] Code follows TypeScript best practices
- [ ] Components are properly typed
- [ ] No ESLint errors or warnings
- [ ] Code is formatted with Prettier
- [ ] Imports are organized correctly
- [ ] No console.logs left in code
- [ ] Accessibility considered
- [ ] Performance optimized (memo, useMemo, useCallback where needed)
- [ ] Error handling implemented
- [ ] Comments added for complex logic
- [ ] Tests added (when testing is set up)

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Query](https://tanstack.com/query/latest)
- [Feature-Sliced Design](https://feature-sliced.design/)

## Related Documentation

- [Setup Guide](SETUP.md)
- [Architecture Overview](../architecture/ARCHITECTURE.md)
- [Feature-Sliced Design](../architecture/FEATURE_SLICED_DESIGN.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)
