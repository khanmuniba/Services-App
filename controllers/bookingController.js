import Booking from "../models/bookingModel.js";


import mongoose from "mongoose";

//controllr to create Booking and store that data in the booking Model

export const createBooking = async (req, res) => {
  try {
    const { customerId, vendorId, serviceId, subService, address, date, time, notes, amount } = req.body;

    if (!customerId || !vendorId || !serviceId || !subService || !address || !date || !time || !amount) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const booking = await Booking.create({
      customer: customerId, // now passed from frontend
      vendor: vendorId,
      serviceId,
      subService,
      address,
      date: new Date(date),
      time,
      notes: notes || '',
      amount,
      status: 'pending_payment',
    });

    return res.status(201).json({ message: 'Booking created successfully.', booking });
  } catch (error) {
    console.error('Booking creation error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};






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

// Complete booking (changes status → complette
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
