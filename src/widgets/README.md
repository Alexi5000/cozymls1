# Widgets Layer

## Purpose
The **Widgets layer** contains composite UI components that combine multiple features and entities into cohesive, reusable units. Widgets are larger than basic UI components but smaller than full pages.

## What belongs here:
- Composite UI components
- Feature combinations
- Reusable page sections
- Complex UI layouts
- Multi-feature compositions

## What doesn't belong here:
- Simple UI components (belongs in shared/ui)
- Full page components (belongs in pages)
- Business logic (belongs in features)
- Data models (belongs in entities)

## Examples:
- Property listing grid
- Dashboard stats section
- Activity feed
- User profile card
- Navigation components

## Structure:
```
widgets/
├── properties/
│   ├── index.ts
│   └── ui/
│       ├── PropertiesGrid.tsx
│       └── PropertyCard.tsx
├── dashboard/
│   ├── index.ts
│   └── ui/
│       └── StatsSection.tsx
└── ...
```

## Dependencies:
- Can import from: features, entities, shared
- Cannot import from: app, processes, pages
- Should focus on UI composition and presentation
