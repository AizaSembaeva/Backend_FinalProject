import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    description: { type: String, default: "", trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    durationMin: { type: Number, required: true, min: 5, max: 600 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

serviceSchema.index({ title: 1 });

export default mongoose.model("Service", serviceSchema);
