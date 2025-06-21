// app/vendor/[vendorId]/products/VendorProducts.tsx
/*'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

const VendorProducts = ({ vendorId }: { vendorId: string }) => {
  const { data: session } = useSession();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/vendor/${vendorId}/products`);
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    if (session && session.user?._id === vendorId) {
      fetchProducts();
    }
  }, [session, vendorId]);

  if (!session || session.user?._id !== vendorId) {
    return <div>You are not authorized to view this page.</div>;
  }

  if (error) {
    return <div>Error fetching products: {error}</div>;
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

export default VendorProducts;*/
// C:\Users\Admin\Desktop\Fashion-Corner-Next.js-Ecommerce\app\vendor\[vendorId]\products\VendorProducts.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';

export default function VendorProducts() {
  const { data: products, error } = useSWR(`/api/vendor/products`);
  const router = useRouter();

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/vendor/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading('Deleting product...');
      const res = await fetch(`${url}/${arg.productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      res.ok
        ? toast.success('Product deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          });
    },
  );

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/vendor/products`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product created successfully');
      router.push(`/vendor/products/${data.product._id}`);
    },
  );

  if (error) return 'An error has occurred.';
  if (!products) return 'Loading...';

  return (
    <div>
      <div className='flex items-center justify-between'>
        <h1 className='py-4 text-2xl'>My Products</h1>
        <button
          disabled={isCreating}
          onClick={() => createProduct()}
          className='btn btn-primary btn-sm'
        >
          {isCreating && <span className='loading loading-spinner'></span>}
          Create
        </button>
      </div>

      <div className='overflow-x-auto'>
        <table className='table table-zebra'>
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>price</th>
              <th>category</th>
              <th>count in stock</th>
              <th>rating</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product._id}>
                <td>{formatId(product._id!)}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>{product.rating}</td>
                <td>
                  <Link
                    href={`/vendor/products/${product._id}`}
                    type='button'
                    className='btn btn-ghost btn-sm'
                  >
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={() => deleteProduct({ productId: product._id! })}
                    type='button'
                    className='btn btn-ghost btn-sm'
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
}