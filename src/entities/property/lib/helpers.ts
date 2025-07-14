import { Property } from "@/entities/property/model/types";

export function calculateAveragePrice(properties: Property[]): number {
  if (properties.length === 0) return 0;
  return properties.reduce((acc, p) => acc + p.price, 0) / properties.length;
}

export function calculateAverageDaysOnMarket(properties: Property[]): number {
  if (properties.length === 0) return 0;
  return Math.round(properties.reduce((acc, p) => acc + p.daysOnMarket, 0) / properties.length);
}

export function getActiveListingsCount(properties: Property[]): number {
  return properties.filter(p => p.status === 'active').length;
}

export function getPendingListingsCount(properties: Property[]): number {
  return properties.filter(p => p.status === 'pending').length;
}

export function getSoldListingsCount(properties: Property[]): number {
  return properties.filter(p => p.status === 'sold').length;
}

export function getListingsByPropertyType(properties: Property[], type: Property['propertyType']): Property[] {
  return properties.filter(p => p.propertyType === type);
}

export function getListingsByStatus(properties: Property[], status: Property['status']): Property[] {
  return properties.filter(p => p.status === status);
}

export function getListingsByAgent(properties: Property[], agentId: string): Property[] {
  return properties.filter(p => p.agent.id === agentId);
}

export function getListingsByPriceRange(properties: Property[], minPrice: number, maxPrice: number): Property[] {
  return properties.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

export function getListingsByBedrooms(properties: Property[], bedrooms: number): Property[] {
  return properties.filter(p => p.bedrooms === bedrooms);
}

export function getListingsByBathrooms(properties: Property[], bathrooms: number): Property[] {
  return properties.filter(p => p.bathrooms === bathrooms);
}

export function getListingsBySquareFeet(properties: Property[], minSqft: number, maxSqft: number): Property[] {
  return properties.filter(p => p.squareFeet >= minSqft && p.squareFeet <= maxSqft);
}

export function getListingsByDaysOnMarket(properties: Property[], maxDays: number): Property[] {
  return properties.filter(p => p.daysOnMarket <= maxDays);
}

export function getListingsByLocation(properties: Property[], city?: string, state?: string, zipCode?: string): Property[] {
  return properties.filter(p => {
    if (city && p.city.toLowerCase() !== city.toLowerCase()) return false;
    if (state && p.state.toLowerCase() !== state.toLowerCase()) return false;
    if (zipCode && p.zipCode !== zipCode) return false;
    return true;
  });
}

export function sortPropertiesByPrice(properties: Property[], ascending: boolean = true): Property[] {
  return [...properties].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
}

export function sortPropertiesByDaysOnMarket(properties: Property[], ascending: boolean = true): Property[] {
  return [...properties].sort((a, b) => ascending ? a.daysOnMarket - b.daysOnMarket : b.daysOnMarket - a.daysOnMarket);
}

export function sortPropertiesByListingDate(properties: Property[], ascending: boolean = true): Property[] {
  return [...properties].sort((a, b) => {
    const dateA = new Date(a.listingDate).getTime();
    const dateB = new Date(b.listingDate).getTime();
    return ascending ? dateA - dateB : dateB - dateA;
  });
}

export function sortPropertiesBySquareFeet(properties: Property[], ascending: boolean = true): Property[] {
  return [...properties].sort((a, b) => ascending ? a.squareFeet - b.squareFeet : b.squareFeet - a.squareFeet);
}

export function getPropertyStats(properties: Property[]) {
  return {
    total: properties.length,
    active: getActiveListingsCount(properties),
    pending: getPendingListingsCount(properties),
    sold: getSoldListingsCount(properties),
    averagePrice: calculateAveragePrice(properties),
    averageDaysOnMarket: calculateAverageDaysOnMarket(properties),
    priceRange: {
      min: Math.min(...properties.map(p => p.price)),
      max: Math.max(...properties.map(p => p.price)),
    },
    propertyTypes: {
      house: getListingsByPropertyType(properties, 'house').length,
      apartment: getListingsByPropertyType(properties, 'apartment').length,
      townhouse: getListingsByPropertyType(properties, 'townhouse').length,
      duplex: getListingsByPropertyType(properties, 'duplex').length,
      land: getListingsByPropertyType(properties, 'land').length,
      commercial: getListingsByPropertyType(properties, 'commercial').length,
    },
  };
}

export function isPropertyNew(property: Property, daysThreshold: number = 7): boolean {
  const now = new Date();
  const listingDate = new Date(property.listingDate);
  const diffInDays = Math.floor((now.getTime() - listingDate.getTime()) / (1000 * 60 * 60 * 24));
  return diffInDays <= daysThreshold;
}

export function isPropertyPriceReduced(property: Property, originalPrice?: number): boolean {
  if (!originalPrice) return false;
  return property.price < originalPrice;
}

export function getPropertyMarketStatus(property: Property): 'hot' | 'normal' | 'cold' {
  if (property.daysOnMarket <= 7) return 'hot';
  if (property.daysOnMarket <= 30) return 'normal';
  return 'cold';
}

export function calculatePropertyPricePerSquareFoot(property: Property): number {
  return Math.round(property.price / property.squareFeet);
}

export function getPropertyFeaturesList(property: Property): string[] {
  return property.features || [];
}

export function hasPropertyFeature(property: Property, feature: string): boolean {
  return property.features?.includes(feature) || false;
}
