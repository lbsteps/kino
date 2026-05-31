import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'editor' | 'user';
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
  };
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'editor', 'user'],
      default: 'user'
    },
    profile: {
      firstName: String,
      lastName: String,
      avatar: String
    },
    permissions: [String],
    isActive: { type: Boolean, default: true, index: true },
    lastLogin: Date
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

// Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcryptjs.compare(password, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
