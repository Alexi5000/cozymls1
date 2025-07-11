import React, { memo, useCallback, useMemo } from 'react';
import { PropertyCard } from './PropertyCard';
import { MobilePropertyCard } from './MobilePropertyCard';
import { Property } from '@/entities/property';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { VirtualList } from '@/shared/ui/virtual-list';
import { useMobilePerformance } from '@/shared/hooks/use-mobile-performance';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { Alert, AlertDescription } from '@/shared/ui/alert';

export const PropertiesGrid = memo(function PropertiesGrid() {
  const { properties, error } = usePropertiesContext();
  const isMobile = useIsMobile();
  const { shouldUseVirtualization } = useMobilePerformance();
  
  // Memoized event handlers to prevent unnecessary re-renders
  const handleCall = useCallback((agentName: string) => {
    console.log('Call:', agentName);
  }, []);

  const handleEmail = useCallback((agentName: string) => {
    console.log('Email:', agentName);
  }, []);

  const handleTap = useCallback((propertyId: string) => {
    console.log('View property:', propertyId);
  }, []);

  // Render item function for virtual list
  const renderMobileItem = useCallback((property: Property, index: number) => (
    <MobilePropertyCard 
      key={property.id} 
      property={property}
      onCall={() => handleCall(property.agent.name)}
      onEmail={() => handleEmail(property.agent.name)}
      onTap={() => handleTap(property.id)}
    />
  ), [handleCall, handleEmail, handleTap]);

  // Memoized mobile cards for non-virtual rendering
  const mobileCards = useMemo(() => 
    properties.map((property) => (
      <MobilePropertyCard 
        key={property.id} 
        property={property}
        onCall={() => handleCall(property.agent.name)}
        onEmail={() => handleEmail(property.agent.name)}
        onTap={() => handleTap(property.id)}
      />
    )), [properties, handleCall, handleEmail, handleTap]
  );

  // Memoized desktop cards to prevent unnecessary re-renders
  const desktopCards = useMemo(() => 
    properties.map((property) => (
      <PropertyCard key={property.id} property={property} />
    )), [properties]
  );
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No properties found matching your criteria.</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      {isMobile ? (
        shouldUseVirtualization && properties.length > 20 ? (
          <VirtualList
            items={properties}
            itemHeight={280}
            height={window.innerHeight - 200}
            renderItem={renderMobileItem}
            className="space-y-4 animate-slide-up"
          />
        ) : (
          <div className="space-y-4 animate-slide-up">
            {mobileCards}
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in">
          {desktopCards}
        </div>
      )}
    </ErrorBoundary>
  );
});