'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';


import { formatNumber } from '@/lib/utils';
import { Link } from 'lucide-react';

const VendorDashboard = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [salesData, setSalesData] = useState<any[]>([]);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);

  useEffect(() => {
    const fetchVendorData = async () => {
      const res = await fetch(`/api/vendor/${vendorId}/summary`);
      const data = await res.json();
      setSalesData(data.salesData);
      setOrdersData(data.ordersData);
      setProductsData(data.productsData);
      setUsersData(data.usersData);
    };

    if (session && session.user?._id === vendorId) {
      fetchVendorData();
    }
  }, [session, vendorId]);

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <div className='stats stats-vertical my-4 inline-grid shadow md:stats-horizontal md:flex'>
        <div className='stat'>
          <div className='stat-title'>Sales</div>
          <div className='stat-value text-primary'>
            ${formatNumber(salesData.reduce((total, sale) => total + sale.totalSales, 0))}
          </div>
          <div className='stat-desc'>
            <Link href={`/vendor/${vendorId}/orders`}>View sales</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Orders</div>
          <div className='stat-value text-primary'>{ordersData.length}</div>
          <div className='stat-desc'>
            <Link href={`/vendor/${vendorId}/orders`}>View orders</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Products</div>
          <div className='stat-value text-primary'>{productsData.length}</div>
          <div className='stat-desc'>
            <Link href={`/vendor/${vendorId}/products`}>View products</Link>
          </div>
        </div>
        <div className='stat'>
          <div className='stat-title'>Users</div>
          <div className='stat-value text-primary'>{usersData.length}</div>
          <div className='stat-desc'>
            <Link href={`/vendor/${vendorId}/users`}>View users</Link>
          </div>
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <h2 className='py-2 text-xl'>Sales Report</h2>
          {/* Sales chart */}
        </div>
        <div>
          <h2 className='py-2 text-xl'>Orders Report</h2>
          {/* Orders chart */}
        </div>
      </div>
      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <h2 className='py-2 text-xl'>Products Report</h2>
          {/* Products chart */}
        </div>
        <div>
          <h2 className='py-2 text-xl'>Users Report</h2>
          {/* Users chart */}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;