import React, { memo } from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Property } from '@/entities/property';
import { useIsMobile } from '@/shared/hooks/use-mobile';
import { OptimizedImageV2 } from '@/shared/ui/optimized-image-v2';
import { MobileCard } from '@/shared/ui/mobile-card';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Phone,
  Mail,
  Eye,
  Heart,
  Share2
} from 'lucide-react';
import { formatPrice, getStatusColors, getAgentInitials } from '@/shared/lib/property-utils';

interface UnifiedPropertyCardProps {
  property: Property;
  onView?: (propertyId: string) => void;
  onContact?: (agentId: string) => void;
  onCall?: (agentName: string) => void;
  onEmail?: (agentName: string) => void;
  onTap?: () => void;
  className?: string;
}

export const UnifiedPropertyCard = memo(function UnifiedPropertyCard({
  property,
  onView,
  onContact,
  onCall,
  onEmail,
  onTap,
  className = ''
}: UnifiedPropertyCardProps) {
  const isMobile = useIsMobile();

  const handleViewProperty = () => {
    onView?.(property.id);
    onTap?.();
  };

  const handleContactAgent = () => {
    onContact?.(property.agent.id);
  };

  const handleCallAgent = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCall?.(property.agent.name);
  };

  const handleEmailAgent = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEmail?.(property.agent.name);
  };

  const CardComponent = isMobile ? MobileCard : Card;
  const cardProps = isMobile 
    ? { onTap: handleViewProperty, enableHaptic: true }
    : { onClick: handleViewProperty };

  return (
    <CardComponent 
      className={`property-card overflow-hidden transition-all duration-300 hover-lift group cursor-pointer animate-scale-in ${className}`}
      {...cardProps}
    >
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <OptimizedImageV2
          src={property.images[0]}
          alt={`Property at ${property.address}`}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isMobile ? 'h-48' : 'h-56'
          }`}
          loading="lazy"
        />
        
        {/* Image Overlay Actions */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white/100 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite
            }}
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white/100 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Handle share
            }}
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getStatusColors(property.status)} capitalize font-medium`}>
            {property.status}
          </Badge>
        </div>
        
        {/* Days on Market */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-black/70 text-white border-none">
            {property.daysOnMarket} days
          </Badge>
        </div>
      </div>

      <CardContent className={`${isMobile ? 'p-4' : 'p-6'}`}>
        {/* Price and Address */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className={`font-bold text-primary font-display ${isMobile ? 'text-xl' : 'text-2xl'}`}>
              {formatPrice(property.price)}
            </h3>
            <div className="text-right">
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                MLS #{property.mlsId}
              </p>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <p className={`truncate ${isMobile ? 'text-sm' : 'text-base'}`}>
              {property.address}, {property.city}
            </p>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Bed className="w-4 h-4 text-muted-foreground" />
            <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
              {property.bedrooms}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
              {property.bathrooms}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="w-4 h-4 text-muted-foreground" />
            <span className={`font-medium ${isMobile ? 'text-sm' : 'text-base'}`}>
              {property.squareFeet.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Property Type and Year */}
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline" className="capitalize">
            {property.propertyType.replace('-', ' ')}
          </Badge>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            <span className={isMobile ? 'text-xs' : 'text-sm'}>
              Built {property.yearBuilt}
            </span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
              {getAgentInitials(property.agent.name)}
            </div>
            <div>
              <p className={`font-semibold text-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
                {property.agent.name}
              </p>
              <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                Listing Agent
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            {isMobile ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3"
                  onClick={handleCallAgent}
                >
                  <Phone className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="px-3"
                  onClick={handleEmailAgent}
                >
                  <Mail className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCallAgent}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  className="btn-primary"
                  onClick={handleViewProperty}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </CardComponent>
  );
});