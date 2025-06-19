'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { formatNumber } from '@/lib/utils';
import { Link } from 'lucide-react';

const VendorProducts = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`/api/vendor/${vendorId}/products`);
      const data = await res.json();
      setProducts(data);
    };

    if (session && session.user?._id === vendorId) {
      fetchProducts();
    }
  }, [session, vendorId]);

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div>
      <h1 className='py-4 text-2xl'>Products</h1>
      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${formatNumber(product.price)}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Link
                    href={`/vendor/${vendorId}/products/${product._id}`}
                    className='btn btn-ghost btn-sm'
                  >
                    View
                  </Link>
                  &nbsp;
                  <button
                    className='btn btn-ghost btn-sm'
                    // Add logic to handle product deletion
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VendorProducts;