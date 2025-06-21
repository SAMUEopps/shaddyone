// C:\Users\Admin\Desktop\Fashion-Corner-Next.js-Ecommerce\app\vendor\products\[id]\page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ValidationRule, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Product } from '@/lib/models/ProductModel';
import { formatId } from '@/lib/utils';
import VendorLayout from '@/components/vendor/VendorLayout';

export default function VendorProductEditForm({ params }: { params: { id: string } }) {
  const { data: product, error } = useSWR(`/api/vendor/products/${params.id}`);
  const router = useRouter();
  const categories = ['Shirt', 'Pants', 'Handbags'];
  const { trigger: updateProduct, isMutating: isUpdating } = useSWRMutation(
    `/api/vendor/products/${params.id}`,
    async (url, { arg }) => {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message);

      toast.success('Product updated successfully');
      router.push('/');
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Product>();

  useEffect(() => {
    if (!product) return;
    setValue('name', product.name);
    setValue('slug', product.slug);
    setValue('price', product.price);
    setValue('image', product.image);
    setValue('category', product.category);
    setValue('brand', product.brand);
    setValue('countInStock', product.countInStock);
    setValue('description', product.description);
  }, [product, setValue]);

  const formSubmit = async (formData: any) => {
    await updateProduct(formData);
  };

  if (error) {
    toast.error(error.message);
    router.push('');
    return null;
  }

  if (!product) return 'Loading...';

  const FormInput = ({
    id,
    name,
    required,
    pattern,
  }: {
    id: keyof Product;
    name: string;
    required?: boolean;
    pattern?: ValidationRule<RegExp>;
  }) => (
    <div className='mb-6 md:flex'>
      <label className='label md:w-1/5' htmlFor={id}>
        {name}
      </label>
      <div className='md:w-4/5'>
        <input
          type='text'
          id={id}
          {...register(id, {
            required: required && `${name} is required`,
            pattern,
          })}
          className='input input-bordered w-full max-w-md'
        />
        {errors[id]?.message && (
          <div className='text-error'>{errors[id]?.message}</div>
        )}
      </div>
    </div>
  );

  const uploadHandler = async (e: any) => {
    const toastId = toast.loading('Uploading image...');
    try {
      const resSign = await fetch('/api/cloudinary-sign', {
        method: 'POST',
      });
      const { signature, timestamp } = await resSign.json();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      setValue('image', data.secure_url);
      toast.success('File uploaded successfully', {
        id: toastId,
      });
    } catch (err: any) {
      toast.error(err.message, {
        id: toastId,
      });
    }
  };

  return (
    <VendorLayout activeItem='products' vendorId={product?.vendorId}>
      <div>
        <h1 className='py-4 text-2xl'>Edit Product {formatId(params.id)}</h1>
        <div>
          <form onSubmit={handleSubmit(formSubmit)}>
            <FormInput name='Name' id='name' required />
            <FormInput name='Slug' id='slug' required />
            <FormInput name='Image' id='image' required />
            <div className='mb-6 md:flex'>
              <label className='label md:w-1/5' htmlFor='imageFile'>
                Upload Image
              </label>
              <div className='md:w-4/5'>
                <input
                  type='file'
                  className='file-input w-full max-w-md'
                  id='imageFile'
                  onChange={uploadHandler}
                />
              </div>
            </div>
            <FormInput name='Price' id='price' required />
           {/*} <FormInput name='Category' id='category' required />*/}
           <div className='mb-6 md:flex'>
          <label className='label md:w-1/5' htmlFor='category'>
            Category
          </label>
          <div className='md:w-4/5'>
          <select
            id='category'
            {...register('category', { required: 'Category is required' })}
            className='select select-bordered w-full max-w-md'
            defaultValue=''
          >
            <option value='' disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
            {errors.category?.message && (
              <div className='text-error'>{errors.category.message}</div>
            )}
          </div>
        </div>
            <FormInput name='Brand' id='brand' required />
            <FormInput name='Description' id='description' required />
            <FormInput name='Count In Stock' id='countInStock' required />

            <button
              type='submit'
              disabled={isUpdating}
              className='btn btn-primary'
            >
              {isUpdating && <span className='loading loading-spinner'></span>}
              Update
            </button>
            <Link className='btn ml-4' href='/vendor/products'>
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </VendorLayout>
  );
}