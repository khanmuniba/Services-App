import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "vendor", "customer"],
      default: "customer",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // 👉 Save user-selected location
    location: {
      type: String,  // e.g. "Dubai, Downtown"
      default: "",
      trim: true,
    },

    bookings: {
      type: Number,
      default: 0,
    },

    // 👉 Total amount spent
    totalSpent: {
      type: Number,
      default: 0,
    },

    joinedDate: {
      type: Date,
      default: Date.now,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);
export default User;
