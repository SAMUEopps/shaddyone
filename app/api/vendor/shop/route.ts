import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import ShopModel from '@/lib/models/ShopModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const shop = await ShopModel.findById(req.auth.user.shop);
    if (!shop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }
    return NextResponse.json(shop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error fetching shop' },
      { status: 500 }
    );
  }
});

export const POST = auth(async (req: any) => {
  if (!req.auth || req.auth.user.role !== 'vendor') {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    // Check if user already has a shop
    const existingShop = await ShopModel.findOne({ owner: req.auth.user._id });
    if (existingShop) {
      return NextResponse.json(
        { message: 'User already has a shop' },
        { status: 400 }
      );
    }

    const shop = new ShopModel({
      ...body,
      owner: req.auth.user._id,
    });

    const createdShop = await shop.save();
    
    // Update user with shop reference
    await UserModel.findByIdAndUpdate(req.auth.user._id, {
      shop: createdShop._id,
    });

    return NextResponse.json(createdShop, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error creating shop' },
      { status: 500 }
    );
  }
});

export const PUT = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.shop) {
    return NextResponse.json(
      { message: 'Unauthorized or no shop found' },
      { status: 401 }
    );
  }

  await dbConnect();

  try {
    const body = await req.json();
    
    const updatedShop = await ShopModel.findByIdAndUpdate(
      req.auth.user.shop,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedShop) {
      return NextResponse.json({ message: 'Shop not found' }, { status: 404 });
    }

    return NextResponse.json(updatedShop);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || 'Error updating shop' },
      { status: 500 }
    );
  }
});