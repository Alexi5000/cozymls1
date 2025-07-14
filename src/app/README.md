# App Layer

## Purpose
The **App layer** contains the application initialization logic and global providers. This is the highest level of the Feature-Sliced Design architecture.

## What belongs here:
- Application root component
- Global providers (theme, routing, store)
- Application-wide configuration
- Global error boundaries
- App-level styles and initialization

## What doesn't belong here:
- Business logic (belongs in features/entities)
- UI components (belongs in shared/ui)
- Page components (belongs in pages)
- Feature-specific code (belongs in features)

## Dependencies:
- Can import from all other layers
- Should contain minimal business logic
- Focuses on composition and initialization
