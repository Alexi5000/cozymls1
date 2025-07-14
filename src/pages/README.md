# Pages Layer

## Purpose
The **Pages layer** contains full page components that represent complete application screens. Each page is a composition of widgets and features.

## What belongs here:
- Full page components
- Page-level routing
- Page-specific layouts
- Page composition logic
- Route parameters handling

## What doesn't belong here:
- Reusable UI components (belongs in shared/ui)
- Complex business logic (belongs in features)
- Data models (belongs in entities)
- Reusable widgets (belongs in widgets)

## Structure:
```
pages/
├── dashboard/
│   ├── index.ts
│   └── ui/
│       └── DashboardPage.tsx
├── properties/
│   ├── index.ts
│   └── ui/
│       └── PropertiesPage.tsx
└── ...
```

## Dependencies:
- Can import from: widgets, features, entities, shared
- Cannot import from: app, processes
- Should focus on composition rather than business logic
