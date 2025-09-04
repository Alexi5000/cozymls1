import { Card } from '@/shared/ui/card';
import { usePropertiesContext } from '@/shared/providers/PropertiesProvider';
import { formatPrice, calculateAveragePrice, calculateAverageDaysOnMarket, getActiveListingsCount } from '@/entities/property';

export function PropertiesStats() {
  const { allProperties: properties } = usePropertiesContext();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <Card className="p-3 md:p-4 stats-card">
        <div className="text-xs md:text-sm font-medium text-white/90">Total Properties</div>
        <div className="text-lg md:text-2xl font-bold text-white">{properties.length}</div>
      </Card>
      <Card className="p-3 md:p-4 stats-card">
        <div className="text-xs md:text-sm font-medium text-white/90">Active Listings</div>
        <div className="text-lg md:text-2xl font-bold text-white">
          {getActiveListingsCount(properties)}
        </div>
      </Card>
      <Card className="p-3 md:p-4 stats-card">
        <div className="text-xs md:text-sm font-medium text-white/90">Avg. Days on Market</div>
        <div className="text-lg md:text-2xl font-bold text-white">
          {calculateAverageDaysOnMarket(properties)}
        </div>
      </Card>
      <Card className="p-3 md:p-4 stats-card">
        <div className="text-xs md:text-sm font-medium text-white/90">Avg. Price</div>
        <div className="text-lg md:text-2xl font-bold text-white">
          {formatPrice(calculateAveragePrice(properties))}
        </div>
      </Card>
    </div>
  );
}