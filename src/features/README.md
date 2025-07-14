# Features Layer

## Purpose
The **Features layer** contains business features that implement specific user actions and interactions. Features are user-centric and represent distinct pieces of functionality.

## What belongs here:
- User action implementations
- Feature-specific business logic
- Interactive components
- User workflows
- Feature-specific state management

## What doesn't belong here:
- Data models (belongs in entities)
- Basic UI components (belongs in shared/ui)
- Page compositions (belongs in pages)
- Generic utilities (belongs in shared)

## Examples:
- Add property feature
- User authentication
- Property search
- Contact management
- Report generation

## Structure:
```
features/
├── add-property/
│   ├── index.ts
│   ├── model/
│   │   └── store.ts
│   └── ui/
│       └── AddPropertyForm.tsx
├── property-search/
│   ├── index.ts
│   ├── model/
│   │   └── search-store.ts
│   └── ui/
│       └── SearchFilters.tsx
└── ...
```

## Dependencies:
- Can import from: entities, shared
- Cannot import from: app, processes, pages, widgets
- Should focus on user interactions and business logic
