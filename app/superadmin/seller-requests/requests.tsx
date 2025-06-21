// app/admin/seller-requests/SellerRequestsTable.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type SellerRequest = {
  _id: string;
  status: 'pending' | 'approved' | 'rejected';
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  createdAt: string;
};

export default function SellerRequestsTable() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<SellerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user.role === 'superAdmin') {
      fetchRequests();
    }
  }, [session]);

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/admin/seller-requests', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setRequests(data);
    } catch (error: any) {
      toast.error(`Failed to fetch requests: ${error.message}`);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (requestId: string, status: 'approved' | 'rejected') => {
    try {
      const response = await fetch('/api/admin/seller-requests', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, status }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update request');
      }

      const data = await response.json();
      toast.success(data.message);
      fetchRequests(); // Refresh the list
    } catch (error: any) {
      toast.error(`Update failed: ${error.message}`);
      console.error('Update error:', error);
    }
  };

  if (session?.user.role !== 'superAdmin') {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Seller Requests</h1>
      
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">User</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Current Role</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="py-2 px-4 border-b">{request.user.name}</td>
                  <td className="py-2 px-4 border-b">{request.user.email}</td>
                  <td className="py-2 px-4 border-b">{request.user.role}</td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        request.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : request.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleUpdateStatus(request._id, 'approved')}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(request._id, 'rejected')}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}