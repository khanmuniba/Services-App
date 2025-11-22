import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    vendorName: { type: String, required: true },
    businessName: { type: String, required: true },
    phoneNumber: { type: String, required: true },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    serviceCategory: { type: String, required: true },
    businessAddress: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

const Vendor = mongoose.model("Vendor", vendorSchema);
export default Vendor;
