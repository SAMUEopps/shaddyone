import { cache } from 'react';
import dbConnect from '@/lib/dbConnect';
import ShopModel, { Shop } from '@/lib/models/ShopModel';

export const revalidate = 3600;

const getFeaturedShops = cache(async () => {
  await dbConnect();
  const shops = await ShopModel.find({ isActive: true })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate('owner')
    .lean();
  return shops as Shop[];
});

const getShopBySlug = cache(async (slug: string) => {
  await dbConnect();
  const shop = await ShopModel.findOne({ slug })
    .populate('owner')
    .lean();
  return shop as Shop;
});

const getShopById = cache(async (id: string) => {
  await dbConnect();
  const shop = await ShopModel.findById(id)
    .populate('owner')
    .lean();
  return shop as Shop;
});

const shopService = {
  getFeaturedShops,
  getShopBySlug,
  getShopById,
};

export default shopService;