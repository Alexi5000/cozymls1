import React, { memo, useCallback, useMemo } from 'react';
import { UnifiedPropertyCard } from "@/widgets/properties/ui/UnifiedPropertyCard";
import { Property } from '@/entities/property';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { VirtualList } from '@/shared/ui/virtual-list';
import { OptimizedList, SimpleOptimizedList } from '@/shared/ui/optimized-list';
import { useMobilePerformance } from '@/shared/hooks/use-mobile-performance';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { useRenderOptimization } from '@/shared/hooks/use-render-optimization';
import { ErrorBoundary } from '@/shared/ui/error-boundary';
import { Alert, AlertDescription } from '@/shared/ui/alert';

export const PropertiesGrid = memo(function PropertiesGrid() {
  const { properties, error } = usePropertiesContext();
  const isMobile = useIsMobile();
  const { shouldUseVirtualization } = useMobilePerformance();
  const { measureFunction } = useRenderOptimization('PropertiesGrid');
  
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

  // Unified render function for all viewports
  const renderPropertyCard = useCallback((property: Property, index: number) => (
    <UnifiedPropertyCard 
      key={property.id}
      property={property}
      onCall={() => handleCall(property.agent.name)}
      onEmail={() => handleEmail(property.agent.name)}
      onTap={() => handleTap(property.id)}
      onView={handleTap}
      onContact={(agentId) => console.log('Contact agent:', agentId)}
    />
  ), [handleCall, handleEmail, handleTap]);

  // Memoized property cards for standard rendering
  const propertyCards = useMemo(() => 
    properties.map((property) => renderPropertyCard(property, 0)), 
    [properties, renderPropertyCard]
  );

  // Use optimized list for better performance with large datasets
  const shouldUseOptimizedList = properties.length > 50;
  
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
      {shouldUseVirtualization && properties.length > 20 ? (
        <OptimizedList
          items={properties}
          renderItem={renderPropertyCard}
          itemHeight={isMobile ? 320 : 380}
          height={window.innerHeight - 200}
          className={isMobile ? "space-y-4 animate-slide-up" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in"}
          getItemKey={(property) => property.id}
        />
      ) : shouldUseOptimizedList ? (
        <SimpleOptimizedList
          items={properties}
          renderItem={renderPropertyCard}
          className={isMobile ? "space-y-4 animate-slide-up" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in"}
          getItemKey={(property) => property.id}
        />
      ) : (
        <div className={isMobile ? "space-y-4 animate-slide-up" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in"}>
          {propertyCards}
        </div>
      )}
    </ErrorBoundary>
  );
});