# ADR: Feature-Sliced Design (FSD) Layer Architecture

## Status
Accepted

## Context
We need a standardized architectural approach for organizing our codebase that promotes maintainability, scalability, and clear separation of concerns. Feature-Sliced Design (FSD) provides a methodology for structuring frontend applications with well-defined layers and boundaries.

## Decision
We will implement Feature-Sliced Design (FSD) with the following layer architecture:

## Layer Definitions

### 1. `shared` - Foundation Layer
**Purpose**: Reusable, pure, UI-agnostic utilities and primitives

**Characteristics**:
- Framework-agnostic utilities
- Pure functions and constants
- No business logic
- No external dependencies on other layers
- Highly reusable across the entire application

**Examples**:
- Utility functions (formatters, validators, helpers)
- Constants and configuration
- Base UI components (Button, Input, Modal)
- API client configurations
- Common types and interfaces

### 2. `entities` - Domain Models Layer
**Purpose**: Domain models and their UI representations

**Characteristics**:
- Business entities and their data structures
- Entity-specific UI components
- CRUD operations for entities
- Domain-specific logic
- Can use `shared` layer only

**Examples**:
- Property model and PropertyCard component
- User model and UserProfile component
- Listing model and ListingItem component

### 3. `features` - Business Logic Layer
**Purpose**: User-oriented slices that mutate state and implement business features

**Characteristics**:
- Complete user workflows
- State mutations and side effects
- Business logic implementation
- Can use `shared` and `entities` layers
- Self-contained feature implementations

**Examples**:
- AddPropertyForm
- UserAuthentication
- PropertySearch
- FavoriteProperties

### 4. `widgets` - Composite UI Layer
**Purpose**: Complex UI blocks that compose entities and features

**Characteristics**:
- Composite UI components
- Combines multiple entities and features
- Presentation logic
- Can use `shared`, `entities`, and `features` layers
- Reusable across different pages

**Examples**:
- PropertyListWidget (combines PropertyCard entities with PropertySearch feature)
- UserDashboard (combines UserProfile entity with various user features)
- NavigationWidget

### 5. `pages` - Route Layer
**Purpose**: Route-level files with no business logic

**Characteristics**:
- Route components only
- Minimal logic (routing, layout)
- Composes widgets and features
- Can use all lower layers
- One-to-one mapping with routes

**Examples**:
- HomePage
- PropertyDetailsPage
- UserProfilePage
- SearchResultsPage

### 6. `app` - Application Layer
**Purpose**: Application-wide providers, routing, theme, and configuration

**Characteristics**:
- Application initialization
- Global providers (Redux, Context)
- Routing configuration
- Theme and styling setup
- Internationalization (i18n)
- Can use all layers

**Examples**:
- App.tsx (main application component)
- Router configuration
- Theme provider
- i18n setup
- Global store configuration

## Naming Conventions

Each layer segment follows a standardized internal structure:

```
<layer>/<slice-name>/
├── index.ts          # Public API (barrel export)
├── model/            # Business logic, state, types
│   ├── index.ts
│   ├── types.ts
│   ├── store.ts
│   └── services.ts
├── ui/               # UI components
│   ├── index.ts
│   └── <ComponentName>.tsx
├── lib/              # Utilities and helpers
│   ├── index.ts
│   └── utils.ts
└── config/           # Configuration and constants
    ├── index.ts
    └── constants.ts
```

