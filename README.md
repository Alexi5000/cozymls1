# 🏠 Haven Estate Suite

> A modern, full-featured real estate CRM platform with MLS integration, advanced analytics, and comprehensive client management tools.

[![CI Status](https://github.com/yourusername/haven-estate-suite/workflows/CI/badge.svg)](https://github.com/yourusername/haven-estate-suite/actions)
[![Deploy Status](https://github.com/yourusername/haven-estate-suite/workflows/Deploy/badge.svg)](https://github.com/yourusername/haven-estate-suite/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-blue)](https://vitejs.dev/)

## ✨ Features

### 🎯 Core Functionality
- **Property Management** - Comprehensive MLS integration with advanced search and filtering
- **Client Management** - Track contacts, leads, and client relationships
- **Deal Pipeline** - Visualize and manage deals through customizable stages
- **Activity Timeline** - Complete history of interactions and events
- **Analytics Dashboard** - Real-time insights and market trends
- **Report Generation** - Create custom reports with data visualizations

### 🎨 User Experience
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **Dark Mode** - Beautiful dark theme support
- **Modern UI** - Built with shadcn/ui component library
- **Touch Optimized** - Mobile-first approach with touch-friendly interactions
- **Real-time Updates** - Live data synchronization across devices

### 🔐 Security & Performance
- **Secure Authentication** - Email-based authentication with row-level security
- **Data Protection** - Comprehensive RLS policies on all database tables
- **Optimized Performance** - Code splitting, lazy loading, and efficient caching
- **Type Safety** - Full TypeScript implementation
- **CI/CD Pipeline** - Automated testing, linting, and deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ ([install with nvm](https://github.com/nvm-sh/nvm))
- npm or bun package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/haven-estate-suite.git
cd haven-estate-suite

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

For detailed setup instructions, see [docs/development/SETUP.md](docs/development/SETUP.md)

## 📁 Project Structure

This project follows the **Feature-Sliced Design** (FSD) architecture pattern:

```
src/
├── app/              # Application initialization and providers
├── pages/            # Route-level pages
├── widgets/          # Complex UI sections (Header, Sidebar, etc.)
├── entities/         # Business entities (Property, Contact, Deal)
├── shared/           # Shared utilities, hooks, and components
│   ├── ui/           # Reusable UI components (Button, Card, etc.)
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript type definitions
└── integrations/     # External service integrations (Supabase)
```

Learn more about our architecture in [docs/architecture/ARCHITECTURE.md](docs/architecture/ARCHITECTURE.md)

## 🛠️ Technology Stack

### Frontend
- **React 18.3** - UI library with hooks and modern patterns
- **TypeScript 5.6** - Type-safe JavaScript
- **Vite 5** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives
- **React Router v6** - Client-side routing
- **TanStack React Query** - Data fetching and caching
- **Recharts** - Data visualization library
- **Lucide React** - Icon library

### Backend
- **Lovable Cloud** - Integrated backend platform
- **PostgreSQL** - Relational database
- **Row Level Security** - Database-level security policies
- **Real-time Subscriptions** - Live data updates
- **Edge Functions** - Serverless backend logic

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Actions** - CI/CD automation
- **Conventional Commits** - Standardized commit messages

## 📚 Documentation

- [Architecture Overview](docs/architecture/ARCHITECTURE.md)
- [Database Schema](docs/architecture/DATABASE_SCHEMA.md)
- [Feature-Sliced Design](docs/architecture/FEATURE_SLICED_DESIGN.md)
- [Development Setup](docs/development/SETUP.md)
- [Coding Standards](docs/development/CODING_STANDARDS.md)
- [Testing Guidelines](docs/development/TESTING.md)
- [Deployment Guide](docs/deployment/DEPLOYMENT.md)
- [CI/CD Documentation](docs/deployment/CICD.md)

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run type-check       # Run TypeScript compiler check
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# CI/CD (automated)
npm run build:dev        # Build for development environment
```

## 🚢 Deployment

Haven Estate Suite can be deployed via:

1. **Lovable Platform** (Recommended)
   - One-click deployment
   - Automatic HTTPS
   - Custom domain support
   - See [Deployment Guide](docs/deployment/DEPLOYMENT.md)

2. **Self-Hosted**
   - Build: `npm run build`
   - Deploy `dist/` folder to any static hosting
   - Configure environment variables

## 🔒 Security

We take security seriously. Please read our [Security Policy](SECURITY.md) for:
- Reporting vulnerabilities
- Security best practices
- RLS policy guidelines
- Authentication security

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Design system inspired by modern real estate platforms

## 📞 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/haven-estate-suite/issues)
- **Security**: [SECURITY.md](SECURITY.md)

---

<p align="center">
  Made with ❤️ for real estate professionals
</p>
