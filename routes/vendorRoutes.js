import express from "express";
import {  loginVendor,createVendor, getVendorProfile } from "../controllers/vendorController.js";
import vendorAuth from "../middlewares/vendorAuth.js";
import {
  getVendorBookings,
  acceptBooking,
  cancelBooking,
  completeBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

// Admin creates vendor


// Vendor login
router.post("/login", loginVendor);
//create vendor route ,controller for this is in the admin controller
router.post("/create", createVendor);
// get Vendor Profile
router.get("/profile",vendorAuth, getVendorProfile);

// booking routes 

// Get all bookings for vendor
router.get("/:vendorId/bookings", getVendorBookings);

// Accept booking
router.put("/booking/:bookingId/accept", acceptBooking);

// Cancel booking
router.put("/booking/:bookingId/cancel", cancelBooking);

// Complete booking
router.put("/booking/:bookingId/complete", completeBooking);

// to create a service 
// router.post("/service", createService)
export default router;
