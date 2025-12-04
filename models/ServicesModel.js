import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
    title: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    features: [String],
    process: [String],
    pricing: String,
    duration: String,
    availability: String,
    rating: Number,
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
