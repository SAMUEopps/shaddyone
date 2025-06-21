// app/api/inquiries/route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import InquiryModel from '@/lib/models/InquiryModel';

import SkillModel from '@/lib/models/SkillModel';
import UserModel from '@/lib/models/UserModel';
import { NextResponse } from 'next/server';

// Get all inquiries for current user (both as buyer and seller)
export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  await dbConnect();

  try {
    const inquiries = await InquiryModel.find({
      $or: [{ buyer: user._id }, { seller: user._id }],
    })
      .populate('skill', 'name')
      .populate('buyer', 'name email')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(inquiries);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});

// Create new inquiry
export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { skillId, message } = await req.json();

  await dbConnect();

  try {
    // Get skill details
    const skill = await SkillModel.findById(skillId).populate('user', '_id');
    if (!skill) {
      return NextResponse.json(
        { message: 'Skill not found' },
        { status: 404 }
      );
    }

    // Check if user is trying to contact themselves
    if (skill.user._id.toString() === user._id) {
      return NextResponse.json(
        { message: 'Cannot contact yourself' },
        { status: 400 }
      );
    }

    // Create inquiry
    const inquiry = new InquiryModel({
      skill: skillId,
      buyer: user._id,
      seller: skill.user._id,
      message,
    });

    await inquiry.save();
    return NextResponse.json(
      { message: 'Inquiry sent successfully', inquiry },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});