# Contributing to CozyMLS

Welcome to CozyMLS! Thank you for considering contributing to our Feature-Sliced Design React application.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [FSD Architecture Guidelines](#fsd-architecture-guidelines)
- [Development Setup](#development-setup)
- [Style and Conventions](#style-and-conventions)
- [Testing Guidelines](#testing-guidelines)
- [Phase 2: Next.js Migration](#phase-2-nextjs-migration)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@cozymls.com].

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as [GitHub issues](https://github.com/yourorg/cozymls/issues). Create an issue with the following details:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Explain what you expected to see, versus what you actually saw**
- **Include screenshots and expected output if applicable**
- **Specify which layer(s) the bug affects**

### Suggesting Enhancements

To suggest new features, create an issue using the "Feature Request" template:

- **Use a clear and descriptive title**
- **Provide a clear and detailed explanation of the feature**
- **Describe alternatives you've considered**
- **Specify which FSD layer(s) the feature should belong to**

### Your First Code Contribution

Working on your first Pull Request? You can start with issues tagged `good first issue`:

- Fork the repository
- Create a new branch
- Follow the coding guidelines
- Add tests where applicable
- Submit a pull request

## FSD Architecture Guidelines

This project uses [Feature-Sliced Design](https://feature-sliced.design/en/docs/getting-started/overview) methodology. Understanding FSD is crucial for contributing.

### 🏗️ Layer Structure

```
src/
├── app/          # Application layer
├── pages/        # Page layer
├── widgets/      # Widget layer
├── features/     # Feature layer
├── entities/     # Entity layer
├── shared/       # Shared layer
└── processes/    # Process layer
```

### 📋 Layer Responsibilities

#### App Layer (`src/app/`)
- **Purpose**: Global application setup and configuration
- **Contains**: Providers, routing, theme configuration
- **Can import from**: All other layers
- **Example**: `App.tsx`, `providers.tsx`, `router.tsx`

#### Pages Layer (`src/pages/`)
- **Purpose**: Route components and page-specific logic
- **Contains**: Page components, route handlers, SEO configuration
- **Can import from**: widgets, features, entities, shared
- **Cannot import from**: app, other pages
- **Example**: `DashboardPage`, `PropertiesPage`

#### Widgets Layer (`src/widgets/`)
- **Purpose**: Complex UI components that compose features
- **Contains**: Layout components, complex UI blocks
- **Can import from**: features, entities, shared
- **Cannot import from**: app, pages, other widgets
- **Example**: `PropertiesGrid`, `DashboardStats`

#### Features Layer (`src/features/`)
- **Purpose**: Business logic and user interactions
- **Contains**: API calls, business logic, feature-specific hooks
- **Can import from**: entities, shared
- **Cannot import from**: app, pages, widgets, other features
- **Example**: `add-property`, `search-property`

#### Entities Layer (`src/entities/`)
- **Purpose**: Business entities and their operations
- **Contains**: Data models, entity operations, business rules
- **Can import from**: shared
- **Cannot import from**: app, pages, widgets, features, other entities
- **Example**: `property`, `deal`, `contact`

#### Shared Layer (`src/shared/`)
- **Purpose**: Reusable code across the application
- **Contains**: UI components, utilities, common types, hooks
- **Can import from**: Only other shared modules
- **Cannot import from**: Any other layer
- **Example**: `Button`, `utils`, `types`

#### Processes Layer (`src/processes/`)
- **Purpose**: Complex workflows spanning multiple features
- **Contains**: Multi-step processes, workflows
- **Can import from**: features, entities, shared
- **Cannot import from**: app, pages, widgets, other processes
- **Example**: `property-onboarding`, `deal-workflow`

### 🔒 Import Rules

1. **Bottom-up imports only**: Lower layers cannot import from upper layers
2. **No cross-layer imports**: Layers at the same level cannot import from each other
3. **Public API only**: Use `index.ts` files to expose public interfaces
4. **Shared exception**: Shared layer can only import from other shared modules

### 📁 Slice Structure

Each slice should follow this structure:

```
feature-name/
├── index.ts          # Public API
├── api/              # API layer
│   └── index.ts
├── hooks/            # Feature-specific hooks
│   └── index.ts
├── lib/              # Utilities and helpers
│   └── index.ts
├── types/            # TypeScript types
│   └── index.ts
└── ui/               # UI components
    └── index.ts
```

### 🛠️ Development Tools

#### Boundary Checking
```bash
# Check FSD layer boundaries
npm run check-boundaries

# Analyze import dependencies
npm run analyze-imports

# ESLint with boundaries plugin
npm run lint
```

#### Code Generation
```bash
# Generate new feature slice
npm run plop feature

# Generate new entity slice
npm run plop entity

# Generate barrel exports
npm run generate-barrels
```

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Setup Steps

```bash
# Clone and setup
git clone <repository-url>
cd cozymls
npm install

# Verify setup
npm run type-check
npm run lint
npm run test:run
npm run check-boundaries

# Start development
npm run dev
```

## Style and Conventions

### Code Style

- Follow `.eslintrc` and `.prettierrc` configurations
- Use TypeScript with strict mode enabled
- Favor functional components over class components
- Use React hooks instead of lifecycle methods
- Follow FSD naming conventions

### Naming Conventions

- **Files**: `kebab-case` for directories, `PascalCase` for React components
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types**: `PascalCase`
- **Interfaces**: `PascalCase` with `I` prefix if needed

### Component Structure

```typescript
// Good component structure
export const PropertyCard = ({ property }: PropertyCardProps) => {
  // Hooks at the top
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useMutation();
  
  // Event handlers
  const handleAction = useCallback(() => {
    // Implementation
  }, [dependency]);
  
  // Early returns
  if (isLoading) return <LoadingSpinner />;
  
  // Main render
  return (
    <div className="property-card">
      {/* Component JSX */}
    </div>
  );
};
```

### Git Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope): add new feature`
- `fix(scope): fix bug`
- `docs: update documentation`
- `style: formatting changes`
- `refactor(scope): refactor code`
- `test: add or update tests`
- `chore: build process or auxiliary tools`

**Scope examples**: `entities`, `features`, `widgets`, `app`, `shared`

## Testing Guidelines

### Testing Strategy

- **Unit Tests**: Test individual components and utilities
- **Integration Tests**: Test feature interactions
- **E2E Tests**: Test complete user workflows
- **Boundary Tests**: Verify FSD architecture compliance

### Test Structure

```typescript
// Example test file
import { render, screen } from '@testing-library/react';
import { PropertyCard } from './PropertyCard';
import { mockProperty } from '@/entities/property/model/mock-data';

describe('PropertyCard', () => {
  it('renders property information', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText(mockProperty.title)).toBeInTheDocument();
  });
  
  it('handles user interactions', async () => {
    // Test implementation
  });
});
```

### Coverage Requirements

- Maintain test coverage above 80%
- Critical business logic must have 100% coverage
- All public APIs must be tested
- UI components should have interaction tests

### Running Tests

```bash
# Run all tests
npm run test

# Run tests once
npm run test:run

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run e2e
```

## Phase 2: Next.js Migration

### Migration Preparation

The project is designed for seamless Next.js migration. When contributing, consider:

#### 🔄 Migration-Ready Patterns

1. **Server Component Compatibility**
   - Keep data fetching separate from UI
   - Use async/await patterns in features
   - Avoid client-side only APIs in widgets

2. **App Router Preparation**
   - Organize pages for App Router structure
   - Use layout components in widgets
   - Implement loading and error states

3. **API Layer Design**
   - Abstract API calls in features
   - Use consistent request/response patterns
   - Implement proper error handling

#### 📋 Migration Checklist

When adding new features, ensure they're Next.js ready:

- [ ] Data fetching is separated from UI components
- [ ] Components can run in both client and server environments
- [ ] API calls are abstracted in feature layers
- [ ] Static data is identified and marked
- [ ] Images use optimization-friendly patterns
- [ ] SEO metadata is considered

#### 🎯 Migration Benefits

Post-migration, the application will gain:

- **Performance**: Server-side rendering and static generation
- **SEO**: Better search engine optimization
- **Developer Experience**: Enhanced development tools
- **User Experience**: Faster page loads and better interactivity

### Migration Guidelines

1. **Keep FSD Structure**: The layer architecture will remain intact
2. **Prepare for Server Components**: Write components that can run on both client and server
3. **Abstract Framework Dependencies**: Keep React Router patterns replaceable
4. **Use Progressive Enhancement**: Ensure features work without JavaScript

## Pull Request Process

### Before Submitting

```bash
# Ensure all checks pass
npm run type-check
npm run lint
npm run test:run
npm run check-boundaries
npm run build
```

### PR Requirements

1. **Description**: Clear explanation of changes
2. **FSD Compliance**: Verify architecture boundaries
3. **Tests**: Add/update tests for new functionality
4. **Documentation**: Update relevant documentation
5. **Breaking Changes**: Document any breaking changes
6. **Migration Impact**: Consider Next.js migration implications

### Review Process

1. **Automated Checks**: CI/CD pipeline must pass
2. **Code Review**: At least one maintainer approval
3. **Architecture Review**: FSD compliance verification
4. **Testing Review**: Adequate test coverage

### PR Template

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## FSD Layer Impact

- [ ] App layer
- [ ] Pages layer
- [ ] Widgets layer
- [ ] Features layer
- [ ] Entities layer
- [ ] Shared layer
- [ ] Processes layer

## Testing

- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] E2E tests added/updated
- [ ] Boundary tests pass

## Next.js Migration

- [ ] Changes are Next.js compatible
- [ ] Server component considerations addressed
- [ ] API patterns follow migration guidelines

## Checklist

- [ ] Code follows FSD architecture
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Breaking changes documented
```

## Resources

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [FSD Examples](https://github.com/feature-sliced/examples)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library Documentation](https://testing-library.com/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Thank you for contributing to CozyMLS!** Your contributions help make this project better for everyone. If you have questions, feel free to open an issue or start a discussion.

Happy coding! 🚀
