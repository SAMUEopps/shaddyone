// lib/models/InquiryModel.ts
import mongoose from 'mongoose';

export type InquiryStatus = 'pending' | 'accepted' | 'rejected';

export type Inquiry = {
  _id?: string;
  skill: mongoose.Schema.Types.ObjectId;
  buyer: mongoose.Schema.Types.ObjectId;
  seller: mongoose.Schema.Types.ObjectId;
  message: string;
  status: InquiryStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

const inquirySchema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const InquiryModel =
  mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);

export default InquiryModel;