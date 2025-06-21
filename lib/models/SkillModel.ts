// lib/models/SkillModel.ts
import mongoose from 'mongoose';

export type Skill = {
  _id?: string;
  name: string;
  description: string;
  category: string;
  pricePerHour?: number;
  user: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    pricePerHour: {
      type: Number,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SkillModel =
  mongoose.models.Skill || mongoose.model('Skill', skillSchema);

export default SkillModel;