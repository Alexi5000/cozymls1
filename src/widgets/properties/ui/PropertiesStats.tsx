import { Card } from '@/shared/ui/card';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { formatPrice, calculateAveragePrice, calculateAverageDaysOnMarket, getActiveListingsCount } from '@/shared/lib/property-utils';

export function PropertiesStats() {
  const { allProperties: properties } = usePropertiesContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-muted-foreground">Total Properties</div>
        <div className="text-lg md:text-2xl font-bold text-foreground">{properties.length}</div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-muted-foreground">Active Listings</div>
        <div className="text-lg md:text-2xl font-bold text-primary">
          {getActiveListingsCount(properties)}
        </div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-muted-foreground">Avg. Days on Market</div>
        <div className="text-lg md:text-2xl font-bold text-foreground">
          {calculateAverageDaysOnMarket(properties)}
        </div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-muted-foreground">Avg. Price</div>
        <div className="text-lg md:text-2xl font-bold text-foreground">
          {formatPrice(calculateAveragePrice(properties))}
        </div>
      </Card>
    </div>
  );
}