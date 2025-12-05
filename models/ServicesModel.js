import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },

    process: {
      type: [String],
      default: [],
    },

    pricing: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    availability: {
      type: String,
      default: "Available",
    },

    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema);
export default Service;
