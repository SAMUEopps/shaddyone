// app/api/skills/route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import SkillModel from '@/lib/models/SkillModel';
import { NextResponse } from 'next/server';

// Get all skills or skills by user
export const GET = async (req: Request) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    const query = userId ? { user: userId } : {};
    const skills = await SkillModel.find(query).populate('user', 'name email');
    return NextResponse.json(skills);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
};

// Create new skill
export const POST = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { name, description, category, pricePerHour } = await req.json();

  await dbConnect();

  try {
    const skill = new SkillModel({
      name,
      description,
      category,
      pricePerHour,
      user: user._id,
    });

    await skill.save();
    return NextResponse.json(
      { message: 'Skill created successfully', skill },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});