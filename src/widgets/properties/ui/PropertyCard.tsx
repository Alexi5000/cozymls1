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
    <Card className="property-card hover-lift group animate-scale-in">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-subtle">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm">No Image Available</p>
            </div>
          </div>
        )}
        <Badge className={`absolute top-3 right-3 ${statusColors[property.status]} shadow-soft`}>
          {property.status}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {formatPrice(property.price)}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium">{property.address}</p>
            <p className="text-xs text-muted-foreground">{property.city}, {property.state} {property.zipCode}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gradient-subtle rounded-lg">
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Bed className="h-4 w-4 text-primary" />
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Bath className="h-4 w-4 text-primary" />
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-foreground">
            <Square className="h-4 w-4 text-primary" />
            <span className="font-medium">{property.squareFeet.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Calendar className="h-3 w-3" />
          <span>{property.daysOnMarket} days on market</span>
        </div>
        
        <div className="border-t border-border pt-4">
          <p className="text-sm font-medium text-foreground mb-3">{property.agent.name}</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 hover-glow">
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button size="sm" className="flex-1 btn-primary">
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}