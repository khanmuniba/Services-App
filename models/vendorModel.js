import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    // ===== BASIC VENDOR DETAILS (provided during registration) =====
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
      required: [true, "Service category is required"],
    },

    subService: {
      type: String,
      required: [true, "Sub-service is required"],
    },

    businessAddress: {
      type: String,
      required: [true, "Business address is required"],
    },

    description: {
      type: String,
      default: "",
    },

    // ===== SYSTEM / ADMIN CONTROLLED FIELDS =====
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

    successRate: {
      type: String,
      default: "0%",
    },

    // list of services created by this vendor
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { timestamps: true }
);

const Vendor = mongoose.models.Vendor || mongoose.model("Vendor", vendorSchema);
export default Vendor;
