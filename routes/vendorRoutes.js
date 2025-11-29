import express from "express";
import {  loginVendor,createVendor } from "../controllers/vendorController.js";

const router = express.Router();

// Admin creates vendor


// Vendor login
router.post("/login", loginVendor);

router.post("/create", createVendor);

export default router;
