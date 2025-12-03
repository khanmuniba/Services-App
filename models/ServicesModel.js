import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },

    serviceCategory: {
      type: String,
      required: true,
      trim: true,
    },

    subService: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    // ⭐ For UI (Popular Services)
    rating: {
      type: Number,
      default: 0,
    },

    totalBookings: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Service =
  mongoose.connection.models.Service ||
  mongoose.model("Service", serviceSchema);

export default Service;
