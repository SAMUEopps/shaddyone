// app/inquiries/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';

type Inquiry = {
  _id: string;
  skill: {
    _id: string;
    name: string;
  };
  buyer: {
    _id: string;
    name: string;
    email: string;
  };
  seller: {
    _id: string;
    name: string;
    email: string;
  };
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
};

export default function InquiriesPage() {
  const { data: session } = useSession();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!session) return;

      try {
        const response = await fetch('/api/inquiries');
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        toast.error('Failed to fetch inquiries');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [session]);

  const handleUpdateStatus = async (inquiryId: string, status: 'accepted' | 'rejected') => {
    try {
      const response = await fetch(`/api/inquiries/${inquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        // Update local state
        setInquiries(prev =>
          prev.map(inq =>
            inq._id === inquiryId ? { ...inq, status } : inq
          )
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to update inquiry status');
    }
  };

  if (!session) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p>You need to be logged in to view inquiries.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center py-10">Loading inquiries...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Inquiries</h1>

      {inquiries.length === 0 ? (
        <div className="text-center py-10">
          <p>You have no inquiries yet.</p>
          <Link href="/skills" className="text-[#bf2c7e] hover:underline mt-2 inline-block">
            Browse skills
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry._id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium">
                    <Link href={`/skills/${inquiry.skill._id}`} className="hover:text-[#bf2c7e]">
                      {inquiry.skill.name}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {inquiry.buyer._id === session.user._id ? (
                      <>You contacted <span className="font-medium">{inquiry.seller.name}</span></>
                    ) : (
                      <><span className="font-medium">{inquiry.buyer.name}</span> contacted you</>
                    )}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    inquiry.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : inquiry.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {inquiry.status}
                </span>
              </div>

              <div className="prose max-w-none mb-4">
                <p className="whitespace-pre-line">{inquiry.message}</p>
              </div>

              <div className="text-sm text-gray-500">
                {new Date(inquiry.createdAt).toLocaleString()}
              </div>

              {inquiry.seller._id === session.user._id && inquiry.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleUpdateStatus(inquiry._id, 'accepted')}
                    className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(inquiry._id, 'rejected')}
                    className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}