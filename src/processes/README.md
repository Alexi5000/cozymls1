# Processes Layer

## Purpose
The **Processes layer** contains complex business processes that span multiple pages and features. This layer orchestrates interactions between different features and entities.

## What belongs here:
- Multi-step business processes
- Complex workflows that span multiple features
- Process orchestration logic
- Cross-feature coordination
- Long-running processes

## What doesn't belong here:
- Simple feature logic (belongs in features)
- UI components (belongs in shared/ui)
- Basic entity operations (belongs in entities)
- Page-specific logic (belongs in pages)

## Examples:
- User onboarding flow
- Multi-step forms
- Complex approval workflows
- Data synchronization processes
- Cross-feature business rules

## Dependencies:
- Can import from: pages, features, entities, shared
- Cannot import from: app
- Should coordinate between features without containing UI logic
