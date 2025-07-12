import React, { memo, useCallback } from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { OptimizedImageV2 } from '@/shared/ui/optimized-image-v2';
import { createOptimizedMemo, useStableCallback } from '@/shared/hooks/use-optimized-memo';
import { Property } from '@/entities/property';
import { MapPin, Bed, Bath, Square, DollarSign, Phone, Mail } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface OptimizedPropertyCardProps {
  property: Property;
  onView?: (id: string) => void;
  onContact?: (agentId: string) => void;
  className?: string;
}

const OptimizedPropertyCard = createOptimizedMemo(function OptimizedPropertyCard({
  property,
  onView,
  onContact,
  className
}: OptimizedPropertyCardProps) {
  // Stable callbacks to prevent unnecessary re-renders
  const handleView = useStableCallback(() => {
    onView?.(property.id);
  }, [property.id, onView]);

  const handleContact = useStableCallback(() => {
    onContact?.(property.agent.id);
  }, [property.agent.id, onContact]);

  // Memoized price formatting
  const formattedPrice = React.useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(property.price);
  }, [property.price]);

  // Memoized status badge variant
  const statusVariant = React.useMemo(() => {
    switch (property.status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'sold':
        return 'outline';
      case 'off-market':
        return 'destructive';
      default:
        return 'default';
    }
  }, [property.status]);

  return (
    <Card className={cn("hover-lift group cursor-pointer transition-all duration-300", className)}>
      <div className="relative overflow-hidden rounded-t-lg">
        <OptimizedImageV2
          src={property.images[0]}
          alt={`Property at ${property.address}`}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          placeholder="blur"
          quality={80}
        />
        
        {/* Status badge */}
        <Badge 
          variant={statusVariant}
          className="absolute top-3 left-3 capitalize"
        >
          {property.status === 'off-market' ? 'Off Market' : property.status}
        </Badge>

        {/* Price */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg font-bold">
          {formattedPrice}
        </div>
      </div>

      <CardContent className="p-4">
        {/* Property details */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {property.address}
          </h3>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="line-clamp-1">{property.city}, {property.state} {property.zipCode}</span>
          </div>

          {/* Property features */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.squareFeet.toLocaleString()}</span>
            </div>
          </div>

          {/* Agent info */}
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary">
                  {property.agent.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{property.agent.name}</p>
                <p className="text-xs text-muted-foreground">{property.agent.phone}</p>
              </div>
            </div>

            <div className="flex space-x-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleContact}
                className="h-8 w-8 p-0"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleContact}
                className="h-8 w-8 p-0"
              >
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* View button */}
          <Button 
            className="w-full mt-3"
            variant="outline"
            onClick={handleView}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for better performance
  return (
    prevProps.property.id === nextProps.property.id &&
    prevProps.property.price === nextProps.property.price &&
    prevProps.property.status === nextProps.property.status &&
    prevProps.onView === nextProps.onView &&
    prevProps.onContact === nextProps.onContact
  );
}, 'OptimizedPropertyCard');

export { OptimizedPropertyCard };