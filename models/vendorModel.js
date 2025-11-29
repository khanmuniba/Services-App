import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: {
      type: String,
      required: [true, "Vendor name is required"],
      trim: true,
    },
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    serviceCategory: {
      type: String,
      required: true,
    },
    subService: {
      type: String,
      required: [true, "Sub-service category is required"],
    },
    businessAddress: {
      type: String,
      required: [true, "Business address is required"],
    },
    description: {
      type: String,
    },

    /* 🔥 Added Required Fields for Admin Panel UI */
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    jobs: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
