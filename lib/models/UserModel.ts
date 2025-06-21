/*import mongoose from 'mongoose';

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;*/



/*import mongoose from 'mongoose';

export type UserRole = 'user' | 'vendor' | 'superAdmin';

export type User = {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  shop?: {
    name: string;
    location: string;
    description: string;
  };
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'vendor', 'superAdmin'],
      default: 'user',
    },
    shop: {
      name: String,
      location: String,
      description: String,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;
*/

// lib/models/UserModel.ts
import mongoose from 'mongoose';

export type UserRole = 'user' | 'vendor' | 'superAdmin';

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  shop?: mongoose.Schema.Types.ObjectId; // Reference to shop instead of embedded
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'vendor', 'superAdmin'],
      default: 'user',
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop',
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.models?.User || mongoose.model('User', UserSchema);

export default UserModel;