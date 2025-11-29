import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

 

// VENDOR LOGIN
export const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
  { id: vendor._id, role: "vendor" }, // <- use _id from DB
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

    return res.json({
      message: "Vendor login successful",
      token,
      role: "vendor",
        user: {
    vendorName: vendor.vendorName,
    email: vendor.email,
    businessName: vendor.businessName,
  },
    });
  } catch (err) {
    res.status(500).json({ message: "Vendor login failed", error: err });
  }
};
// Create a new vendor
export const createVendor = async (req, res) => {
  console.log("REQ BODY RECEIVED BY BACKEND:", req.body);
  try {
    const { vendorName, businessName, email, phoneNumber, password, serviceCategory, subService, businessAddress, description } = req.body;

    if (!vendorName || !businessName || !email || !phoneNumber || !password || !serviceCategory || !subService || !businessAddress) {
      return res.status(400).json({ message: "Please fill in all required fields" });
    }

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) return res.status(400).json({ message: "Vendor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({ vendorName, businessName, email, phoneNumber, password: hashedPassword, serviceCategory, subService, businessAddress, description });

    const savedVendor = await newVendor.save();
    res.status(201).json({ success: true, data: savedVendor });
  } catch (err) {
    console.error("Error creating vendor:", err);
    res.status(500).json({ success: false, message: "Error creating vendor", error: err.message });
  }
};
//Vendor Profile 



export const getVendorProfile = async (req, res) => {
  try {
    const vendorId = req.vendor._id;

    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        vendorName: vendor.vendorName,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        businessName: vendor.businessName,
        serviceCategory: vendor.serviceCategory,
        subService: vendor.subService,

        // ⭐ Do NOT change model field — just map it for UI
        serviceArea: vendor.businessAddress || "Not Provided",

        // ⭐ Convert "jobs" from model into "jobsDone" for UI
        jobsDone: vendor.jobs || 0,

        successRate: vendor.successRate || "0%",
        rating: vendor.rating || 0,
      }
    });

  } catch (error) {
    console.error("Error fetching vendor profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


