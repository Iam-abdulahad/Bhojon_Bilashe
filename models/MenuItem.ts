import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuItem extends Document {
  name: string;
  slug: string;
  description: string;
  category: "Starters" | "Mains" | "Desserts" | "Drinks" | "Specials";
  price: number;
  image: string;
  model3d?: string;
  tags: string[]; // e.g. "Spicy", "Vegetarian", "Chef's Pick", "Gluten-Free"
  isSignature: boolean;
  isAvailable: boolean;
  order: number;
  preparationTime?: string;
  spiceLevel?: number; // 0 to 3
  calories?: number;
  ingredients?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Starters", "Mains", "Desserts", "Drinks", "Specials"],
      index: true,
    },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    model3d: { type: String },
    tags: { type: [String], default: [] },
    isSignature: { type: Boolean, default: false, index: true },
    isAvailable: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    preparationTime: { type: String, default: "20-25 mins" },
    spiceLevel: { type: Number, default: 1, min: 0, max: 3 },
    calories: { type: Number },
    ingredients: { type: [String], default: [] },
  },
  { timestamps: true }
);

export const MenuItem: Model<IMenuItem> =
  mongoose.models.MenuItem || mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);
