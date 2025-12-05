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

    // ==== Required for UI and Admin ====
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

    // ⭐ Only this field added
    successRate: {
      type: String,
      default: "0%",
    },

    // Array of services linked to this vendor
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true } // ✅ This is correctly placed as the second argument
);

// Prevent model overwrite if already compiled
const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;
