import { Property } from '@/entities/property';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(price);
}

export function formatSquareFeet(sqft: number): string {
  return sqft.toLocaleString();
}

export function getFullAddress(property: Property): string {
  return `${property.city}, ${property.state} ${property.zipCode}`;
}

export function getAgentInitials(agentName: string): string {
  return agentName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase();
}

export function getStatusColors(status: Property['status']) {
  const colors = {
    active: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
    sold: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    'off-market': 'bg-muted text-muted-foreground border-border',
  };
  return colors[status] || colors['off-market'];
}

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