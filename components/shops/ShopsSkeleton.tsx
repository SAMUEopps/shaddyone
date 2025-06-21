const ShopItemSkeleton = () => {
  return (
    <div className='card bg-base-300'>
      <div>
        <div className='skeleton relative aspect-video h-full w-full' />
      </div>
      <div className='card-body'>
        <div className='skeleton mb-2 h-6 w-3/4' />
        <div className='skeleton mb-2 h-4 w-full' />
        <div className='skeleton mb-2 h-4 w-full' />
        <div className='flex gap-2'>
          <div className='skeleton h-6 w-16' />
          <div className='skeleton h-6 w-16' />
        </div>
      </div>
    </div>
  );
};

export const ShopsSkeleton = ({ qty }: { qty: number }) => {
  return (
    <div>
      <h2 className='my-2 text-2xl md:my-4'>Featured Shops</h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 lg:grid-cols-4'>
        {Array.from({ length: qty }).map((_, i) => {
          return <ShopItemSkeleton key={i} />;
        })}
      </div>
    </div>
  );
};