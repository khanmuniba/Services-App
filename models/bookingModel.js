import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  serviceName: { type: String, required: true },
  amount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["pending", "upcoming", "completed", "cancelled"],
    default: "pending",
  },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  rating: { type: Number, default: 0 },
}, { timestamps: true });

// ✅ Prevent model redefinition
const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
export default Booking;
