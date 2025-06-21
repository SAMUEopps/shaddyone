// app/api/skills/[id]/route.ts
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import SkillModel from '@/lib/models/SkillModel';
import { NextResponse } from 'next/server';

// Get skill by ID
export const GET = async (req: Request, { params }: { params: { id: string } }) => {
  await dbConnect();

  try {
    const skill = await SkillModel.findById(params.id).populate('user', 'name email');
    if (!skill) {
      return NextResponse.json(
        { message: 'Skill not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(skill);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
};

// Update skill
export const PUT = auth(async (req: any, { params }: { params: { id: string } }) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  const { name, description, category, pricePerHour } = await req.json();

  await dbConnect();

  try {
    const skill = await SkillModel.findById(params.id);
    if (!skill) {
      return NextResponse.json(
        { message: 'Skill not found' },
        { status: 404 }
      );
    }

    // Check if user owns the skill
    if (skill.user.toString() !== user._id) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 403 }
      );
    }

    skill.name = name || skill.name;
    skill.description = description || skill.description;
    skill.category = category || skill.category;
    skill.pricePerHour = pricePerHour || skill.pricePerHour;

    await skill.save();
    return NextResponse.json(
      { message: 'Skill updated successfully', skill }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});

// Delete skill
export const DELETE = auth(async (req: any, { params }: { params: { id: string } }) => {
  if (!req.auth) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const { user } = req.auth;
  await dbConnect();

  try {
    const skill = await SkillModel.findById(params.id);
    if (!skill) {
      return NextResponse.json(
        { message: 'Skill not found' },
        { status: 404 }
      );
    }

    // Check if user owns the skill
    if (skill.user.toString() !== user._id) {
      return NextResponse.json(
        { message: 'Not authorized' },
        { status: 403 }
      );
    }

    await skill.deleteOne();
    return NextResponse.json(
      { message: 'Skill deleted successfully' }
    );
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message },
      { status: 500 }
    );
  }
});