import React from "react";

function SkeletonLoader({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="h-64 md:h-72 bg-gray-200 dark:bg-gray-600" />

          {/* Content Skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
            <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-1/3" />
            <div className="h-10 bg-gray-200 dark:bg-gray-600 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonLoader;
