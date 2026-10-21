import React from 'react';

export const PropertyDetailSkeleton: React.FC = () => {
  return (
    <div 
      className="space-y-8 animate-in fade-in duration-200"
      aria-busy="true"
      aria-label="Loading property details"
      data-testid="property-detail-skeleton"
    >
      {/* Mobile Price Banner Skeleton */}
      <div className="sm:hidden flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200">
        <div className="space-y-1.5">
          <div className="w-16 h-3 rounded skeleton-shimmer" />
          <div className="w-28 h-6 rounded skeleton-shimmer" />
        </div>
        <div className="w-20 h-6 rounded-md skeleton-shimmer" />
      </div>

      {/* Photo Gallery Skeleton */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="w-36 h-4 rounded skeleton-shimmer" />
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-14 sm:w-16 h-6 rounded-md skeleton-shimmer" />
            ))}
          </div>
        </div>

        {/* Gallery Grid Skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 rounded-2xl overflow-hidden">
          {/* Main feature image skeleton */}
          <div className="col-span-2 row-span-2 h-64 sm:h-80 rounded-xl skeleton-shimmer" />
          {/* 4 thumbnail skeletons */}
          <div className="h-32 sm:h-38 rounded-xl skeleton-shimmer" />
          <div className="h-32 sm:h-38 rounded-xl skeleton-shimmer" />
          <div className="h-32 sm:h-38 rounded-xl skeleton-shimmer hidden md:block" />
          <div className="h-32 sm:h-38 rounded-xl skeleton-shimmer hidden md:block" />
        </div>
      </div>

      {/* Key Facts & Specifications Skeleton */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-4">
        <div className="w-44 h-4 rounded skeleton-shimmer" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="p-3 bg-white rounded-xl border border-stone-200/60 space-y-2">
              <div className="w-14 h-2.5 rounded skeleton-shimmer" />
              <div className="w-20 h-4 rounded skeleton-shimmer" />
            </div>
          ))}
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-3">
        <div className="w-40 h-4 rounded skeleton-shimmer" />
        <div className="space-y-2 pt-1">
          <div className="w-full h-3.5 rounded skeleton-shimmer" />
          <div className="w-[96%] h-3.5 rounded skeleton-shimmer" />
          <div className="w-[91%] h-3.5 rounded skeleton-shimmer" />
          <div className="w-[72%] h-3.5 rounded skeleton-shimmer" />
        </div>
      </div>

      {/* Amenities Chips Skeleton */}
      <div className="space-y-3">
        <div className="w-44 h-4 rounded skeleton-shimmer" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-9 rounded-lg skeleton-shimmer" />
          ))}
        </div>
      </div>

      {/* Map Skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="w-48 h-4 rounded skeleton-shimmer" />
          <div className="w-24 h-3 rounded skeleton-shimmer" />
        </div>
        <div className="w-full h-56 sm:h-64 rounded-2xl skeleton-shimmer" />
      </div>

      {/* Similar Properties Skeleton */}
      <div className="pt-6 border-t border-stone-200 space-y-4">
        <div className="flex justify-between items-center">
          <div className="w-44 h-4 rounded skeleton-shimmer" />
          <div className="w-20 h-3 rounded skeleton-shimmer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex gap-3">
              <div className="w-16 h-16 rounded-lg skeleton-shimmer shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="w-14 h-2.5 rounded skeleton-shimmer" />
                <div className="w-24 h-3.5 rounded skeleton-shimmer" />
                <div className="w-16 h-3 rounded skeleton-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
