'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { formatNumber } from '@/lib/utils';
import { Link } from 'lucide-react';

const VendorOrders = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`/api/vendor/${vendorId}/orders`);
      const data = await res.json();
      setOrders(data);
    };

    if (session && session.user?._id === vendorId) {
      fetchOrders();
    }
  }, [session, vendorId]);

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1 className='py-4 text-2xl'>Orders</h1>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${formatNumber(order.totalPrice)}</td>
                <td>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
                <td>
                  <Link
                    href={`/vendor/${vendorId}/orders/${order._id}`}
                    className='btn btn-ghost btn-sm'
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorOrders;