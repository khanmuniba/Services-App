import express from "express";
import { createVendor, loginVendor } from "../controllers/vendorController.js";

const router = express.Router();

// Admin creates vendor
router.post("/create", createVendor);

// Vendor login
router.post("/login", loginVendor);

export default router;
