import Booking from "../models/bookingModel.js";


// Get all bookings for a vendor (pending / upcoming / completed / cancelled)

import mongoose from "mongoose";

export const getVendorBookings = async (req, res) => {
  try {
    let { vendorId } = req.params;

    // Remove leading colon if any
    // if (vendorId.startsWith(":")) vendorId = vendorId.slice(1);

    // Check valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(vendorId)) {
      return res.status(400).json({ success: false, message: "Invalid vendorId" });
    }

    // ✅ Use 'new' with ObjectId
    const bookings = await Booking.find({ vendorId }).sort({ createdAt: -1 });


    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("Error fetching vendor bookings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




// Accept booking (changes status → upcoming)

export const acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "upcoming" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Booking accepted",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Cancel / Decline booking (changes status → cancelled)

export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Complete booking (changes status → completed)

export const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status: "completed" },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Booking completed",
      booking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
