import User from "../models/UserModel.js";
import Vendor from "../models/vendorModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";

export const getRecentActivity = async (req, res) => {
  try {
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentVendors = await Vendor.find().sort({ createdAt: -1 }).limit(5);
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentPayments = await Payment.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      success: true,
      activities: {
        users: recentUsers,
        vendors: recentVendors,
        bookings: recentBookings,
        payments: recentPayments
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
