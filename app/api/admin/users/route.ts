/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

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
  const users = await UserModel.find();
  return Response.json(users);
}) as any;
*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

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
  const users = await UserModel.find();
  return new Response(
    JSON.stringify(users),
    {
      status: 200,
    },
  );
}) as any;