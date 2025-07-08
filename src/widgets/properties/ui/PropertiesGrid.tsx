import React, { memo, useCallback, useMemo } from 'react';
import { PropertyCard } from './PropertyCard';
import { MobilePropertyCard } from './MobilePropertyCard';
import { Property } from '@/entities/property';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface PropertiesGridProps {
  properties: Property[];
}

export const PropertiesGrid = memo(function PropertiesGrid({ properties }: PropertiesGridProps) {
  const isMobile = useIsMobile();
  
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

  // Memoized mobile cards to prevent unnecessary re-renders
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
  
  if (isMobile) {
    return (
      <div className="space-y-4 animate-slide-up">
        {mobileCards}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in">
      {desktopCards}
    </div>
  );
});