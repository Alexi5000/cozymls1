# Architecture Overview

This document provides a comprehensive overview of Haven Estate Suite's architecture, design patterns, and technical decisions.

## Table of Contents

- [System Architecture](#system-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Backend Architecture](#backend-architecture)
- [Data Flow](#data-flow)
- [Authentication Flow](#authentication-flow)
- [Component Hierarchy](#component-hierarchy)
- [Design Patterns](#design-patterns)

## System Architecture

Haven Estate Suite follows a modern **JAMstack architecture** with clear separation between frontend and backend concerns.

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           React SPA (Vite + TypeScript)              │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐    │  │
│  │  │ Pages  │  │Widgets │  │Entities│  │ Shared │    │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘    │  │
│  │                    React Query Cache                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                    Lovable Cloud Backend                     │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  PostgreSQL Database                  │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌────────┐ │  │
│  │  │Properties│ │Contacts │  │  Deals  │  │ Users  │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └────────┘ │  │
│  │                 Row Level Security (RLS)             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 Authentication                         │  │
│  │              Email + Password (Supabase Auth)         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Edge Functions                        │  │
│  │         Serverless API endpoints (Deno)               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Storage Buckets                       │  │
│  │         File uploads (avatars, documents)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Frontend Architecture

### Feature-Sliced Design (FSD)

We use **Feature-Sliced Design** for frontend architecture, which provides:
- Clear separation of concerns
- Predictable file structure
- Easy navigation and maintenance
- Scalable codebase organization

#### Layers (from top to bottom):

```
src/
├── app/              Layer 1: Application initialization
├── pages/            Layer 2: Route pages
├── widgets/          Layer 3: Complex UI sections
├── entities/         Layer 4: Business entities
└── shared/           Layer 5: Shared code
```

**Import Rules**:
- Lower layers cannot import from higher layers
- Each layer can import from layers below it
- Horizontal imports within the same layer are allowed

For detailed FSD documentation, see [FEATURE_SLICED_DESIGN.md](FEATURE_SLICED_DESIGN.md)

### Technology Choices

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| React 18 | UI Library | Modern hooks, concurrent features, large ecosystem |
| TypeScript | Type Safety | Catch errors early, better IDE support, self-documenting |
| Vite | Build Tool | Extremely fast HMR, optimized production builds |
| Tailwind CSS | Styling | Utility-first, consistent design system, small bundle |
| shadcn/ui | Components | Accessible, customizable, copy-paste approach |
| React Query | Data Fetching | Caching, optimistic updates, automatic refetching |
| React Router | Routing | Industry standard, type-safe, nested routes |

### State Management Strategy

We use a **multi-tiered state management** approach:

1. **Server State** (React Query)
   - API data caching
   - Automatic background refetching
   - Optimistic updates
   - Loading and error states

2. **URL State** (React Router)
   - Search params
   - Route parameters
   - Navigation state

3. **Component State** (React useState/useReducer)
   - UI interactions
   - Form inputs
   - Local component data

4. **Global State** (Zustand - when needed)
   - Used sparingly for truly global state
   - Example: Report builder store (`report-store.ts`)

### Component Structure

```
Component/
├── index.ts              # Public exports
├── ComponentName.tsx     # Main component
├── types.ts              # TypeScript types
├── hooks.ts              # Custom hooks (optional)
└── utils.ts              # Helper functions (optional)
```

## Backend Architecture

### Lovable Cloud (Supabase)

Backend is powered by **Lovable Cloud**, which provides:

- **PostgreSQL Database** - Relational data storage
- **Authentication** - User management and sessions
- **Row Level Security** - Database-level access control
- **Real-time** - WebSocket subscriptions for live data
- **Edge Functions** - Serverless API endpoints
- **Storage** - File upload and management

### Database Schema

Key tables and relationships:

```
┌─────────────┐
│    users    │
│  (auth)     │
└──────┬──────┘
       │
       ├─────────────┬─────────────┬─────────────┐
       │             │             │             │
┌──────▼──────┐ ┌───▼────────┐ ┌──▼──────┐ ┌───▼────────┐
│ properties  │ │  contacts  │ │  deals  │ │activities  │
│             │ │            │ │         │ │            │
│ - user_id   │ │ - user_id  │ │-user_id │ │ - user_id  │
│ - title     │ │ - name     │ │-stage   │ │ - type     │
│ - price     │ │ - email    │ │-value   │ │ - date     │
│ - status    │ │ - phone    │ │-close   │ │ - entity   │
└─────────────┘ └────────────┘ └─────────┘ └────────────┘
```

For complete schema documentation, see [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

### Security Model

**Row Level Security (RLS)** is enabled on all tables:

```sql
-- Example: Users can only view their own properties
CREATE POLICY "Users can view own properties"
ON public.properties
FOR SELECT
USING (auth.uid() = user_id);

-- Example: Users can only update their own properties
CREATE POLICY "Users can update own properties"
ON public.properties
FOR UPDATE
USING (auth.uid() = user_id);
```

Key security principles:
- ✅ RLS enabled on all user-data tables
- ✅ Policies for SELECT, INSERT, UPDATE, DELETE
- ✅ User ID validation in all policies
- ✅ No direct access to `auth.users` table
- ✅ Environment variables for secrets

## Data Flow

### Standard Data Flow (Read)

```
┌──────────────┐
│   Component  │
│              │
│  useQuery()  │ ──┐
└──────────────┘   │
                   │
                   │  1. Check cache
                   ▼
┌──────────────────────────┐
│    React Query Cache     │
├──────────────────────────┤
│  If cached & fresh:      │
│    Return cached data    │◄───┐
│  If stale:               │    │
│    Return cached data    │    │
│    + Fetch in background │    │
│  If not cached:          │    │
│    Fetch from API        │    │
└────────┬─────────────────┘    │
         │                      │
         │ 2. API call (if needed)
         ▼                      │
┌──────────────────────────┐    │
│   Supabase Client        │    │
│                          │    │
│  - Add auth headers      │    │
│  - Build query           │    │
│  - Send HTTP request     │    │
└────────┬─────────────────┘    │
         │                      │
         │ 3. Database query    │
         ▼                      │
┌──────────────────────────┐    │
│   PostgreSQL Database    │    │
│                          │    │
│  - Apply RLS policies    │    │
│  - Execute query         │    │
│  - Return results        │    │
└────────┬─────────────────┘    │
         │                      │
         │ 4. Response          │
         └──────────────────────┘
```

### Write Operation Flow (Mutation)

```
┌──────────────┐
│   Component  │
│              │
│ useMutation()│ ───┐
└──────────────┘    │
                    │ 1. Execute mutation
                    ▼
┌────────────────────────────────┐
│    Supabase Client             │
│                                │
│  - Validate data               │
│  - Send to database            │
└────────┬───────────────────────┘
         │
         │ 2. Database operation
         ▼
┌────────────────────────────────┐
│    PostgreSQL Database         │
│                                │
│  - Verify RLS policies         │
│  - Insert/Update/Delete        │
│  - Trigger database triggers   │
│  - Return updated data         │
└────────┬───────────────────────┘
         │
         │ 3. Invalidate cache
         ▼
┌────────────────────────────────┐
│    React Query                 │
│                                │
│  - Invalidate relevant queries │
│  - Refetch affected data       │
│  - Update UI                   │
└────────────────────────────────┘
```

## Authentication Flow

```
┌─────────────┐
│   User      │
│   Visits    │
│   /auth     │
└──────┬──────┘
       │
       │ 1. Sign up / Log in
       ▼
┌──────────────────────┐
│   Auth Page          │
│                      │
│  - Email input       │
│  - Password input    │
│  - Submit form       │
└──────┬───────────────┘
       │
       │ 2. Call auth API
       ▼
┌──────────────────────────────┐
│   Supabase Auth              │
│                              │
│  - Validate credentials      │
│  - Create session            │
│  - Return JWT token          │
└──────┬───────────────────────┘
       │
       │ 3. Store session
       ▼
┌──────────────────────────────┐
│   localStorage               │
│                              │
│  - Store access token        │
│  - Store refresh token       │
└──────┬───────────────────────┘
       │
       │ 4. Redirect to app
       ▼
┌──────────────────────────────┐
│   Protected Route            │
│                              │
│  - Check auth status         │
│  - Load user data            │
│  - Render dashboard          │
└──────────────────────────────┘

┌──────────────────────────────┐
│   Subsequent Requests        │
│                              │
│  - Attach Authorization      │
│    header with JWT           │
│  - Backend validates token   │
│  - Apply RLS based on        │
│    user ID in token          │
└──────────────────────────────┘
```

### Protected Routes

```typescript
// Protected route wrapper
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>

// Implementation checks for:
// 1. Valid session exists
// 2. Token not expired
// 3. User authenticated
// If not, redirect to /auth
```

## Component Hierarchy

### Top-Level Structure

```
<App>
  <QueryClientProvider>
    <ThemeProvider>
      <Router>
        <Routes>
          ├── / (Public)
          ├── /auth (Public)
          └── /* (Protected)
              <Layout>
                <Header />
                <Sidebar />
                <main>
                  <Routes>
                    ├── /dashboard
                    ├── /properties
                    ├── /contacts
                    ├── /deals
                    ├── /activities
                    ├── /reports
                    └── /settings
                  </Routes>
                </main>
              </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  </QueryClientProvider>
</App>
```

### Page Component Structure

Example: Properties Page

```
<PropertiesPage>
  ├── <PropertiesHeader>
  │   ├── <Breadcrumb />
  │   ├── <SearchInput />
  │   └── <AddPropertyDialog />
  │
  ├── <PropertiesStats>
  │   ├── <StatCard />
  │   ├── <StatCard />
  │   └── <StatCard />
  │
  ├── <PropertiesFilters>
  │   ├── <Select /> (Status)
  │   ├── <Select /> (Type)
  │   └── <Input /> (Price range)
  │
  └── <PropertiesGrid>
      ├── <PropertyCard />
      ├── <PropertyCard />
      └── <PropertyCard />
</PropertiesPage>
```

## Design Patterns

### 1. Container/Presenter Pattern

Separate data logic from presentation:

```typescript
// Container (smart component)
export function PropertiesPage() {
  const { data, isLoading } = useProperties();
  
  return <PropertiesGrid properties={data} loading={isLoading} />;
}

// Presenter (dumb component)
export function PropertiesGrid({ properties, loading }) {
  if (loading) return <Skeleton />;
  return <div>{/* Render properties */}</div>;
}
```

### 2. Custom Hooks Pattern

Extract reusable logic:

```typescript
// Custom hook
export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data } = await supabase
        .from('properties')
        .select('*');
      return data;
    },
  });
}

// Usage in components
const { data, isLoading, error } = useProperties();
```

### 3. Compound Components Pattern

For complex components with shared state:

```typescript
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>
```

### 4. Render Props / Children as Function

For flexible component composition:

```typescript
<DataTable
  data={properties}
  render={(property) => <PropertyCard property={property} />}
/>
```

## Performance Optimizations

1. **Code Splitting**
   - Route-based code splitting with React.lazy()
   - Dynamic imports for large components

2. **Memoization**
   - React.memo for expensive components
   - useMemo for expensive calculations
   - useCallback for function props

3. **Data Fetching**
   - React Query automatic caching
   - Background refetching
   - Prefetching on hover

4. **Bundle Optimization**
   - Tree shaking unused code
   - Lazy loading images
   - Font preloading

## Testing Strategy

(To be implemented)

- **Unit Tests**: Individual functions and hooks
- **Integration Tests**: Component interactions
- **E2E Tests**: Critical user journeys

## Future Considerations

- Internationalization (i18n)
- Progressive Web App (PWA)
- Offline support
- Advanced analytics
- Third-party integrations
- Mobile apps (React Native)

## Related Documentation

- [Database Schema](DATABASE_SCHEMA.md)
- [Feature-Sliced Design](FEATURE_SLICED_DESIGN.md)
- [Coding Standards](../development/CODING_STANDARDS.md)
