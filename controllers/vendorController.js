import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";


// ADMIN CREATES VENDOR

export const createVendor = async (req, res) => {
  try {
    const {
      vendorName,
      businessName,
      phoneNumber,
      email,
      password,
      serviceCategory,
      businessAddress,
      description,
    } = req.body;

    // Check if vendor exists
    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Vendor email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create vendor
    const newVendor = await Vendor.create({
      vendorName,
      businessName,
      phoneNumber,
      email,
      password: hashedPassword,
      serviceCategory,
      businessAddress,
      description,
    });

    // Send email and wait for completion
    try {
      await sendMail(
        email,
        "Your Vendor Login Credentials",
        `Hello ${vendorName},\n\nYour Vendor Account Has Been Created.\n\nLogin Email: ${email}\nPassword: ${password}\n\nUse the mobile app to log in.\n\nRegards,\nAdmin`
      );
      console.log("📩 Vendor email sent successfully");
    } catch (err) {
      console.error("❌ Error sending email:", err);
    }

    return res.status(201).json({
      message: "Vendor account created successfully",
      vendor: newVendor,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating vendor", error: err });
  }
};


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