### File Naming Rules:
- **index.ts**: Always present as the public API barrel
- **Components**: PascalCase (e.g., `PropertyCard.tsx`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Types**: PascalCase with suffix (e.g., `PropertyType.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

## Public API Barrel Rules

### 1. Mandatory Public API
Every slice MUST have an `index.ts` file that serves as the public API:

```typescript
// ✅ Good - Clear public API
export { PropertyCard } from './ui/PropertyCard';
export { useProperty } from './model/hooks';
export type { Property } from './model/types';
```

### 2. Internal Structure Hidden
Internal file structure should NOT be exposed:

```typescript
// ❌ Bad - Exposes internal structure
export { PropertyCard } from './ui/PropertyCard';
export { validateProperty } from './lib/validation';

// ✅ Good - Clean public interface
export { PropertyCard, useProperty, type Property } from './';
```

### 3. Re-export Pattern
Use re-exports to create clean APIs:

```typescript
// shared/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Modal } from './Modal';

// entities/property/index.ts
export { PropertyCard } from './ui';
export { useProperty, propertyModel } from './model';
export type { Property, PropertyStatus } from './model';
```

## Import Order and Restrictions

### Layer Import Rules (Strict Hierarchy)

```typescript
// Import hierarchy (can only import from same level or below)
app → can import from: widgets, pages, features, entities, shared
pages → can import from: widgets, features, entities, shared
widgets → can import from: features, entities, shared
features → can import from: entities, shared
entities → can import from: shared
shared → can import from: nothing (external libraries only)
```

### Import Examples

```typescript
// ✅ Valid imports
// In features/add-property/model/store.ts
import { Property } from '@/entities/property';
import { validateEmail } from '@/shared/lib/validation';

// ✅ Valid imports  
// In widgets/property-list/ui/PropertyList.tsx
import { PropertyCard } from '@/entities/property';
import { PropertySearch } from '@/features/property-search';
import { Button } from '@/shared/ui';

// ❌ Invalid imports - violates layer hierarchy
// In entities/property/model/types.ts
import { AddPropertyForm } from '@/features/add-property'; // entities cannot import features

// In shared/ui/Button.tsx
import { useAuth } from '@/features/auth'; // shared cannot import features
```

### Path Aliases
Use standardized path aliases:

```typescript
// tsconfig.json paths
{
  "paths": {
    "@/shared/*": ["./src/shared/*"],
    "@/entities/*": ["./src/entities/*"],
    "@/features/*": ["./src/features/*"],
    "@/widgets/*": ["./src/widgets/*"],
    "@/pages/*": ["./src/pages/*"],
    "@/app/*": ["./src/app/*"]
  }
}
```

### Import Statement Order
Follow this order within files:

```typescript
// 1. External libraries
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal imports (by layer, bottom to top)
import { formatPrice } from '@/shared/lib/utils';
import { Button } from '@/shared/ui';
import { Property } from '@/entities/property';
import { usePropertySearch } from '@/features/property-search';

// 3. Relative imports
import { PropertyListItem } from './PropertyListItem';
```

## Enforcement Rules

### 1. Layer Boundary Violations
- Use ESLint rules to prevent cross-layer imports
- Automated checks in CI/CD pipeline
- Code review guidelines

### 2. Public API Compliance
- All imports must go through public APIs (index.ts)
- No direct imports of internal files
- Barrel exports are mandatory

### 3. Naming Consistency
- Enforce naming conventions through linting
- Use TypeScript strict mode
- Consistent directory structure

## Benefits

1. **Predictable Architecture**: Clear layer boundaries and responsibilities
2. **Scalability**: Easy to add new features without architectural debt
3. **Maintainability**: Clear separation of concerns and dependencies
4. **Team Productivity**: Standardized structure reduces cognitive load
5. **Testing**: Isolated layers are easier to test
6. **Refactoring**: Well-defined boundaries make refactoring safer

## Migration Strategy

1. **Phase 1**: Establish layer structure and move shared utilities
2. **Phase 2**: Extract entities and their UI components
3. **Phase 3**: Identify and extract features
4. **Phase 4**: Create widgets by composing entities and features
5. **Phase 5**: Refactor pages to use widgets and features
6. **Phase 6**: Set up app layer with providers and routing

## Examples

### Shared Layer
```typescript
// shared/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// shared/lib/validation/index.ts
export { validateEmail, validatePhone } from './validators';

// shared/api/index.ts
export { apiClient } from './client';
export type { ApiResponse } from './types';
```

### Entities Layer
```typescript
// entities/property/index.ts
export { PropertyCard } from './ui';
export { useProperty, propertyModel } from './model';
export type { Property, PropertyStatus } from './model';

// entities/property/model/types.ts
export interface Property {
  id: string;
  title: string;
  price: number;
  status: PropertyStatus;
}

// entities/property/ui/PropertyCard.tsx
import { Property } from '../model/types';
import { Button } from '@/shared/ui';

export const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  return (
    <div className="property-card">
      <h3>{property.title}</h3>
      <p>${property.price}</p>
      <Button>View Details</Button>
    </div>
  );
};
```

### Features Layer
```typescript
// features/add-property/index.ts
export { AddPropertyForm } from './ui';
export { useAddProperty } from './model';

// features/add-property/ui/AddPropertyForm.tsx
import { Property } from '@/entities/property';
import { Button, Input } from '@/shared/ui';
import { useAddProperty } from '../model/hooks';

export const AddPropertyForm: React.FC = () => {
  const { addProperty, isLoading } = useAddProperty();
  
  return (
    <form onSubmit={handleSubmit}>
      <Input name="title" placeholder="Property Title" />
      <Input name="price" type="number" placeholder="Price" />
      <Button type="submit" disabled={isLoading}>
        Add Property
      </Button>
    </form>
  );
};
```

### Widgets Layer
```typescript
// widgets/property-list/index.ts
export { PropertyListWidget } from './ui';

// widgets/property-list/ui/PropertyListWidget.tsx
import { PropertyCard } from '@/entities/property';
import { PropertySearch } from '@/features/property-search';
import { useProperties } from '../model/hooks';

export const PropertyListWidget: React.FC = () => {
  const { properties } = useProperties();
  
  return (
    <div className="property-list-widget">
      <PropertySearch />
      <div className="property-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};
```

## Conclusion

This FSD architecture provides a solid foundation for building scalable, maintainable applications. The clear layer boundaries, naming conventions, and import rules ensure consistency across the codebase while promoting good architectural practices.

Regular reviews and updates to this ADR will ensure it remains relevant as the application evolves.
