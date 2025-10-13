# Feature-Sliced Design (FSD)

This document explains the Feature-Sliced Design architecture pattern used in Haven Estate Suite and provides guidelines for organizing code.

## What is Feature-Sliced Design?

**Feature-Sliced Design** is an architectural methodology for frontend applications that promotes:

- **Modularity**: Clear separation between different parts of the application
- **Scalability**: Easy to add new features without breaking existing code
- **Maintainability**: Predictable structure makes code easy to find and modify
- **Team collaboration**: Multiple developers can work without conflicts

## Core Principles

### 1. Layered Architecture

FSD organizes code into **horizontal layers**, each with a specific responsibility:

```
app/          ← Highest level (Application layer)
pages/        ← Route pages
widgets/      ← Complex UI sections
features/     ← User interactions (not used in current implementation)
entities/     ← Business entities
shared/       ← Lowest level (Shared utilities)
```

### 2. Strict Import Rules

**The dependency rule**: A layer can only import from layers below it.

```
✅ ALLOWED:
pages → widgets, entities, shared
widgets → entities, shared
entities → shared
shared → nothing (no internal imports to upper layers)

❌ FORBIDDEN:
shared → entities (importing up)
entities → pages (skipping layers)
widgets → pages (importing up)
```

### 3. Public API

Each module exports through an `index.ts` file:

```typescript
// entities/property/index.ts
export { mockProperties } from './model/mock-data';
export type { Property, PropertyStatus } from './model/types';

// Usage elsewhere
import { mockProperties, type Property } from '@/entities/property';
```

## Layer Breakdown

### App Layer (`src/app/`)

**Purpose**: Application initialization and global providers

**Contains**:
- App entry point
- Global providers (Theme, Query Client, Router)
- Error boundaries
- Global styles

**Example**:
```typescript
// src/app/App.tsx
export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

**Import rules**:
- Can import from: All layers (pages, widgets, entities, shared)

---

### Pages Layer (`src/pages/`)

**Purpose**: Route-level pages that compose widgets and entities

**Structure**:
```
pages/
├── dashboard/
│   ├── index.ts              # Public API
│   └── ui/
│       └── DashboardPage.tsx
├── properties/
│   ├── index.ts
│   └── ui/
│       └── PropertiesPage.tsx
└── contacts/
    ├── index.ts
    └── ui/
        └── ContactsPage.tsx
```

**Example**:
```typescript
// src/pages/dashboard/ui/DashboardPage.tsx
import { HeroSection, StatsCard, DealsOverview } from '@/widgets/dashboard';
import { Layout } from '@/widgets/layout';

export function DashboardPage() {
  return (
    <Layout>
      <HeroSection />
      <div className="grid grid-cols-3 gap-4">
        <StatsCard />
        <StatsCard />
        <StatsCard />
      </div>
      <DealsOverview />
    </Layout>
  );
}
```

**Import rules**:
- Can import from: widgets, entities, shared
- Cannot import from: other pages

**Best practices**:
- Keep pages thin - they should mainly compose widgets
- Handle routing logic
- Pass data from queries to widgets
- No business logic

---

### Widgets Layer (`src/widgets/`)

**Purpose**: Complex, composite UI blocks that combine multiple entities

**Structure**:
```
widgets/
├── dashboard/
│   ├── index.ts
│   └── ui/
│       ├── HeroSection.tsx
│       ├── StatsCard.tsx
│       └── DealsOverview.tsx
├── properties/
│   ├── index.ts
│   └── ui/
│       ├── PropertiesGrid.tsx
│       ├── PropertiesFilters.tsx
│       └── PropertyCard.tsx
└── layout/
    ├── index.ts
    └── ui/
        ├── Layout.tsx
        ├── Header.tsx
        └── Sidebar.tsx
```

**Example**:
```typescript
// src/widgets/properties/ui/PropertiesGrid.tsx
import { PropertyCard } from './PropertyCard';
import { type Property } from '@/entities/property';
import { Skeleton } from '@/shared/ui/skeleton';

