# Path Aliases & Barrel Generation

This document explains the path aliases configuration and barrel file generation system for the Feature-Sliced Design (FSD) architecture.

## Path Aliases

### TypeScript Configuration

The `tsconfig.json` file includes path aliases for all FSD layers:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/app": ["./src/app"],
      "@/pages": ["./src/pages"],
      "@/widgets": ["./src/widgets"],
      "@/features": ["./src/features"],
      "@/entities": ["./src/entities"],
      "@/shared": ["./src/shared"],
      "@/processes": ["./src/processes"]
    }
  }
}
```

### Vite Configuration

The `vite.config.ts` file includes corresponding resolve aliases:

```typescript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/app": path.resolve(__dirname, "./src/app"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/widgets": path.resolve(__dirname, "./src/widgets"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/entities": path.resolve(__dirname, "./src/entities"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
      "@/processes": path.resolve(__dirname, "./src/processes"),
    },
  },
});
```

### Usage Examples

```typescript
// Instead of relative imports
import { Button } from '../../../shared/ui/button';
import { UserEntity } from '../../entities/user';

// Use clean alias imports
import { Button } from '@/shared/ui/button';
import { UserEntity } from '@/entities/user';
```

## Barrel Files

Barrel files (`index.ts`) are used to create clean public APIs for each layer and slice. They re-export the important parts of a module, making imports cleaner and more maintainable.

### Automatic Generation

We provide two methods for generating barrel files:

#### 1. Node.js Script (Recommended)

```bash
# Generate all barrel files once
npm run generate-barrels

# Watch for changes and regenerate automatically
npm run generate-barrels:watch
```

The script automatically:
- Scans all FSD layers (`shared`, `entities`, `features`, `widgets`, `processes`, `pages`, `app`)
- Generates `index.ts` files for each directory
- Includes only relevant files (`.ts`, `.tsx`, `.js`, `.jsx`)
- Excludes test files, stories, and type definitions
- Handles directories with existing index files

#### 2. Plop.js Generators

```bash
# Install plop if not already installed
npm install

# Generate barrel files interactively
npm run plop barrel

# Generate complete FSD slice structure
npm run plop fsd-slice
```

### Manual Barrel File Example

```typescript
// src/shared/ui/index.ts
export * from './button';
export * from './input';
export * from './modal';
export { default as Card } from './card';
```

### FSD Slice Structure

A typical FSD slice follows this structure:

```
src/
├── entities/
│   └── user/
│       ├── ui/
│       │   ├── user-card.tsx
│       │   └── index.ts
│       ├── model/
│       │   ├── user.types.ts
│       │   ├── user.store.ts
│       │   └── index.ts
│       ├── api/
│       │   ├── user.api.ts
│       │   └── index.ts
│       └── index.ts
```

Each segment (`ui`, `model`, `api`) has its own barrel file, and the slice has a main barrel file that re-exports from all segments.

## Best Practices

### 1. Layer Dependencies

Follow the FSD dependency rule (lower layers can only import from layers below):

```
app → pages → widgets → features → entities → shared
```

### 2. Public API Design

Only export what should be consumed by other layers:

```typescript
// ❌ Don't export internal implementation details
export { InternalHelper } from './internal-helper';

// ✅ Export clean public API
export { UserCard } from './user-card';
export type { User } from './user.types';
```

### 3. Barrel File Organization

```typescript
// Group related exports
export * from './components';
export * from './hooks';
export * from './utils';

// Re-export types
export type { User, UserRole } from './types';

// Re-export defaults with clear names
export { default as UserCard } from './user-card';
```

### 4. Import Patterns

```typescript
// ✅ Use layer aliases for cross-layer imports
import { UserCard } from '@/entities/user';
import { Button } from '@/shared/ui';

// ✅ Use relative imports within the same slice
import { UserAvatar } from './user-avatar';
import { formatUserName } from '../lib/format-user-name';
```

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run generate-barrels` | Generate all barrel files once |
| `npm run generate-barrels:watch` | Watch mode - regenerate on file changes |
| `npm run plop` | Interactive generators for barrels and slices |
| `npm run plop barrel` | Generate barrel files for specific layers |
| `npm run plop fsd-slice` | Generate complete FSD slice structure |

## Configuration

### Barrel Generator Settings

The barrel generator can be configured in `scripts/generate-barrels.js`:

```javascript
// File extensions to include
const EXPORT_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

// Files to exclude
const EXCLUDE_FILES = [
  'index.ts',
  'index.tsx', 
  '.test.',
  '.spec.',
  '.stories.',
  '.d.ts'
];

// Maximum depth for recursive generation
const MAX_DEPTH = 3;
```

### Plop Configuration

The Plop configuration can be customized in `plopfile.js` to add new generators or modify existing ones.

## Troubleshooting

### Common Issues

1. **Path alias not working**: Ensure both `tsconfig.json` and `vite.config.ts` are updated
2. **Barrel file not generated**: Check that the directory contains exportable files
3. **Circular dependencies**: Avoid importing from the same layer or higher layers

### Debug Commands

```bash
# Test the barrel generator
node scripts/generate-barrels.js

# Check TypeScript compilation
npx tsc --noEmit

# Test imports
npm run build
```

## IDE Configuration

### VS Code

Add to `.vscode/settings.json`:

```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.preferences.includePackageJsonAutoImports": "off"
}
```

This ensures that VS Code uses your path aliases and doesn't auto-import from node_modules when not needed.
