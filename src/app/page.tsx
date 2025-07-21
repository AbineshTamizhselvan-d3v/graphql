'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from '@/graphql/queries';

interface UserFilter {
  name?: string;
  email?: string;
  city?: string;
}

export default function UsersPage() {
  const [filter, setFilter] = useState<UserFilter>({});
  const { loading, error, data, refetch } = useQuery(GET_USERS, {
    variables: { filter },
  });

  const handleFilterChange = (key: keyof UserFilter, value: string) => {
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
        <h2 className="text-xl font-semibold mb-4">Filter Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              value={filter.name || ''}
              onChange={(e) => handleFilterChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by name..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="text"
              value={filter.email || ''}
              onChange={(e) => handleFilterChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by email..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              value={filter.city || ''}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Filter by city..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.users?.map((user: any) => (
          <div key={user.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              <span className="text-sm text-gray-500">ID: {user.id}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Username:</span> {user.username}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Website:</span> {user.website}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Address</h4>
              <p className="text-sm text-gray-600">
                {user.address.street}, {user.address.suite}<br />
                {user.address.city} {user.address.zipcode}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">Company</h4>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{user.company.name}</span><br />
                {user.company.catchPhrase}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data?.users?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No users found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
