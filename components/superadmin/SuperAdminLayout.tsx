import Link from 'next/link';

import { auth } from '@/lib/auth';

const SuperAdminLayout = async ({
  activeItem = 'dashboard',
  children,
}: {
  activeItem: string;
  children: React.ReactNode;
}) => {
  const session = await auth();
  /*if (!session || !session.user.isAdmin) {
    return (
      <div className='relative flex flex-grow p-4'>
        <div>
          <h1 className='text-2xl'>Unauthorized</h1>
          <p>Admin permission required</p>
        </div>
      </div>
    );
  }*/
 if (!session || session.user.role !== 'superAdmin') {
  return (
    <div className='relative flex flex-grow p-4'>
      <div>
        <h1 className='text-2xl'>Unauthorized</h1>
        <p>Admin permission required</p>
      </div>
    </div>
  );
}


  return (
    <div className='relative flex flex-grow'>
      <div className='grid w-full md:grid-cols-5'>
        <div className='bg-base-200'>
          <ul className='menu gap-1'>
            <li>
              <Link
                className={'dashboard' === activeItem ? 'active' : ''}
                href='/superadmin/dashboard'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={'orders' === activeItem ? 'active' : ''}
                href='/superadmin/orders'
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className={'products' === activeItem ? 'active' : ''}
                href='/superadmin/products'
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className={'users' === activeItem ? 'active' : ''}
                href='/superadmin/users'
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className='px-4 md:col-span-4'>{children}</div>
      </div>
    </div>
  );
};

export default SuperAdminLayout;

/*import { Link } from 'lucide-react';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  activeItem: string;
}

const AdminLayout = ({ children, activeItem }: AdminLayoutProps) => {
  return (
    <div className='flex h-screen'>
      <div className='w-64 bg-gray-800 text-white'>
        <div className='p-4'>
          <h1 className='text-2xl font-bold'>Admin Panel</h1>
        </div>
        <nav className='mt-4'>
          <ul>
            <li className={`p-2 ${activeItem === 'dashboard' ? 'bg-gray-700' : ''}`}>
              <Link href='/superadmin/dashboard'>Dashboard</Link>
            </li>
            <li className={`p-2 ${activeItem === 'orders' ? 'bg-gray-700' : ''}`}>
              <Link href='/superadmin/orders'>Orders</Link>
            </li>
            <li className={`p-2 ${activeItem === 'products' ? 'bg-gray-700' : ''}`}>
              <Link href='/superadmin/products'>Products</Link>
            </li>
            <li className={`p-2 ${activeItem === 'users' ? 'bg-gray-700' : ''}`}>
              <Link href='/superadmin/users'>Users</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex-1 overflow-auto'>{children}</div>
    </div>
  );
};

export default AdminLayout;
*/