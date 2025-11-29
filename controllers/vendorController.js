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
      { id: vendor._id, role: "vendor" },
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
    const vendorId = req.vendor.id;

    const vendor = await Vendor.findById(vendorId).select(
      "name email phone businessName serviceArea rating jobsDone successRate"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

