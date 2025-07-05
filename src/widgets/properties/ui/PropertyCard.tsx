import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Property } from '@/entities/property';
import { Bed, Bath, Square, Calendar, Phone, Mail } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    sold: 'bg-blue-100 text-blue-800',
    'off-market': 'bg-gray-100 text-gray-800',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video bg-gray-200 relative">
        {property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${statusColors[property.status]}`}>
          {property.status}
        </Badge>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold text-gray-900">
              {formatPrice(property.price)}
            </CardTitle>
            <p className="text-sm text-gray-600">{property.address}</p>
            <p className="text-xs text-gray-500">{property.city}, {property.state} {property.zipCode}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Bed className="h-4 w-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Bath className="h-4 w-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Square className="h-4 w-4" />
            <span>{property.squareFeet.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Calendar className="h-3 w-3" />
          <span>{property.daysOnMarket} days on market</span>
        </div>
        
        <div className="border-t pt-4">
          <p className="text-sm font-medium text-gray-900 mb-1">{property.agent.name}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}