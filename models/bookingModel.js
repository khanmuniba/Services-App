import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    subService: {
      type: String, // subService name from service
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String, // store selected time slot as string
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending_payment", "pending", "in-progress", "completed", "cancelled"],
      default: "pending_payment", // payment pending by default
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.connection.models.Booking ||
  mongoose.model("Booking", bookingSchema);

export default Booking;
