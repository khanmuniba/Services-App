import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";
import Vendor from "../models/vendorModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";
import sendMail from "../utils/sendMail.js";
import bcrypt from "bcryptjs";
dotenv.config();
// admin login


export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid admin email" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    message: "Admin login successful",
    token,
    role: "admin",
  });
};

// code to get the admin dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeVendors = await Vendor.countDocuments();
    const bookingsCount = await Booking.countDocuments();

    const revenueAgg = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        activeVendors,
        bookingsCount,
        totalRevenue,
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get all users


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });

    const formattedUsers = users.map(u => ({
      id: u._id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      status: u.status.toLowerCase(),
      bookings: u.bookings,
      joined: new Date(u.joinedDate).toLocaleString('en-US', {
        month: 'short',
        year: 'numeric'
      })
    }));

    res.json({
      success: true,
      users: formattedUsers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};







