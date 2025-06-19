/*import { Link } from 'lucide-react';
import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
  activeItem: string;
  vendorId: string;
}

const VendorLayout = ({ children, activeItem, vendorId }: VendorLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <div className='w-64 bg-gray-800 text-white'>
        <div className='p-4'>
          <h1 className='text-2xl font-bold'>Vendor Panel</h1>
        </div>
        <nav className='mt-4'>
          <ul>
            <li className={`p-2 ${activeItem === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <Link href={`/vendor/${vendorId}/dashboard`}>Dashboard</Link>
            </li>
            <li className={`p-2 ${activeItem === 'orders' ? 'bg-gray-700' : ''}`}>
              <Link href={`/vendor/${vendorId}/orders`}>Orders</Link>
            </li>
            <li className={`p-2 ${activeItem === 'products' ? 'bg-gray-700' : ''}`}>
              <Link href={`/vendor/${vendorId}/products`}>Products</Link>
            </li>
            <li className={`p-2 ${activeItem === 'users' ? 'bg-gray-700' : ''}`}>
              <Link href={`/vendor/${vendorId}/users`}>Users</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  );
};

export default VendorLayout;*/

import Link from 'next/link';
import { ReactNode } from 'react';

interface VendorLayoutProps {
  children: ReactNode;
  activeItem: string;
  vendorId: string;
}

const VendorLayout = ({ children, activeItem, vendorId }: VendorLayoutProps) => {
  return (
    <div className='relative flex flex-grow'>
      <div className='grid w-full md:grid-cols-5'>
        <div className='bg-base-200'>
          <ul className='menu gap-1'>
            <li>
              <Link
                className={activeItem === 'dashboard' ? 'active' : ''}
                href={`/vendor/${vendorId}/dashboard`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={activeItem === 'orders' ? 'active' : ''}
                href={`/vendor/${vendorId}/orders`}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={activeItem === 'products' ? 'active' : ''}
                href={`/vendor/${vendorId}/products`}
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
        <div className='px-4 md:col-span-4'>{children}</div>
      </div>
    </div>
  );
};

export default VendorLayout;