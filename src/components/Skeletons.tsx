import React from 'react';

/**
 * Basic Skeleton Pulse Box
 */
export const SkeletonBox: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`bg-stone-200 dark:bg-stone-800 animate-pulse rounded-lg ${className}`}
  />
);

/**
 * Pooja Card Loading Skeleton
 */
export const PoojaCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden flex flex-col h-full shadow-sm">
    {/* Image placeholder */}
    <div className="relative h-48 w-full bg-stone-200 dark:bg-stone-800/80 animate-pulse">
      <div className="absolute top-3 left-3 w-24 h-5 rounded-full bg-stone-300 dark:bg-stone-700/80" />
      <div className="absolute bottom-3 left-3 w-32 h-4 rounded bg-stone-300 dark:bg-stone-700/80" />
    </div>

    {/* Content placeholder */}
    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        {/* Title */}
        <SkeletonBox className="h-6 w-3/4 rounded-md" />
        {/* Hindi title */}
        <SkeletonBox className="h-4 w-1/2 rounded-md" />
        {/* Description lines */}
        <div className="space-y-1.5 pt-2">
          <SkeletonBox className="h-3.5 w-full rounded" />
          <SkeletonBox className="h-3.5 w-5/6 rounded" />
        </div>
      </div>

      {/* Highlights / Tags */}
      <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
        <div className="flex gap-2">
          <SkeletonBox className="h-5 w-20 rounded-md" />
          <SkeletonBox className="h-5 w-24 rounded-md" />
        </div>
        {/* Footer Price & Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-1">
            <SkeletonBox className="h-3 w-12 rounded" />
            <SkeletonBox className="h-5 w-20 rounded" />
          </div>
          <SkeletonBox className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Tour Card Loading Skeleton
 */
export const TourCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden flex flex-col h-full shadow-sm">
    {/* Image placeholder */}
    <div className="relative h-48 w-full bg-stone-200 dark:bg-stone-800/80 animate-pulse">
      <div className="absolute top-3 left-3 w-24 h-5 rounded-full bg-stone-300 dark:bg-stone-700/80" />
      <div className="absolute top-3 right-3 w-16 h-5 rounded-full bg-stone-300 dark:bg-stone-700/80" />
    </div>

    {/* Content */}
    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-2.5">
        <SkeletonBox className="h-6 w-5/6 rounded-md" />
        <SkeletonBox className="h-3.5 w-full rounded" />
        <SkeletonBox className="h-3.5 w-4/5 rounded" />
      </div>

      <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-4 w-4 rounded-full" />
          <SkeletonBox className="h-3.5 w-32 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBox className="h-4 w-4 rounded-full" />
          <SkeletonBox className="h-3.5 w-28 rounded" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <SkeletonBox className="h-5 w-24 rounded" />
          <SkeletonBox className="h-9 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Destination Card Loading Skeleton
 */
export const DestinationCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden flex flex-col h-full shadow-sm">
    <div className="relative h-48 w-full bg-stone-200 dark:bg-stone-800/80 animate-pulse">
      <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
        <SkeletonBox className="h-6 w-2/3 bg-stone-300 dark:bg-stone-700/80 rounded" />
        <SkeletonBox className="h-3.5 w-1/3 bg-stone-300 dark:bg-stone-700/80 rounded" />
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
      <div className="space-y-1.5">
        <SkeletonBox className="h-3.5 w-full rounded" />
        <SkeletonBox className="h-3.5 w-5/6 rounded" />
        <SkeletonBox className="h-3.5 w-4/6 rounded" />
      </div>

      <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
        <SkeletonBox className="h-4 w-28 rounded" />
        <SkeletonBox className="h-4 w-24 rounded" />
      </div>
    </div>
  </div>
);

/**
 * Blog Card Loading Skeleton
 */
export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white dark:bg-[#1C1917] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 overflow-hidden flex flex-col h-full shadow-sm">
    <div className="relative h-44 w-full bg-stone-200 dark:bg-stone-800/80 animate-pulse">
      <div className="absolute top-3 left-3 w-20 h-5 rounded-full bg-stone-300 dark:bg-stone-700/80" />
    </div>

    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
      <div className="space-y-2.5">
        <div className="flex items-center gap-3">
          <SkeletonBox className="h-3.5 w-20 rounded" />
          <SkeletonBox className="h-3.5 w-16 rounded" />
        </div>
        <SkeletonBox className="h-5 w-full rounded-md" />
        <SkeletonBox className="h-5 w-3/4 rounded-md" />
        <div className="space-y-1.5 pt-1">
          <SkeletonBox className="h-3.5 w-full rounded" />
          <SkeletonBox className="h-3.5 w-4/5 rounded" />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <SkeletonBox className="h-4 w-28 rounded" />
        <SkeletonBox className="h-4 w-4 rounded-full" />
      </div>
    </div>
  </div>
);

/**
 * Generic Grid Container for Skeletons
 */
export const SkeletonGrid: React.FC<{
  count?: number;
  type: 'pooja' | 'tour' | 'destination' | 'blog';
}> = ({ count = 6, type }) => {
  const items = Array.from({ length: count });

  const renderSkeleton = (key: number) => {
    switch (type) {
      case 'pooja':
        return <PoojaCardSkeleton key={key} />;
      case 'tour':
        return <TourCardSkeleton key={key} />;
      case 'destination':
        return <DestinationCardSkeleton key={key} />;
      case 'blog':
        return <BlogCardSkeleton key={key} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((_, index) => renderSkeleton(index))}
    </div>
  );
};
