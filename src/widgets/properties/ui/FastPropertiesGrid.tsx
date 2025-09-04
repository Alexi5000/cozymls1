import React, { memo } from 'react';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { UnifiedPropertyCard } from '@/widgets/properties/ui/UnifiedPropertyCard';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { ErrorBoundary } from '@/shared/ui/error-boundary';

// Fast properties grid without complex virtualization
const FastPropertiesGrid = memo(() => {
  const { properties, error } = usePropertiesContext();
  const isMobile = useIsMobile();

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No properties found</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={`grid gap-6 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {properties.map((property) => (
          <UnifiedPropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </ErrorBoundary>
  );
});

FastPropertiesGrid.displayName = 'FastPropertiesGrid';

export { FastPropertiesGrid };