import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: {
    en: string;
    [key: string]: string;
  };
  slug: string;
  description?: {
    en: string;
    [key: string]: string;
  };
  icon?: string;
  color?: string;
  parentId?: mongoose.Types.ObjectId;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      en: { type: String, required: true },
      'zh-CN': String,
      kk: String,
      ug: String
    },
    slug: { type: String, required: true, unique: true, index: true },
    description: {
      en: String,
      'zh-CN': String,
      kk: String,
      ug: String
    },
    icon: String,
    color: String,
    parentId: { type: Schema.Types.ObjectId, ref: 'Category' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true }
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

export default mongoose.model<ICategory>('Category', categorySchema);
