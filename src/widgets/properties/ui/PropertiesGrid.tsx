import React, { memo, useMemo } from 'react';
import { PropertyCardDb } from './PropertyCardDb';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface PropertiesGridProps {
  properties: any[];
}

export const PropertiesGrid = memo(function PropertiesGrid({ properties }: PropertiesGridProps) {
  const isMobile = useIsMobile();

  const cards = useMemo(() => 
    properties.map((property) => (
      <PropertyCardDb key={property.id} property={property} />
    )), [properties]
  );
  
  if (isMobile) {
    return (
      <div className="space-y-4 animate-slide-up">
        {cards}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 animate-scale-in">
      {cards}
    </div>
  );
});