/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 });
  }
  await dbConnect();

  const ordersCount = await OrderModel.countDocuments();
  const productsCount = await ProductModel.countDocuments();
  const usersCount = await UserModel.countDocuments();

  const ordersPriceGroup = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        // sum calculate total price of all orders
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const usersData = await UserModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return Response.json({
    ordersCount,
    productsCount,
    usersCount,
    ordersPrice,
    salesData,
    productsData,
    usersData,
  });
});
*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';
import ProductModel from '@/lib/models/ProductModel';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  await dbConnect();

  const ordersCount = await OrderModel.countDocuments();
  const productsCount = await ProductModel.countDocuments();
  const usersCount = await UserModel.countDocuments();

  const ordersPriceGroup = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        // sum calculate total price of all orders
        sales: { $sum: '$totalPrice' },
      },
    },
  ]);

  const ordersPrice =
    ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;

  const salesData = await OrderModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalOrders: { $sum: 1 },
        totalSales: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const productsData = await ProductModel.aggregate([
    {
      $group: {
        _id: '$category',
        totalProducts: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const usersData = await UserModel.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalUsers: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return new Response(
    JSON.stringify({
      ordersCount,
      productsCount,
      usersCount,
      ordersPrice,
      salesData,
      productsData,
      usersData,
    }),
    {
      status: 200,
    },
  );
}) as any;