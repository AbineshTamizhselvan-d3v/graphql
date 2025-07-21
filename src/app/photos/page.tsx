'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PHOTOS } from '@/graphql/queries';

export default function PhotosPage() {
  const [albumId, setAlbumId] = useState<number | undefined>(undefined);
  const { loading, error, data, refetch } = useQuery(GET_PHOTOS, {
    variables: { albumId },
  });

  const handleAlbumChange = (value: string) => {
    const newAlbumId = value ? parseInt(value) : undefined;
    setAlbumId(newAlbumId);
    refetch({ albumId: newAlbumId });
  };

  const clearFilter = () => {
    setAlbumId(undefined);
    refetch({ albumId: undefined });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
      Error: {error.message}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filter Photos</h2>
        <div className="flex gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Album ID
            </label>
            <input
              type="number"
              value={albumId || ''}
              onChange={(e) => handleAlbumChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by album ID..."
            />
          </div>
          <button
            onClick={clearFilter}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.photos?.map((photo: any) => (
          <div key={photo.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow overflow-hidden">
            <div className="aspect-square bg-gray-200 relative">
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {photo.id}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                {photo.title}
              </h3>
              <p className="text-xs text-gray-500">
                Album: {photo.albumId}
              </p>
              <a
                href={photo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-blue-600 hover:text-blue-800 text-xs underline"
              >
                View Full Size
              </a>
            </div>
          </div>
        ))}
      </div>

      {data?.photos?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No photos found for this album.</p>
        </div>
      )}
    </div>
  );
}
