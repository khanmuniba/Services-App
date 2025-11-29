import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // References
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },

    // Service info
    serviceName: { type: String, required: true },   // e.g., "Cleaning"
    amount: { type: Number, default: 0 },           // total price
    status: {
      type: String,
      enum: ["pending", "upcoming", "completed", "cancelled"],
      default: "pending",
    },

    // Customer info
    customerName: { type: String, required: true }, // displayed as booking.customer in frontend
    phone: { type: String, required: true },
    address: { type: String, required: true },      // displayed as booking.location
    date: { type: String, required: true },         // e.g., "Today", "2025-02-14"
    time: { type: String, required: true },         // e.g., "2:00 PM"

    // Optional rating (frontend uses it for completed bookings)
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
