# Contributing to Haven Estate Suite

Thank you for your interest in contributing to Haven Estate Suite! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/haven-estate-suite.git
   cd haven-estate-suite
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   - Copy `.env.example` to `.env` (if applicable)
   - Configure required environment variables
5. **Start development server**:
   ```bash
   npm run dev
   ```

For detailed setup instructions, see [docs/development/SETUP.md](docs/development/SETUP.md).

## Development Workflow

### Branch Naming

Use descriptive branch names following this convention:

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring
- `test/description` - Test additions/changes
- `chore/description` - Maintenance tasks

Examples:
- `feature/add-property-filters`
- `fix/login-validation-error`
- `docs/update-api-reference`

### Workflow Steps

1. **Create a new branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [coding standards](docs/development/CODING_STANDARDS.md)

3. **Commit your changes** using [Conventional Commits](#commit-guidelines)

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** against the `main` branch

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that don't affect code meaning (formatting, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```
feat(properties): add advanced search filters

Add filtering by price range, bedrooms, and location with real-time results.

Closes #123
```

```
fix(auth): resolve login redirect loop

Users were getting stuck in redirect loop after successful authentication.
Added proper session state check before redirecting.

Fixes #456
```

## Pull Request Process

1. **Ensure CI passes**: All automated checks must pass
2. **Update documentation**: If you change APIs or add features
3. **Add tests**: For new features or bug fixes
4. **Update CHANGELOG.md**: Add entry under "Unreleased" section
5. **Request review**: Assign at least one reviewer
6. **Address feedback**: Make requested changes promptly
7. **Squash commits**: Before merging (if requested)

### PR Title Format

Follow the same convention as commit messages:

```
feat(properties): add advanced search filters
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass locally
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Avoid `any` types - use proper typing
- Use interfaces for object shapes
- Export types alongside components

### React

- Use functional components with hooks
- Follow Feature-Sliced Design architecture
- Keep components small and focused
- Use custom hooks for reusable logic
- Implement proper error boundaries

### File Structure

Follow Feature-Sliced Design pattern:

```
src/
├── app/          # Application initialization
├── pages/        # Route pages
├── widgets/      # Complex UI blocks
├── entities/     # Business entities
└── shared/       # Shared utilities and components
```

For detailed standards, see [docs/development/CODING_STANDARDS.md](docs/development/CODING_STANDARDS.md).

### Code Formatting

- Use Prettier for code formatting
- Run `npm run format` before committing
- Configure your editor to format on save

### Import Order

1. React and external libraries
2. Internal absolute imports (`@/...`)
3. Relative imports
4. Type imports
5. CSS/style imports

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Button } from '@/shared/ui/button';
import { useAuth } from '@/shared/hooks/use-auth';

import { PropertyCard } from './PropertyCard';
import type { Property } from './types';

import './styles.css';
```

## Testing Guidelines

- Write tests for new features
- Maintain or improve code coverage
- Test edge cases and error scenarios
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)

See [docs/development/TESTING.md](docs/development/TESTING.md) for detailed testing guidelines.

## Questions or Issues?

- **Bug reports**: Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
- **Feature requests**: Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
- **Questions**: Use the [question template](.github/ISSUE_TEMPLATE/question.md)
- **Security issues**: See [SECURITY.md](SECURITY.md)

## Recognition

Contributors will be recognized in our [CHANGELOG.md](CHANGELOG.md) and project documentation.

Thank you for contributing to Haven Estate Suite! 🏠✨
