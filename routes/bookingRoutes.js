import express from "express";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

// POST /api/booking/create
router.post("/createBooking", createBooking);

export default router;
