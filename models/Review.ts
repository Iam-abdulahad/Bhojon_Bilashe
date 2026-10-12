import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReview extends Document {
  author: string;
  rating: number;
  text: string;
  source: string; // e.g. "Google Reviews", "DineOut", "TripAdvisor"
  avatar?: string;
  featured: boolean;
  date?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    author: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
    text: { type: String, required: true },
    source: { type: String, default: "Google Reviews" },
    avatar: { type: String },
    featured: { type: Boolean, default: true, index: true },
    date: { type: String },
  },
  { timestamps: true }
);

export const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
