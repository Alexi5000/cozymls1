import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';
import { Property } from '@/entities/property';
import { Bed, Bath, Square, Calendar, Phone, Mail, MapPin, Eye, Heart, Share2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
    sold: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    'off-market': 'bg-muted text-muted-foreground border-border',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="property-card hover-lift group animate-scale-in overflow-hidden">
      <div className="aspect-video bg-muted relative overflow-hidden">
        {property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.address}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
        
        {/* Status Badge */}
        <Badge className={`absolute top-3 right-3 ${statusColors[property.status]} shadow-elegant border backdrop-blur-sm font-medium`}>
          {property.status}
        </Badge>
        
        {/* Action Buttons Overlay */}
        <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button size="sm" variant="glass" className="w-8 h-8 p-0 rounded-full">
            <Heart className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="glass" className="w-8 h-8 p-0 rounded-full">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="glass-effect rounded-lg p-3 text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="text-xl font-bold font-display mb-1">
              {formatPrice(property.price)}
            </div>
            <div className="text-sm opacity-90 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {property.address}
            </div>
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-3 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
              {formatPrice(property.price)}
            </CardTitle>
            <p className="text-sm text-muted-foreground font-medium flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {property.address}
            </p>
            <p className="text-xs text-muted-foreground">{property.city}, {property.state} {property.zipCode}</p>
          </div>
          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity hover-glow">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Enhanced Property Features */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-gradient-card rounded-xl border border-border/50">
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center mb-2 shadow-elegant">
              <Bed className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">{property.bedrooms}</span>
            <span className="text-xs text-muted-foreground">Beds</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center mb-2 shadow-elegant">
              <Bath className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">{property.bathrooms}</span>
            <span className="text-xs text-muted-foreground">Baths</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center mb-2 shadow-elegant">
              <Square className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">{property.squareFeet.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">Sq Ft</span>
          </div>
        </div>
        
        {/* Market Info */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{property.daysOnMarket} days on market</span>
          </div>
          <Badge variant="secondary" className="text-xs font-medium">
            Hot Property 🔥
          </Badge>
        </div>
        
        {/* Agent Section */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-foreground">{property.agent.name}</p>
              <p className="text-xs text-muted-foreground">Licensed Agent</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant">
                <span className="text-xs font-bold text-white">{property.agent.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button size="sm" variant="outline" className="hover-glow group">
              <Phone className="h-3 w-3 mr-1 group-hover:animate-bounce" />
              Call
            </Button>
            <Button size="sm" className="btn-primary group">
              <Mail className="h-3 w-3 mr-1 group-hover:animate-bounce" />
              Email
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}