import { PropertyCard } from './PropertyCard';
import { MobilePropertyCard } from './MobilePropertyCard';
import { Property } from '@/entities/property';
import { useIsMobile } from '@/shared/hooks/use-mobile';

interface PropertiesGridProps {
  properties: Property[];
}

export function PropertiesGrid({ properties }: PropertiesGridProps) {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="space-y-4">
        {properties.map((property) => (
          <MobilePropertyCard 
            key={property.id} 
            property={property}
            onCall={() => console.log('Call:', property.agent.name)}
            onEmail={() => console.log('Email:', property.agent.name)}
            onTap={() => console.log('View property:', property.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}