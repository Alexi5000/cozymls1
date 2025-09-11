import React, { memo, useCallback, useMemo, useState } from 'react';
import { TouchButton } from '@/shared/ui/touch-button';
import { MobileCard } from '@/shared/ui/mobile-card';
import { Badge } from '@/shared/ui/badge';
import { Skeleton } from '@/shared/ui/skeleton';
import { Property } from '@/entities/property';
import { Bed, Bath, Square, Phone, Mail, MapPin, ImageOff } from 'lucide-react';
import { formatPrice, getFullAddress, getStatusColors } from '@/shared/lib/property-utils';
import { usePropertyActions } from '@/shared/hooks/use-property-actions';

interface MobilePropertyCardProps {
  property: Property;
  onCall?: () => void;
  onEmail?: () => void;
  onTap?: () => void;
}

export const MobilePropertyCard = memo(function MobilePropertyCard({ property, onCall, onEmail, onTap }: MobilePropertyCardProps) {
  const [imageLoading, setImageLoading] = useState(false); // Instant loading
  const [imageError, setImageError] = useState(false);
  const propertyActions = usePropertyActions();

  // Memoized values for performance
  const formattedPrice = useMemo(() => formatPrice(property.price), [property.price]);
  const fullAddress = useMemo(() => getFullAddress(property), [property]);
  const formattedSquareFeet = useMemo(() => 
    property.squareFeet.toLocaleString(),
    [property.squareFeet]
  );
  const statusColor = useMemo(() => getStatusColors(property.status), [property.status]);

  // Image handlers
  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  return (
    <MobileCard 
      className="overflow-hidden"
      onTap={onTap}
      enableHaptic
    >
      {/* Image with Status Badge */}
      <div className="aspect-[4/3] bg-muted relative">
        {/* Loading skeleton */}
        {imageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        {property.images.length > 0 && !imageError ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gradient-subtle">
            <div className="text-center">
              <ImageOff className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-xs">{imageError ? 'Failed to load' : 'No Image'}</p>
            </div>
          </div>
        )}
        <Badge className={`absolute top-2 right-2 text-xs ${statusColor}`}>
          {property.status}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price and Address */}
        <div>
          <div className="text-xl font-bold text-foreground mb-1">
            {formattedPrice}
          </div>
          <div className="flex items-start gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <div>
              <div>{property.address}</div>
              <div>{fullAddress}</div>
            </div>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="flex items-center justify-between py-2 border-y border-border">
          <div className="flex items-center gap-1 text-sm">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-muted-foreground">bed</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-muted-foreground">bath</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{formattedSquareFeet}</span>
            <span className="text-muted-foreground">sqft</span>
          </div>
        </div>
        
        {/* Agent and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">{property.agent.name}</div>
            <div className="text-xs text-muted-foreground">{property.daysOnMarket} days on market</div>
          </div>
          <div className="flex gap-2">
            <TouchButton
              size="sm"
              variant="outline"
              onClick={() => onCall ? onCall() : propertyActions.handleCall(property.agent.name, property.agent.phone)}
              enableHaptic
            >
              <Phone className="h-3 w-3" />
            </TouchButton>
            <TouchButton
              size="sm"
              variant="outline"
              onClick={() => onEmail ? onEmail() : propertyActions.handleEmail(property.agent.name, property.agent.email)}
              enableHaptic
            >
              <Mail className="h-3 w-3" />
            </TouchButton>
          </div>
        </div>
      </div>
    </MobileCard>
  );
});