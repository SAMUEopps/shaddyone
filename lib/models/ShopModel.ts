// lib/models/ShopModel.ts
import mongoose from 'mongoose';

export type ShopCategory = 
  | 'fashion' 
  | 'home' 
  | 'art' 
  | 'jewelry' 
  | 'beauty' 
  | 'electronics' 
  | 'food' 
  | 'other';

export type ContactInfo = {
  email: string;
  phone?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
};

export type WorkingHours = {
  open: string;
  close: string;
  closed: boolean;
};

export type ShopPolicies = {
  returnPolicy?: string;
  shippingPolicy?: string;
};

export type Shop = {
  _id?: string;
  name: string;
  owner: mongoose.Schema.Types.ObjectId;
  description: string;
  location: string;
  categories: ShopCategory[];
  image: string;
  contact: ContactInfo;
  workingHours: Record<string, WorkingHours>;
  policies?: ShopPolicies;
  isActive: boolean;
  createdAt?: Date;
};

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: String,
  instagram: String,
  facebook: String,
  twitter: String,
});

const workingHoursSchema = new mongoose.Schema({
  open: String,
  close: String,
  closed: Boolean,
});

const policiesSchema = new mongoose.Schema({
  returnPolicy: String,
  shippingPolicy: String,
});

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      //unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    location: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      enum: ['fashion', 'home', 'art', 'jewelry', 'beauty', 'electronics', 'food', 'other'],
      validate: {
        validator: (v: string[]) => v.length > 0,
        message: 'At least one category is required',
      },
    },
    image: {
      type: String,
      required: true,
    },
    contact: {
      type: contactSchema,
      required: true,
    },
    workingHours: {
      type: Map,
      of: workingHoursSchema,
      required: false,
    },
    policies: {
      type: policiesSchema,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Add index to ensure one shop per owner
shopSchema.index({ owner: 1 }, { unique: true });

const ShopModel = mongoose.models?.Shop || mongoose.model('Shop', shopSchema);

export default ShopModel;