export function PropertiesGrid({ properties, loading }: Props) {
  if (loading) return <Skeleton />;
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

**Import rules**:
- Can import from: entities, shared
- Cannot import from: pages, other widgets

**Best practices**:
- Widgets should be reusable across pages
- Can use entities but should be agnostic to data source
- Handle UI interactions but not business logic
- Can have internal state (UI state, not business state)

---

### Entities Layer (`src/entities/`)

**Purpose**: Business domain models and their mock data

**Structure**:
```
entities/
├── property/
│   ├── index.ts
│   └── model/
│       ├── types.ts           # TypeScript types
│       ├── mock-data.ts       # Mock data
│       └── mock-data-lite.ts  # Smaller dataset
├── contact/
│   ├── index.ts
│   └── model/
│       ├── types.ts
│       └── mock-data.ts
└── deal/
    ├── index.ts
    └── model/
        ├── types.ts
        └── mock-data.ts
```

**Example**:
```typescript
// src/entities/property/model/types.ts
export interface Property {
  id: string;
  title: string;
  price: number;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  address: string;
  images: string[];
  createdAt: string;
}

export type PropertyStatus = 'active' | 'pending' | 'sold' | 'off-market';

// src/entities/property/model/mock-data.ts
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Loft',
    price: 450000,
    status: 'active',
    // ...
  },
  // ...
];

// src/entities/property/index.ts
export { mockProperties } from './model/mock-data';
export type { Property, PropertyStatus } from './model/types';
```

**Import rules**:
- Can import from: shared
- Cannot import from: pages, widgets, other entities

**Best practices**:
- Define domain models as TypeScript interfaces/types
- Store mock data for development
- No UI components at this layer
- No business logic - just data structures
- Keep entities focused on a single domain concept

---

### Shared Layer (`src/shared/`)

**Purpose**: Reusable code that doesn't belong to any specific feature

**Structure**:
```
shared/
├── ui/                 # UI component library
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-auth.tsx
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                # Utility functions
│   ├── utils.ts
│   ├── brand.ts
│   └── protected-route.tsx
└── types/              # Shared TypeScript types
    ├── crm.ts
    └── mls.ts
```

**Example**:
```typescript
// src/shared/ui/button.tsx
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// src/shared/hooks/use-auth.tsx
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  // Auth logic
  return { user, login, logout };
}

// src/shared/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Import rules**:
- Can import from: Nothing (no imports to upper layers!)
- Can import: External libraries only

**Best practices**:
- Highly reusable code only
- No business logic
- No domain knowledge
- Library-like code
- Well-tested and documented

---

## Practical Examples

### Example 1: Adding a New Feature (Property Favorites)

**Step 1**: Define entity type
```typescript
// entities/property/model/types.ts
export interface Property {
  // ... existing fields
  isFavorite?: boolean;  // Add new field
}
```

**Step 2**: Create widget component
```typescript
// widgets/properties/ui/FavoriteButton.tsx
import { Button } from '@/shared/ui/button';
import { Heart } from 'lucide-react';

export function FavoriteButton({ propertyId, isFavorite }: Props) {
  const toggleFavorite = () => {
    // Handle favorite toggle
  };
  
  return (
    <Button onClick={toggleFavorite}>
      <Heart fill={isFavorite ? 'red' : 'none'} />
    </Button>
  );
}
```

**Step 3**: Use in page
```typescript
// pages/properties/ui/PropertiesPage.tsx
import { FavoriteButton } from '@/widgets/properties';

export function PropertiesPage() {
  return (
    <div>
      {properties.map(property => (
        <div key={property.id}>
          <PropertyCard property={property} />
          <FavoriteButton 
            propertyId={property.id} 
            isFavorite={property.isFavorite} 
          />
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Sharing Logic Across Pages

**Problem**: Multiple pages need authentication check

**Solution**: Create shared hook

```typescript
// shared/hooks/use-require-auth.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from './use-auth';

export function useRequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);
  
  return { user, loading };
}

// Usage in any page
export function DashboardPage() {
  const { user, loading } = useRequireAuth();
  
  if (loading) return <Spinner />;
  
  return <div>Welcome {user.name}</div>;
}
```

## Common Mistakes to Avoid

### ❌ Importing Upward

```typescript
// ❌ BAD: shared importing from entities
// src/shared/ui/property-card.tsx
import { type Property } from '@/entities/property'; // WRONG!

// ✅ GOOD: Make it generic, pass type as prop
// src/shared/ui/card.tsx
export function Card<T>({ data }: { data: T }) {
  return <div>{/* generic card */}</div>;
}
```

### ❌ Business Logic in Widgets

```typescript
// ❌ BAD: Widget handling data fetching
// src/widgets/properties/ui/PropertiesGrid.tsx
export function PropertiesGrid() {
  const { data } = useQuery(/* fetch properties */); // WRONG!
  return <div>{/* render */}</div>;
}

// ✅ GOOD: Page handles data, widget receives it
// src/pages/properties/ui/PropertiesPage.tsx
export function PropertiesPage() {
  const { data } = useQuery(/* fetch properties */);
  return <PropertiesGrid properties={data} />;
}
```

### ❌ Too Many Layers

```typescript
// ❌ BAD: Unnecessary wrapper components
// widgets/properties/ui/PropertiesContainer.tsx
export function PropertiesContainer() {
  return <PropertiesWrapper><PropertiesInner /></PropertiesWrapper>;
}

// ✅ GOOD: Keep it simple
export function PropertiesGrid({ properties }: Props) {
  return <div>{/* render properties */}</div>;
}
```

## Migration Guide (From Other Patterns)

### From Component-Based Structure

**Before**:
```
src/
├── components/
│   ├── PropertyCard.tsx
│   ├── Header.tsx
│   └── Button.tsx
└── pages/
    └── Properties.tsx
```

**After**:
```
src/
├── shared/ui/
│   └── button.tsx
├── widgets/
│   ├── properties/ui/PropertyCard.tsx
│   └── layout/ui/Header.tsx
└── pages/
    └── properties/ui/PropertiesPage.tsx
```

## Benefits of FSD

1. **Predictable Structure**: Know exactly where to find code
2. **Scalability**: Add features without touching existing code
3. **Parallel Development**: Teams can work on different layers
4. **Testability**: Each layer can be tested in isolation
5. **Reusability**: Shared layer promotes DRY principle
6. **Onboarding**: New developers understand structure quickly

## Tools & Helpers

### ESLint Rules (Future)

```js
// eslint-fsd-plugin (example)
{
  "fsd/no-upward-imports": "error",
  "fsd/public-api-only": "error"
}
```

### VS Code Snippets

```json
{
  "FSD Entity": {
    "prefix": "fsd-entity",
    "body": [
      "export interface ${1:EntityName} {",
      "  id: string;",
      "  $0",
      "}"
    ]
  }
}
```

## Further Reading

- [Official FSD Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)
- [Architecture Overview](ARCHITECTURE.md)

## Questions?

For questions about FSD implementation in Haven Estate Suite, see:
- [Architecture Documentation](ARCHITECTURE.md)
- [Contributing Guidelines](../../CONTRIBUTING.md)
- [Coding Standards](../development/CODING_STANDARDS.md)
