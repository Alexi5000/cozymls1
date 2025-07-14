# Feature-Sliced Design (FSD) Layer Boundaries

This project enforces strict layer boundaries according to the Feature-Sliced Design (FSD) methodology using ESLint boundaries plugin.

## Layer Dependency Rules

The following layer dependency rules are enforced:

### 📚 **shared** → No internal dependencies
- ✅ Can import from: External packages only
- ❌ Cannot import from: `app`, `pages`, `widgets`, `features`, `entities`, `processes`

### 🏗️ **entities** → Can import shared
- ✅ Can import from: `shared`
- ❌ Cannot import from: `app`, `pages`, `widgets`, `features`, `processes`

### ⚙️ **features** → Can import entities/shared
- ✅ Can import from: `entities`, `shared`
- ❌ Cannot import from: `app`, `pages`, `widgets`, `processes`

### 🧩 **widgets** → Can import features/entities/shared
- ✅ Can import from: `features`, `entities`, `shared`
- ❌ Cannot import from: `app`, `pages`, `processes`

### 🔄 **processes** → Can import features/entities/shared
- ✅ Can import from: `features`, `entities`, `shared`
- ❌ Cannot import from: `app`, `pages`, `widgets`

### 📄 **pages** → Can import any layer except app
- ✅ Can import from: `widgets`, `features`, `entities`, `shared`, `processes`
- ❌ Cannot import from: `app`

### 🏠 **app** → Can import any layer
- ✅ Can import from: `pages`, `widgets`, `features`, `entities`, `shared`, `processes`

## Commands

### Check Boundaries
```bash
npm run check-boundaries
```

### Lint with Boundaries
```bash
npm run lint
```

## CI/CD Integration

The project includes GitHub Actions workflow (`.github/workflows/ci.yml`) that automatically:
- Runs ESLint with boundaries enforcement
- Fails the build if layer boundaries are violated
- Provides clear error messages for violations

## Configuration

The boundaries are configured in `eslint.config.js`:

```javascript
"boundaries/element-types": [
  "error",
  {
    default: "disallow",
    rules: [
      // Layer-specific rules...
    ]
  }
]
```

## Benefits

1. **Maintainability**: Clear dependency direction prevents circular dependencies
2. **Scalability**: Each layer has well-defined responsibilities
3. **Testability**: Lower layers can be tested independently
4. **Reusability**: Shared components remain pure and reusable
5. **Team Collaboration**: Clear boundaries help team members understand the architecture

## Violation Examples

❌ **Bad**: Importing from higher layer
```typescript
// In src/entities/user/model.ts
import { UserWidget } from '../../widgets/user'; // VIOLATION!
```

✅ **Good**: Importing from lower layer
```typescript
// In src/widgets/user/ui/UserCard.tsx
import { UserEntity } from '../../entities/user';
import { Button } from '../../shared/ui/button';
```

## Troubleshooting

If you encounter boundaries violations:
1. Check the import path
2. Verify the layer hierarchy
3. Consider if the import belongs in a different layer
4. Refactor to follow the FSD dependency rules

For more information about FSD: https://feature-sliced.design/
