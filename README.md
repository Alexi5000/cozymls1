# CozyMLS - Feature-Sliced Design React Application

## Project Overview

**URL**: https://lovable.dev/projects/ee44240e-cd82-43c4-8e94-050e970f07c8

This is a modern MLS (Multiple Listing Service) application built with React, TypeScript, and following the Feature-Sliced Design (FSD) architecture methodology. The application provides a comprehensive platform for managing properties, deals, contacts, and real estate activities.

## 🏗️ Architecture: Feature-Sliced Design (FSD)

This project implements [Feature-Sliced Design](https://feature-sliced.design/), a methodology for organizing frontend applications. The architecture follows a layered approach with clear separation of concerns.

### Layer Structure

```
src/
├── app/          # Application layer (providers, routing, global config)
├── pages/        # Page layer (route components and page-specific logic)
├── widgets/      # Widget layer (complex UI components that compose features)
├── features/     # Feature layer (business logic and user interactions)
├── entities/     # Entity layer (business entities and their operations)
├── shared/       # Shared layer (reusable utilities, UI components, types)
└── processes/    # Process layer (complex workflows spanning multiple features)
```

### Layer Import Rules

- **Bottom-up imports only**: Lower layers can't import from upper layers
- **Same-layer imports**: Not allowed (except for shared layer)
- **Public API**: Each layer exposes only what's necessary through index.ts files

### Boundaries Enforcement

The project uses ESLint with boundaries plugin to enforce FSD rules:

```bash
# Check layer boundaries
npm run check-boundaries

# Analyze import dependencies
npm run analyze-imports
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Development Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Run tests
npm run test

# Run linting with boundary checks
npm run lint
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build for development |
| `npm run type-check` | Run TypeScript type checking |
| `npm run lint` | Run ESLint with FSD boundary checks |
| `npm run test` | Run tests in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run check-boundaries` | Check FSD layer boundaries |
| `npm run analyze-imports` | Analyze import dependencies |
| `npm run generate-barrels` | Generate barrel exports |
| `npm run e2e` | Run end-to-end tests |

## 🛠️ Technology Stack

### Core Technologies
- **React 18** - UI library with hooks and concurrent features
- **TypeScript** - Static type checking
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing

### UI & Styling
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI primitives
- **Lucide React** - Icon library

### State Management & Data
- **TanStack Query** - Server state management
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Testing
- **Vitest** - Unit testing framework
- **Testing Library** - React testing utilities
- **Cypress** - End-to-end testing

### Development Tools
- **ESLint** - Code linting with FSD boundaries
- **Plop** - Code generation
- **JSCodeshift** - Code transformation

## 📁 Project Structure

### App Layer (`src/app/`)
- Global application setup
- Route configuration
- Provider composition
- Theme management

### Pages Layer (`src/pages/`)
- Route components
- Page-specific logic
- SEO and meta configuration

### Widgets Layer (`src/widgets/`)
- Complex UI components
- Feature composition
- Layout components

### Features Layer (`src/features/`)
- Business logic
- User interactions
- API integration
- Feature-specific hooks

### Entities Layer (`src/entities/`)
- Business entities (Property, Deal, Contact, etc.)
- Entity operations
- Data models and types

### Shared Layer (`src/shared/`)
- Reusable UI components
- Utility functions
- Common types and constants
- Hooks and providers

## 🔄 Phase 2: Next.js Migration Plan

### Migration Strategy

The project is designed for seamless migration to Next.js while maintaining FSD architecture:

#### 1. **App Router Transition**
- Convert from React Router to Next.js App Router
- Migrate pages to `app/` directory structure
- Implement layout components

#### 2. **Server Components Integration**
- Identify components suitable for server-side rendering
- Migrate static widgets to Server Components
- Preserve client-side interactivity where needed

#### 3. **API Routes**
- Convert mock data to Next.js API routes
- Implement server-side validation
- Add database integration

#### 4. **Performance Optimizations**
- Implement Static Site Generation (SSG) for property listings
- Add Incremental Static Regeneration (ISR)
- Optimize images with Next.js Image component

### Migration Preparation

The current structure is migration-ready:

- **FSD layers** will remain intact
- **Shared components** are framework-agnostic
- **Business logic** is separated from UI
- **API layer** is abstracted in features

### Post-Migration Benefits

- **SEO optimization** with server-side rendering
- **Improved performance** with static generation
- **Better UX** with streaming and suspense
- **Enhanced development** with App Router features

## 📊 Quality Assurance

### Automated Testing

- **Unit Tests**: Component and utility testing
- **Integration Tests**: Feature testing
- **E2E Tests**: User workflow testing
- **Coverage Reports**: Maintained above 80%

### Code Quality

- **TypeScript**: Strict mode enabled
- **ESLint**: FSD boundaries enforcement
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### CI/CD Pipeline

The project includes comprehensive GitHub Actions:

1. **Type Check**: TypeScript compilation
2. **ESLint**: Code linting and boundaries
3. **Tests**: Unit and integration tests
4. **Boundary Check**: FSD architecture validation
5. **Build**: Production build verification

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:

- FSD architecture patterns
- Code style and conventions
- Testing requirements
- Pull request process

## 📚 Resources

- [Feature-Sliced Design Documentation](https://feature-sliced.design/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🚢 Deployment

### Current Deployment

Open [Lovable](https://lovable.dev/projects/ee44240e-cd82-43c4-8e94-050e970f07c8) and click Share → Publish.

### Custom Domain

Navigate to Project > Settings > Domains and click Connect Domain.

Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## 📝 License

This project is licensed under the MIT License.
