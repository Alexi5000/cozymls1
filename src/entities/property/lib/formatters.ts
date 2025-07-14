import { Property } from "@/entities/property/model/types";

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

export function formatPropertyType(type: Property['propertyType']): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function formatStatus(status: Property['status']): string {
  return status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
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

export function getStatusColors(status: Property['status']): string {
  const colors = {
    active: 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30',
    pending: 'bg-amber-500/20 text-amber-700 border-amber-500/30',
    sold: 'bg-blue-500/20 text-blue-700 border-blue-500/30',
    'off-market': 'bg-muted text-muted-foreground border-border',
  };
  return colors[status] || colors['off-market'];
}

export function getPropertyTypeIcon(type: Property['propertyType']): string {
  const icons = {
    house: '🏠',
    apartment: '🏢',
    townhouse: '🏘️',
    duplex: '🏗️',
    land: '🌾',
    commercial: '🏪',
  };
  return icons[type] || '🏠';
}
