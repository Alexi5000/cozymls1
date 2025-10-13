# Development Setup Guide

This guide will help you set up Haven Estate Suite for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js 20+** - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm 10+** or **bun 1.0+** - Package manager (comes with Node.js)
- **Git** - Version control

### Recommended

- **VS Code** - Code editor with recommended extensions
- **Chrome/Firefox DevTools** - Browser debugging

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/haven-estate-suite.git
cd haven-estate-suite
```

### 2. Set Node Version (with nvm)

```bash
# Use the version specified in .nvmrc
nvm use

# If not installed, install it
nvm install
```

### 3. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Or using bun
bun install
```

### 4. Environment Variables

Environment variables are automatically managed by Lovable Cloud. The `.env` file is auto-generated and should not be edited manually.

The following variables are automatically configured:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

**Important**: Never commit the `.env` file to version control (it's already in `.gitignore`).

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at:
```
http://localhost:8080
```

## Project Structure

```
haven-estate-suite/
├── .github/              # GitHub Actions workflows
├── docs/                 # Documentation
├── public/               # Static assets
├── src/                  # Source code
│   ├── app/              # Application initialization
│   ├── pages/            # Route pages
│   ├── widgets/          # Complex UI sections
│   ├── entities/         # Business entities
│   ├── shared/           # Shared utilities
│   └── integrations/     # Backend integrations
├── supabase/             # Database migrations
├── .editorconfig         # Editor configuration
├── .nvmrc                # Node version
├── eslint.config.js      # Linting rules
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Available Scripts

### Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Build for development environment
npm run build:dev

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Check TypeScript types
npm run type-check

# Format code with Prettier
npm run format

# Check code formatting
npm run format:check
```

### All Checks (Run Before Committing)

```bash
npm run type-check && npm run lint && npm run format:check
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests

### 2. Make Changes

- Follow [Coding Standards](CODING_STANDARDS.md)
- Write meaningful commit messages (see [Contributing Guide](../../CONTRIBUTING.md))
- Test your changes locally

### 3. Run Quality Checks

```bash
# Check types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add property filtering"
```

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Editor Setup

### VS Code (Recommended)

#### Install Recommended Extensions

When you open the project, VS Code will prompt you to install recommended extensions. Or install manually:

```bash
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension bradlc.vscode-tailwindcss
```

#### Workspace Settings

The project includes `.vscode/settings.json` with optimal settings:

- Auto-format on save
- ESLint auto-fix on save
- Tailwind IntelliSense
- TypeScript validation

### Other Editors

For other editors, ensure you have:
- ESLint plugin
- Prettier plugin
- EditorConfig support
- TypeScript support

## Troubleshooting

### Port 8080 Already in Use

```bash
# Kill process on port 8080 (macOS/Linux)
lsof -ti:8080 | xargs kill -9

# Or change port in vite.config.ts
server: {
  port: 3000  // Use different port
}
```

### Node Version Mismatch

```bash
# Check your Node version
node --version

# Should be 20+
nvm use 20
```

### Dependencies Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Restart TypeScript server in VS Code
# Press: Ctrl+Shift+P (Cmd+Shift+P on Mac)
# Type: "TypeScript: Restart TS Server"

# Or clear cache
rm -rf node_modules/.vite
npm run dev
```

### Build Errors

```bash
# Clear Vite cache
rm -rf dist node_modules/.vite
npm run build
```

### Environment Variables Not Loading

Environment variables are auto-managed by Lovable Cloud. If you experience issues:

1. Check that `.env` file exists
2. Restart the development server
3. Verify variables in the Lovable dashboard

**Never manually edit the `.env` file** - it's auto-generated.

## Database Development

### Viewing Data

Access the backend dashboard to view and manage data:
- Properties, contacts, deals, activities
- User management
- Database tables and schema
- RLS policies

### Creating Migrations

Database changes are managed through Lovable Cloud. When you need to modify the schema:

1. Plan your schema changes
2. Test locally if possible
3. Create migration via Lovable Cloud tools
4. Review and apply migration

See [Database Schema Documentation](../architecture/DATABASE_SCHEMA.md) for details.

### Testing Database Queries

```typescript
// Example: Testing a query in a component
import { supabase } from '@/integrations/supabase/client';

const { data, error } = await supabase
  .from('properties')
  .select('*')
  .eq('status', 'active');

console.log(data, error);
```

## Frontend Development

### Adding a New Page

1. Create page directory:
```bash
mkdir -p src/pages/my-page/ui
```

2. Create page component:
```typescript
// src/pages/my-page/ui/MyPage.tsx
export function MyPage() {
  return <div>My Page</div>;
}
```

3. Create index:
```typescript
// src/pages/my-page/index.ts
export { MyPage } from './ui/MyPage';
```

4. Add route:
```typescript
// src/app/App.tsx
<Route path="/my-page" element={<MyPage />} />
```

### Adding a New Component

1. Create in appropriate layer (see [FSD Guide](../architecture/FEATURE_SLICED_DESIGN.md))

2. Follow naming conventions:
```typescript
// PascalCase for components
export function MyComponent() {}

// camelCase for functions/variables
const myVariable = 'value';
```

3. Export through index:
```typescript
// index.ts
export { MyComponent } from './MyComponent';
```

### Working with Tailwind

```typescript
// Use design tokens from index.css
<div className="bg-primary text-primary-foreground">

// Responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Dark mode
<div className="bg-white dark:bg-gray-900">
```

### Using React Query

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

// Query
const { data, isLoading } = useQuery({
  queryKey: ['properties'],
  queryFn: async () => {
    const { data } = await supabase.from('properties').select('*');
    return data;
  },
});

// Mutation
const { mutate } = useMutation({
  mutationFn: async (property) => {
    await supabase.from('properties').insert(property);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['properties'] });
  },
});
```

## Performance Tips

### Development Build Performance

```bash
# Use SWC instead of Babel (already configured)
# Vite uses esbuild for fast builds

# Disable source maps in dev (if needed)
# In vite.config.ts:
build: {
  sourcemap: false
}
```

### Hot Module Replacement (HMR)

HMR is enabled by default. Changes should reflect instantly without full page reload.

If HMR isn't working:
```bash
# Restart dev server
npm run dev
```

## Testing (Future)

Testing setup will include:

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm test:watch

# Run tests with coverage
npm test:coverage

# Run E2E tests
npm test:e2e
```

## Next Steps

- Read [Coding Standards](CODING_STANDARDS.md)
- Review [Architecture Documentation](../architecture/ARCHITECTURE.md)
- Check [Contributing Guidelines](../../CONTRIBUTING.md)
- Explore [Database Schema](../architecture/DATABASE_SCHEMA.md)

## Getting Help

- **Documentation**: Check `docs/` directory
- **Issues**: [GitHub Issues](https://github.com/yourusername/haven-estate-suite/issues)
- **Questions**: Use [question template](.github/ISSUE_TEMPLATE/question.md)
- **Contributing**: See [CONTRIBUTING.md](../../CONTRIBUTING.md)

Happy coding! 🚀
