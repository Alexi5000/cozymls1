# Features Layer Migration Guide

## Overview

This migration introduces a new **Features Layer** that extracts interactive use-cases from widgets and provides clean, widget-free public APIs. The features layer sits between entities and widgets, providing reusable business logic without UI dependencies.

## Created Features

### 1. `search-property` - Property Search & Filtering
- **Purpose**: Handle property search, filtering, and data loading
- **API**: `usePropertySearch()` hook
- **Key Functions**:
  - `updateFilters()` - Update search filters
  - `search()` - Execute search with current filters
  - `loadAllProperties()` - Load all properties

### 2. `add-property` - Property Creation
- **Purpose**: Handle property creation forms and validation
- **API**: `useAddProperty()`, `usePropertyValidation()` hooks
- **Key Functions**:
  - `submitProperty()` - Submit property creation
  - `validateField()` - Validate individual fields
  - `validateForm()` - Validate entire form

### 3. `add-activity` - Activity/Task Creation
- **Purpose**: Handle activity creation, validation, and contact management
- **API**: `useAddActivity()`, `useActivityValidation()`, `useContacts()` hooks
- **Key Functions**:
  - `submitActivity()` - Submit activity creation
  - `validateField()` - Validate activity fields
  - `loadContacts()` - Load contact list

### 4. `add-agent` - Agent Management
- **Purpose**: Handle agent creation and management
- **API**: `useAddAgent()` hook
- **Key Functions**:
  - `submitAgent()` - Submit agent creation
  - `resetState()` - Reset form state

### 5. `authenticate-user` - User Authentication
- **Purpose**: Handle user login, logout, and profile management
- **API**: `useAuth()` hook
- **Key Functions**:
  - `login()` - User authentication
  - `logout()` - User logout
  - `refreshUser()` - Refresh user profile

### 6. `property-actions` - Property Interactions
- **Purpose**: Handle property-related actions (call, email, favorite, share)
- **API**: `usePropertyActions()` hook
- **Key Functions**:
  - `handleCall()` - Initiate agent call
  - `handleEmail()` - Send email to agent
  - `handleFavorite()` - Toggle favorite status
  - `handleShare()` - Share property

## Migration Path

### Before (Widget-coupled logic)
```typescript
// Logic was embedded in widgets
const AddPropertyDialog = () => {
  const [formData, setFormData] = useState({...});
  const onSubmit = async (data) => {
    // Validation and submission logic here
  };
  // ... UI rendering
};
```

### After (Feature-based logic)
```typescript
// Logic is in features layer
import { useAddProperty } from '@/features/add-property';

const AddPropertyDialog = () => {
  const { submitProperty, isSubmitting, error } = useAddProperty();
  
  const onSubmit = async (data) => {
    await submitProperty(data);
  };
  // ... UI rendering only
};
```

## Benefits

1. **Separation of Concerns**: Business logic is separated from UI components
2. **Reusability**: Features can be used across multiple widgets/pages
3. **Testability**: Business logic can be tested independently of UI
4. **Maintainability**: Changes to business logic don't affect UI structure
5. **Scalability**: New features can be added without modifying existing widgets

## File Structure

```
src/features/
├── search-property/
│   ├── api/           # API calls
│   ├── hooks/         # React hooks
│   ├── types/         # TypeScript types
│   └── index.ts       # Public API exports
├── add-property/
├── add-activity/
├── add-agent/
├── authenticate-user/
├── property-actions/
└── index.ts           # Main feature exports
```

## Usage Examples

### Property Search
```typescript
import { usePropertySearch } from '@/features/search-property';

const PropertiesPage = () => {
  const { 
    properties, 
    filters, 
    updateFilters, 
    isLoading 
  } = usePropertySearch();

  return (
    <div>
      <SearchInput 
        value={filters.search}
        onChange={(value) => updateFilters({ search: value })}
      />
      {isLoading ? <Loading /> : <PropertyList properties={properties} />}
    </div>
  );
};
```

### Property Actions
```typescript
import { usePropertyActions } from '@/features/property-actions';

const PropertyCard = ({ property }) => {
  const { handleCall, handleFavorite, isProcessing } = usePropertyActions();

  return (
    <div>
      <h3>{property.address}</h3>
      <button 
        onClick={() => handleCall(property.agent, property.id)}
        disabled={isProcessing}
      >
        Call Agent
      </button>
      <button 
        onClick={() => handleFavorite(property.id, property.isFavorite)}
        disabled={isProcessing}
      >
        {property.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};
```

## Next Steps

1. **Update Widgets**: Modify existing widgets to use the new features
2. **Remove Old Logic**: Remove business logic from widget components
3. **Add Tests**: Write unit tests for the new feature hooks
4. **Documentation**: Update component documentation to reflect new patterns
5. **Migration**: Gradually migrate all interactive use-cases to the features layer

## Public API Summary

All features export clean, widget-free APIs:

```typescript
// Main feature exports
export {
  usePropertySearch,
  useAddProperty,
  usePropertyValidation,
  useAddActivity,
  useActivityValidation,
  useContacts,
  useAddAgent,
  useAuth,
  usePropertyActions
} from '@/features';
```

The features layer provides a foundation for scalable, maintainable business logic that can be easily tested and reused across the application.
