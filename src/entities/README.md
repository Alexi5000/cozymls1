# Entities Layer

## Purpose
The **Entities layer** contains business entities that represent core domain objects and their associated operations. This layer defines the data models and business rules.

## What belongs here:
- Domain models and types
- Entity-specific business logic
- Data transformation utilities
- Entity validation rules
- API schemas and adapters

## What doesn't belong here:
- UI components (belongs in shared/ui)
- Feature-specific logic (belongs in features)
- Application-wide utilities (belongs in shared)
- Page-specific logic (belongs in pages)

## Examples:
- Property entity
- User entity
- Deal entity
- Contact entity
- Activity entity

## Structure:
```
entities/
├── property/
│   ├── index.ts
│   ├── model/
│   │   ├── types.ts
│   │   ├── mock-data.ts
│   │   └── validation.ts
│   └── lib/
│       └── property-utils.ts
├── user/
│   ├── index.ts
│   └── model/
│       └── types.ts
└── ...
```

## Dependencies:
- Can import from: shared
- Cannot import from: app, processes, pages, widgets, features
- Should focus on domain logic and data models
