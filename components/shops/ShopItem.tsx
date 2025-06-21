/*import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';

import { Shop } from '@/lib/models/ShopModel';

const ShopItem = async ({ shop }: { shop: Shop }) => {
  const buffer = await fetch(shop.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <div className='card bg-base-300 hover:shadow-xl transition-shadow'>
      <figure>
        <Link
          href={`/shop/${shop._id}`}
          className='relative aspect-video h-full w-full'
        >
          <Image
            src={shop.image}
            alt={shop.name}
            placeholder='blur'
            blurDataURL={base64}
            width={350}
            height={200}
            className='h-full w-full object-cover'
          />
        </Link>
      </figure>
      <div className='card-body'>
       <Link href={`/shop/${shop._id}`}>
          <h3 className='card-title line-clamp-1'>{shop.name}</h3>
        </Link>
        <p className='line-clamp-2 text-sm'>{shop.description}</p>
        <div className='flex flex-wrap gap-1 mt-2'>
          {shop.categories.map((category) => (
            <span key={category} className='badge badge-outline'>
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;*/

import Image from 'next/image';
import Link from 'next/link';
import { getPlaiceholder } from 'plaiceholder';
import { Shop } from '@/lib/models/ShopModel';

const ShopItem = async ({ shop }: { shop: Shop }) => {
  const buffer = await fetch(shop.image).then(async (res) =>
    Buffer.from(await res.arrayBuffer()),
  );

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Link href={`/shop/${shop._id}`} className="group relative overflow-hidden rounded-lg sm:rounded-xl bg-white border border-gray-200 hover:border-[#bf2c7e]/50 transition-all duration-300 shadow-sm hover:shadow-md sm:shadow-md sm:hover:shadow-lg block">
      {/* Shop Image */}
      <div className="relative h-48 xs:h-56 sm:h-64 overflow-hidden">
        <Image
          src={shop.image}
          alt={shop.name}
          placeholder='blur'
          blurDataURL={base64}
          fill
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Pink Arrow Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-10 h-10 text-[#bf2c7e] hover:text-white"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Shop Info */}
      <div className="p-3 sm:p-4">
        <div className="mb-2">
          <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-1">
            {shop.name}
          </h3>
          <p className="text-gray-500 text-xs mt-1 line-clamp-2">{shop.description}</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1 mt-2">
          {shop.categories.map((category) => (
            <span key={category} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ShopItem;