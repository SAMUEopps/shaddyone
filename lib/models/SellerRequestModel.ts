// lib/models/SellerRequestModel.ts
import mongoose from 'mongoose';

export type SellerRequestStatus = 'pending' | 'approved' | 'rejected';

export type SellerRequest = {
  _id?: string;
  user: mongoose.Schema.Types.ObjectId;
  status: SellerRequestStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

const sellerRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const SellerRequestModel =
  mongoose.models.SellerRequest ||
  mongoose.model('SellerRequest', sellerRequestSchema);

export default SellerRequestModel;