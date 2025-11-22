import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";

// -----------------------------------------
// ADMIN CREATES VENDOR
// -----------------------------------------
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

    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Vendor email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    //  Email credentials to vendor
    await sendMail(
      email,
      "Your Vendor Login Credentials",
      `Hello ${vendorName},

Your Vendor Account Has Been Created.

Login Email: ${email}
Password: ${password}

Use the mobile app to log in.

Regards,
Admin`
    );

    return res.status(201).json({
      message: "Vendor account created successfully",
      vendor: newVendor,
    });
  } catch (err) {
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
    });
  } catch (err) {
    res.status(500).json({ message: "Vendor login failed", error: err });
  }
};
