/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const orders = await OrderModel.find()
    .sort({ createdAt: -1 })
    // get the name of user
    .populate('user', 'name');

  return Response.json(orders);
}) as any;*/
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import OrderModel from '@/lib/models/OrderModel';

export const GET = auth(async (req: any) => {
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const orders = await OrderModel.find()
    .sort({ createdAt: -1 })
    .populate('user', 'name');

  return new Response(
    JSON.stringify(orders),
    {
      status: 200,
    },
  );
}) as any;