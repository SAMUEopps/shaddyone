import { Metadata } from 'next';
import { Suspense } from 'react';

import Carousel, { CarouselSkeleton } from '@/components/carousel/carousel';
import Categories from '@/components/categories/Categories';
import Icons from '@/components/icons/Icons';
import ProductItems, {
  ProductItemsSkeleton,
} from '@/components/products/ProductItems';
import ReadMore from '@/components/readMore/ReadMore';
import Text from '@/components/readMore/Text';
import Slider from '@/components/slider/Slider';
import { ShopsSkeleton } from '@/components/shops/ShopsSkeleton';
import Shops from '@/components/shops/shops';

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'Fullstack Next.js Store',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Fullstack Next.js Store - Server Components, MongoDB, Next Auth, Tailwind, Zustand',
};

const HomePage = () => {
  return (
    <div className='my-0 flex flex-col gap-4 md:gap-16'>
      <Categories />
<Icons />
      <Suspense
        fallback={<ProductItemsSkeleton qty={8} name='Latest Products' />}
      >
        <ProductItems />
      </Suspense>

      {/* Advertisement Section - Horizontal Scroll Only */}
      <div className="w-full px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
    
          <div className="relative">
            <div className="overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-4 w-max md:w-full">
                {/* Banner 1 */}
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-yellow-800">Holiday Sale!</h3>
                    <p className="text-sm text-yellow-600 mt-1">Up to 50% off selected items</p>
                  </div>
                  <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-4">New</span>
                </div>

                {/* Banner 2 */}
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-blue-800">New Professionals</h3>
                    <p className="text-sm text-blue-600 mt-1">Discover recently joined experts</p>
                  </div>
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-4">Hot</span>
                </div>

                {/* Banner 3 */}
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-pink-800">Limited Time Offer</h3>
                    <p className="text-sm text-pink-600 mt-1">Book now and get 20% off</p>
                  </div>
                  <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full ml-4">Sale</span>
                </div>

                {/* Optional: Add more banners if needed */}
                <div className="w-[280px] flex-shrink-0 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h3 className="font-bold text-green-800">New Arrivals</h3>
                    <p className="text-sm text-green-600 mt-1">Fresh products just added</p>
                  </div>
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-4">New</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<ProductItemsSkeleton qty={4} name='Top Rated' />}>
        <Slider />
      </Suspense>

      <Suspense fallback={<ShopsSkeleton qty={4} />}>
        <Shops />
      </Suspense>

      {/*<ReadMore>
        <Text />
      </ReadMore>*/}
    </div>
  );
};

export default HomePage;