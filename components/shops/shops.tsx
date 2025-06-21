import shopService from '@/lib/services/shopService';

import ShopItem from './ShopItem';

const Shops = async () => {
  const shops = await shopService.getFeaturedShops();

  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>Featured Shops</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {shops.map((shop) => (
          <ShopItem key={shop._id} shop={shop} />
        ))}
      </div>
    </div>
  );
};

export default Shops;