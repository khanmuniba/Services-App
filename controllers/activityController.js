import User from "../models/UserModel.js";
import Vendor from "../models/vendorModel.js";
import Booking from "../models/bookingModel.js";
import Payment from "../models/paymentModel.js";

export const getRecentActivity = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name createdAt");

    const vendors = await Vendor.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("businessName isApproved createdAt");

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("serviceName createdAt");

    const payments = await Payment.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("amount createdAt");

    let timeline = [];

    users.forEach(u => {
      timeline.push({
        type: "user",
        message: `New user registered: ${u.name}`,
        time: u.createdAt,
      });
    });

    vendors.forEach(v => {
      timeline.push({
        type: "vendor",
        message: v.isApproved
          ? `Vendor approved: ${v.businessName}`
          : `Vendor registered: ${v.businessName}`,
        time: v.createdAt,
      });
    });

    bookings.forEach(b => {
      timeline.push({
        type: "booking",
        message: `New booking: ${b.serviceName}`,
        time: b.createdAt,
      });
    });

    payments.forEach(p => {
      timeline.push({
        type: "payment",
        message: `Payment received: AED ${p.amount}`,
        time: p.createdAt,
      });
    });

    timeline.sort((a, b) => new Date(b.time) - new Date(a.time));

    const finalTimeline = timeline.slice(0, 10);

    console.log("Fetched timeline:", finalTimeline); // <-- Added this line

    res.json({
      success: true,
      data: finalTimeline, // MUST be 'data' key for frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
