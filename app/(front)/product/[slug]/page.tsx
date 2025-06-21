/*import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import AddToCart from '@/components/products/AddToCart';
import { Rating } from '@/components/products/Rating';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='my-2'>
      <div className='my-4'>
        <Link href='/' className='btn'>{`<- Back to Products`}</Link>
      </div>
      <div className='grid gap-4 md:grid-cols-4'>
        <div className='relative aspect-square md:col-span-2'>
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            width={640}
            height={640}
            sizes='100vw'
            className='h-full w-full object-contain'
          />
        </div>
        <div>
          <ul className='space-y-4'>
            <li>
              <h1 className='text-xl'>{product.name}</h1>
            </li>
            <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li>
            <li>{product.brand}</li>
            <li>
              <div className='divider'></div>
            </li>
            <li>
              <p>Description: {product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className='card mt-3 bg-base-300 shadow-xl md:mt-0'>
            <div className='card-body'>
              <div className='flex justify-between'>
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className='mb-2 flex justify-between'>
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                </div>
              </div>
              {product.countInStock !== 0 && (
                <div className='card-actions justify-center'>
                  <AddToCart
                    item={{
                      ...convertDocToObj(product),
                      qty: 0,
                      color: '',
                      size: '',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;*/
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPlaiceholder } from 'plaiceholder';

import AddToCart from '@/components/products/AddToCart';
import { Rating } from '@/components/products/Rating';
import productService from '@/lib/services/productService';
import { convertDocToObj } from '@/lib/utils';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await productService.getBySlug(params.slug);

  if (!product) {
    return notFound();
  }

  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <Link href="/" className="flex items-center text-gray-600 hover:text-[#bf2c7e] transition-colors text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1 sm:mr-2"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Products
          </Link>
        </div>

     {/* Product Content */}
<div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.1)] overflow-hidden">
  <div className="flex flex-col lg:flex-row">
    {/* Image Section - Full bleed on mobile, contained on desktop */}
    <div className="lg:w-1/2 relative">
      <div className="relative aspect-square w-full max-lg:max-h-[70vh] overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          placeholder="blur"
          blurDataURL={base64}
          className="object-contain p-4 transition-all duration-300 hover:scale-105"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
        />
        {/* Floating badge for stock status */}
        {product.countInStock <= 10 && (
          <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.countInStock > 0 ? `Only ${product.countInStock} left` : 'Sold out'}
          </span>
        )}
      </div>
    </div>

    {/* Product Info - Sticky on desktop */}
    <div className="lg:w-1/2 p-5 sm:p-6 lg:p-8 lg:sticky lg:top-4">
      {/* Product Header */}
      <div className="mb-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <span className="inline-block bg-primary-100 text-primary-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
              {product.brand}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h1>
          </div>
          {/* Wishlist button would go here */}
        </div>

        {/* Rating with count */}
        <div className="flex items-center mt-3 space-x-2">
          <div className="flex">
            <Rating 
              value={product.rating}
              caption={`${product.numReviews} ${product.numReviews === 1 ? 'review' : 'reviews'}`}
            />
          </div>
          <span className="text-sm text-gray-500">
            {product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="mt-5 py-4 border-y border-gray-100">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-primary-600">
            Ksh {product.price.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-400 line-through">
              Ksh {(product.price / (1 - product.discount/100)).toLocaleString(undefined, {maximumFractionDigits: 2})}
            </span>
          )}
        </div>
        {product.discount > 0 && (
          <span className="inline-block mt-1 bg-primary-100 text-primary-600 text-xs font-bold px-2 py-0.5 rounded">
            {product.discount}% OFF
          </span>
        )}
      </div>

      {/* Description with expandable functionality */}
      <div className="mt-6 group">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-2">
          Product Details
        </h3>
        <div className="prose prose-sm text-gray-600">
          {product.description}
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
          Highlights
        </h3>
        <ul className="space-y-2">
          {product.features?.map((feature, i) => (
            <li key={i} className="flex items-start">
              <svg className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Add to Cart Section */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Availability</span>
          <span className={`text-sm font-semibold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.countInStock > 0 ? (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                In Stock
              </span>
            ) : 'Out of Stock'}
          </span>
        </div>

        <div className="pt-2">
          {product.countInStock > 0 ? (
            <AddToCart
              item={{
                ...convertDocToObj(product),
                qty: 0,
                color: '',
                size: '',
              }}
            />
          ) : (
            <button
              disabled
              className="w-full py-3 px-6 bg-gray-200 text-gray-500 font-bold rounded-lg cursor-not-allowed"
            >
              Notify When Available
            </button>
          )}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-gray-500">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Checkout
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z" clipRule="evenodd" />
            </svg>
            Money Back Guarantee
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ProductPage;