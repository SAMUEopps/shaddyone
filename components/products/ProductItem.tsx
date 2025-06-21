/*import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

import { Product } from '@/lib/models/ProductModel';

import { Rating } from './Rating';

const ProductItem = async ({ product }: { product: Product }) => {
  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='card mb-4 bg-base-300'>
      <figure>
        <Link
          href={`/product/${product.slug}`}
          className='relative aspect-square h-full w-full'
        >
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            width={350}
            height={350}
            className='h-full w-full object-cover'
          />
        </Link>
      </figure>
      <div className='card-body'>
        <Link href={`/product/${product.slug}`}>
          <h3 className='card-title line-clamp-1 font-normal'>
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} caption={`(${product.name})`} isCard />
        <p className='line-clamp-1'>{product.brand}</p>
        <div className='card-actions flex items-center justify-between'>
          <span className='text-2xl'>${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;*/

import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '@/lib/models/ProductModel';
import { Rating } from './Rating';

const ProductItem = async ({ product }: { product: Product }) => {
  const buffer = await fetch(product.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
        <Link href={`/product/${product.slug}`} className="relative aspect-square h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            placeholder='blur'
            blurDataURL={base64}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2 z-10">
          {product.countInStock <= 10 && product.countInStock > 0 && (
            <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
              Low Stock
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-gray-500 text-xs mt-1">{product.brand}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <Rating value={product.rating} isCard caption={''} />
        </div>

        {/* Price and Actions */}
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm sm:text-base font-bold text-[#bf2c7e]">
            Ksh {product.price}
          </span>
          
          <div className="flex gap-2">
            <button className="p-2 bg-gray-100 hover:bg-[#bf2c7e] hover:text-white rounded-full transition-colors">
              <ShoppingCart size={16} />
            </button>
            <Link href={`/product/${product.slug}`}>
              <button className="p-2 bg-gray-100 hover:bg-[#bf2c7e] hover:text-white rounded-full transition-colors">
                <Eye size={16} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;