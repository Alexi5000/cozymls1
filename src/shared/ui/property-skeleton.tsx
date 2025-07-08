import React, { memo } from 'react';
import { Skeleton } from '@/shared/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';

export const PropertyCardSkeleton = memo(function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="aspect-video w-full" />
      
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-40" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Property features skeleton */}
        <div className="grid grid-cols-3 gap-3 mb-4 p-4 bg-muted/50 rounded-xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
        
        {/* Market info skeleton */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted/30 rounded-lg">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        
        {/* Agent section skeleton */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Skeleton className="h-8 rounded-md" />
            <Skeleton className="h-8 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

export const MobilePropertyCardSkeleton = memo(function MobilePropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <Skeleton className="aspect-[4/3] w-full" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Price and address */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        
        {/* Property details */}
        <div className="flex items-center justify-between py-2 border-y border-border">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
            </div>
          ))}
        </div>
        
        {/* Agent and actions */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </div>
    </Card>
  );
});

export const PropertiesGridSkeleton = memo(function PropertiesGridSkeleton({ 
  count = 6, 
  mobile = false 
}: { 
  count?: number; 
  mobile?: boolean; 
}) {
  const SkeletonComponent = mobile ? MobilePropertyCardSkeleton : PropertyCardSkeleton;
  
  if (mobile) {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonComponent key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
});