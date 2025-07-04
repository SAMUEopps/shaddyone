/*import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const user = await UserModel.findById(params.id);
  if (!user) {
    return Response.json(
      { message: 'user not found' },
      {
        status: 404,
      },
    );
  }
  return Response.json(user);
}) as any;

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }

  const { name, email, isAdmin } = await req.json();

  try {
    await dbConnect();
    const user = await UserModel.findById(params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.isAdmin = Boolean(isAdmin);

      const updatedUser = await user.save();
      return Response.json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } else {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || !req.auth.user?.isAdmin) {
    return Response.json(
      { message: 'unauthorized' },
      {
        status: 401,
      },
    );
  }

  try {
    await dbConnect();
    const user = await UserModel.findById(params.id);
    if (user) {
      if (user.isAdmin)
        return Response.json(
          { message: 'User is admin' },
          {
            status: 400,
          },
        );
      await user.deleteOne();
      return Response.json({ message: 'User deleted successfully' });
    } else {
      return Response.json(
        { message: 'User not found' },
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
}) as any;*/

import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/lib/models/UserModel';

export const GET = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }
  await dbConnect();
  const user = await UserModel.findById(params.id);
  if (!user) {
    return new Response(
      JSON.stringify({ message: 'user not found' }),
      {
        status: 404,
      },
    );
  }
  return new Response(
    JSON.stringify(user),
    {
      status: 200,
    },
  );
}) as any;

export const PUT = auth(async (...p: any) => {
  const [req, { params }] = p;
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }

  const { name, email, role } = await req.json();

  try {
    await dbConnect();
    const user = await UserModel.findById(params.id);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;

      const updatedUser = await user.save();
      return new Response(
        JSON.stringify({
          message: 'User updated successfully',
          user: updatedUser,
        }),
        {
          status: 200,
        },
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;

export const DELETE = auth(async (...args: any) => {
  const [req, { params }] = args;
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return new Response(
      JSON.stringify({ message: 'unauthorized' }),
      {
        status: 401,
      },
    );
  }

  try {
    await dbConnect();
    const user = await UserModel.findById(params.id);
    if (user) {
      if (user.role === 'superAdmin')
        return new Response(
          JSON.stringify({ message: 'Cannot delete a super admin user' }),
          {
            status: 400,
          },
        );
      await user.deleteOne();
      return new Response(
        JSON.stringify({ message: 'User deleted successfully' }),
        {
          status: 200,
        },
      );
    } else {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        {
          status: 404,
        },
      );
    }
  } catch (err: any) {
    return new Response(
      JSON.stringify({ message: err.message }),
      {
        status: 500,
      },
    );
  }
}) as any;
