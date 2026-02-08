import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true, index: true },
    dateTime: { type: Date, required: true },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
    note: { type: String, default: "", maxlength: 1000 },
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, dateTime: -1 });

export default mongoose.model("Booking", bookingSchema);
