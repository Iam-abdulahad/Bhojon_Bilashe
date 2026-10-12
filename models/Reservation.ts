import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReservation extends Document {
  name: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (24-hour)
  guests: number;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    date: { type: String, required: true, index: true },
    time: { type: String, required: true, index: true },
    guests: { type: Number, required: true, min: 1, max: 20 },
    notes: { type: String, trim: true, default: "" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

export const Reservation: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);
