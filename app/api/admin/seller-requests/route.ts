// app/api/admin/seller-requests/route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import SellerRequestModel from '@/lib/models/SellerRequestModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

// GET handler for fetching requests
export const GET = auth(async (req) => {
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    const requests = await SellerRequestModel.find()
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });

    return NextResponse.json(requests);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});

// PUT handler for updating request status
export const PUT = auth(async (req) => {
  if (!req.auth || req.auth.user?.role !== 'superAdmin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { requestId, status } = await req.json();

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    await dbConnect();

    const request = await SellerRequestModel.findById(requestId).populate(
      'user',
      '_id role'
    );

    if (!request) {
      return NextResponse.json(
        { message: 'Request not found' },
        { status: 404 }
      );
    }

    if (request.status !== 'pending') {
      return NextResponse.json(
        { message: 'Request has already been processed' },
        { status: 400 }
      );
    }

    request.status = status;
    await request.save();

    if (status === 'approved') {
      const user = await UserModel.findById(request.user._id);
      if (user) {
        user.role = 'vendor';
        await user.save();
      }
    }

    return NextResponse.json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});