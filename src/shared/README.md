# Shared Layer

## Purpose
The **Shared layer** contains reusable code that can be used across all other layers. This includes UI components, utilities, constants, and other shared resources.

## What belongs here:
- Reusable UI components
- Utility functions
- Constants and configurations
- Common types and interfaces
- Shared hooks and providers
- API clients and services

## What doesn't belong here:
- Business logic (belongs in features/entities)
- Page-specific code (belongs in pages)
- Feature-specific code (belongs in features)
- Application initialization (belongs in app)

## Structure:
```
shared/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   └── ...
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   └── ...
├── hooks/
│   ├── use-debounce.ts
│   └── ...
├── types/
│   ├── common.ts
│   └── ...
└── providers/
    └── ...
```

## Dependencies:
- Cannot import from any other layer
- Should be completely independent
- Must be reusable across the application
