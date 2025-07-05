import { TouchButton } from '@/shared/ui/touch-button';
import { MobileCard } from '@/shared/ui/mobile-card';
import { Badge } from '@/shared/ui/badge';
import { Property } from '@/entities/property';
import { Bed, Bath, Square, Phone, Mail, MapPin } from 'lucide-react';

interface MobilePropertyCardProps {
  property: Property;
  onCall?: () => void;
  onEmail?: () => void;
  onTap?: () => void;
}

export function MobilePropertyCard({ property, onCall, onEmail, onTap }: MobilePropertyCardProps) {
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
    <MobileCard 
      className="overflow-hidden"
      onTap={onTap}
      enableHaptic
    >
      {/* Image with Status Badge */}
      <div className="aspect-[4/3] bg-muted relative">
        {property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image Available
          </div>
        )}
        <Badge className={`absolute top-2 right-2 text-xs ${statusColors[property.status]}`}>
          {property.status}
        </Badge>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price and Address */}
        <div>
          <div className="text-xl font-bold text-foreground mb-1">
            {formatPrice(property.price)}
          </div>
          <div className="flex items-start gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <div>
              <div>{property.address}</div>
              <div>{property.city}, {property.state} {property.zipCode}</div>
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
            <span className="font-medium">{property.squareFeet.toLocaleString()}</span>
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
              onClick={onCall}
              enableHaptic
            >
              <Phone className="h-3 w-3" />
            </TouchButton>
            <TouchButton
              size="sm"
              variant="outline"
              onClick={onEmail}
              enableHaptic
            >
              <Mail className="h-3 w-3" />
            </TouchButton>
          </div>
        </div>
      </div>
    </MobileCard>
  );
}