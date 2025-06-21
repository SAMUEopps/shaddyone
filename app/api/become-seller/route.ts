// app/api/become-seller/route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import SellerRequestModel from '@/lib/models/SellerRequestModel';
import UserModel from '@/lib/models/UserModel';

export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;

  await dbConnect();

  try {
    // Check if user already has a pending request
    const existingRequest = await SellerRequestModel.findOne({
      user: user._id,
      status: 'pending',
    });

    if (existingRequest) {
      return Response.json(
        { message: 'You already have a pending request' },
        { status: 400 }
      );
    }

    // Check if user is already a vendor
    const dbUser = await UserModel.findById(user._id);
    if (dbUser?.role === 'vendor') {
      return Response.json(
        { message: 'You are already a vendor' },
        { status: 400 }
      );
    }

    // Create new request
    const request = new SellerRequestModel({
      user: user._id,
    });

    await request.save();

    return Response.json(
      { message: 'Request submitted successfully', request },
      { status: 201 }
    );
  } catch (err: any) {
    return Response.json(
      { message: err.message },
      {
        status: 500,
      }
    );
  }
});