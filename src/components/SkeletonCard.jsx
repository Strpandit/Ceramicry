import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white border rounded-lg p-3">
      <div className="bg-gray-300 h-60 w-full rounded mb-2" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-1" />
      <div className="h-4 bg-gray-300 rounded w-1/2" />
    </div>
  );
};

export default SkeletonCard;