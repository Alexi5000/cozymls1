import { Card } from '@/shared/ui/card';
import { Property } from '@/entities/property';

interface PropertiesStatsProps {
  properties: Property[];
}

export function PropertiesStats({ properties }: PropertiesStatsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-gray-600">Total Properties</div>
        <div className="text-lg md:text-2xl font-bold text-gray-900">{properties.length}</div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-gray-600">Active Listings</div>
        <div className="text-lg md:text-2xl font-bold text-green-600">
          {properties.filter(p => p.status === 'active').length}
        </div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-gray-600">Avg. Days on Market</div>
        <div className="text-lg md:text-2xl font-bold text-gray-900">
          {Math.round(properties.reduce((acc, p) => acc + p.daysOnMarket, 0) / properties.length)}
        </div>
      </Card>
      <Card className="p-3 md:p-4">
        <div className="text-xs md:text-sm font-medium text-gray-600">Avg. Price</div>
        <div className="text-lg md:text-2xl font-bold text-gray-900">
          {formatPrice(properties.reduce((acc, p) => acc + p.price, 0) / properties.length)}
        </div>
      </Card>
    </div>
  );
}