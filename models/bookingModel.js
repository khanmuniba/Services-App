import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Existing fields (kept untouched)
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

    serviceName: { type: String, required: true },
    amount: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["pending", "upcoming", "completed", "cancelled"],
      default: "pending",
    },

    // Your added fields (corrected but structure preserved)
    customerName: { type: String, required: true },
    date: { type: String, required: true },      // "Today", "2025-02-14"
    time: { type: String, required: true },      // "2:00 PM"
    address: { type: String, required: true },   // full address
    phone: { type: String, required: true },     // customer phone number
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
