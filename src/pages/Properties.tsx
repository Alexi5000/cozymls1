
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/lib/mock-mls-data';
import { 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  Eye,
  Heart,
  Building2
} from 'lucide-react';

export default function Properties() {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    sold: 'bg-blue-100 text-blue-700',
    withdrawn: 'bg-gray-100 text-gray-700',
  };

  const typeColors = {
    'single-family': 'bg-blue-100 text-blue-700',
    'condo': 'bg-purple-100 text-purple-700',
    'townhome': 'bg-green-100 text-green-700',
    'multi-family': 'bg-orange-100 text-orange-700',
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Fixed function to get property image with proper URL handling
  const getPropertyImage = (property: any) => {
    if (property.images && Array.isArray(property.images) && property.images.length > 0) {
      const imageUrl = property.images[0];
      
      if (typeof imageUrl === 'string') {
        // If it's already a complete Unsplash URL, use it directly
        if (imageUrl.startsWith('https://images.unsplash.com/')) {
          return imageUrl;
        }
        
        // If it's just a photo ID, construct the full URL
        if (imageUrl.includes('photo-')) {
          return `https://images.unsplash.com/${imageUrl}?w=400&h=300&fit=crop`;
        }
        
        // Return the URL as-is for other cases
        return imageUrl;
      }
    }
    return null;
  };

  return (
    <Layout title="Properties">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Property Listings</h2>
            <p className="text-gray-600 mt-1 text-sm md:text-base">Manage your MLS property inventory</p>
          </div>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 md:px-6 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by address, MLS ID, or features..."
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <div className="text-xs md:text-sm font-medium text-gray-600">Total Properties</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">{mockProperties.length}</div>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="text-xs md:text-sm font-medium text-gray-600">Active Listings</div>
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {mockProperties.filter(p => p.status === 'active').length}
            </div>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="text-xs md:text-sm font-medium text-gray-600">Avg. Days on Market</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">
              {Math.round(mockProperties.reduce((acc, p) => acc + p.daysOnMarket, 0) / mockProperties.length)}
            </div>
          </Card>
          <Card className="p-3 md:p-4">
            <div className="text-xs md:text-sm font-medium text-gray-600">Avg. Price</div>
            <div className="text-lg md:text-2xl font-bold text-gray-900">
              {formatPrice(mockProperties.reduce((acc, p) => acc + p.price, 0) / mockProperties.length)}
            </div>
          </Card>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {mockProperties.map((property) => {
            const propertyImage = getPropertyImage(property);
            
            return (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                {/* Property Image */}
                <div className="relative h-40 md:h-48 bg-gray-100">
                  {propertyImage ? (
                    <img 
                      src={propertyImage} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.log(`Failed to load image for property ${property.id}:`, propertyImage);
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const fallbackDiv = target.nextElementSibling as HTMLElement;
                        if (fallbackDiv) {
                          fallbackDiv.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 ${propertyImage ? 'hidden' : ''}`}>
                    <Building2 className="h-12 w-12" />
                  </div>
                  <div className="absolute top-2 md:top-3 left-2 md:left-3">
                    <Badge className={`${statusColors[property.status]} font-medium text-xs`}>
                      {property.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-2 md:top-3 right-2 md:right-3 flex gap-1 md:gap-2">
                    <Button size="icon" variant="secondary" className="h-7 w-7 md:h-8 md:w-8 bg-white/90 hover:bg-white">
                      <Heart className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="h-7 w-7 md:h-8 md:w-8 bg-white/90 hover:bg-white">
                      <Eye className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>

                <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg md:text-xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{property.title}</p>
                    </div>
                    <Badge className={`${typeColors[property.type]} font-medium text-xs whitespace-nowrap`}>
                      {property.type.replace('-', ' ')}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 p-3 md:p-6">
                  <div className="space-y-2 md:space-y-3">
                    {/* Address */}
                    <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 text-gray-400 flex-shrink-0" />
                      <span className="truncate">
                        {property.address.street}, {property.address.city}, {property.address.state}
                      </span>
                    </div>

                    {/* Property Details */}
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                        <span>{property.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                        <span className="hidden sm:inline">{property.squareFeet?.toLocaleString()} sqft</span>
                        <span className="sm:hidden">{Math.round((property.squareFeet || 0) / 1000)}k</span>
                      </div>
                    </div>

                    {/* MLS ID and Days on Market */}
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-gray-500 truncate">MLS: {property.mlsId}</span>
                      <div className="flex items-center gap-1 text-gray-500 flex-shrink-0">
                        <Calendar className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{property.daysOnMarket}d</span>
                      </div>
                    </div>

                    {/* Listing Agent */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500">Listed by</p>
                      <p className="text-xs md:text-sm font-medium text-gray-700 truncate">{property.listingAgent.name}</p>
                      <p className="text-xs text-gray-500 truncate">{property.listingAgent.brokerage}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
