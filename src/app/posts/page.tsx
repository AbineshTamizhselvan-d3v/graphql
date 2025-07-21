'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '@/graphql/queries';

interface PostFilter {
  userId?: number;
  title?: string;
}

export default function PostsPage() {
  const [filter, setFilter] = useState<PostFilter>({});
  const { loading, error, data, refetch } = useQuery(GET_POSTS, {
    variables: { filter },
  });

  const handleFilterChange = (key: keyof PostFilter, value: string | number) => {
    const newFilter = { ...filter, [key]: value || undefined };
    setFilter(newFilter);
    refetch({ filter: newFilter });
  };

  const clearFilters = () => {
    setFilter({});
    refetch({ filter: {} });
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
        <h2 className="text-xl font-semibold mb-4">Filter Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User ID
            </label>
            <input
              type="number"
              value={filter.userId || ''}
              onChange={(e) => handleFilterChange('userId', parseInt(e.target.value) || undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by user ID..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={filter.title || ''}
              onChange={(e) => handleFilterChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by title..."
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.posts?.map((post: any) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                {post.title}
              </h3>
              <span className="text-sm text-gray-500 ml-2">ID: {post.id}</span>
            </div>
            
            <p className="text-gray-700 mb-4 line-clamp-3">{post.body}</p>
            
            {post.user && (
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Author:</span> {post.user.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {post.user.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">User ID:</span> {post.userId}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {data?.posts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
