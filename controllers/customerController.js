import User from "../models/UserModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Vendor from "../models/vendorModel.js";

// register Customer 
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ⭐ Remove password + return all fields
    const { password: _, ...safeUser } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        ...safeUser,
        id: user._id, // convert _id → id
      },
      token,
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



//Login User 

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        ...safeUser,
        id: user._id
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// to store location from location Selector 
export const updateUserLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { location } = req.body;
    if (!location) return res.status(400).json({ message: "Location is required" });

    const user = await User.findByIdAndUpdate(id, { location }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Location updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * PUT /api/user/update-total/:id
 * Body: { amount: 50, mode: "add" }  // mode: "add" or "set"
 */
export const updateTotalSpent = async (req, res) => {
  try {
    const { id } = req.params;
    let { amount, mode } = req.body;

    // Convert amount to number safely
    const amountNum = Number(amount);

    if (isNaN(amountNum)) {
      return res.status(400).json({ message: "Numeric amount required" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (mode === "set") {
      user.totalSpent = amountNum;
    } else {
      // default mode: add
      user.totalSpent = (user.totalSpent || 0) + amountNum;
    }

    await user.save();

    const userSafe = user.toObject();
    delete userSafe.password;

    res.json({
      message: "totalSpent updated",
      user: userSafe,
    });

  } catch (err) {
    console.error("Update TotalSpent Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * GET /api/user/profile/:id
 */
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // format response if you want
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      status: user.status,
      location: user.location,
      bookings: user.bookings,
      totalSpent: user.totalSpent,
      joinedDate: user.joinedDate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



/** 
 * COntrollers for the Home Screennnn */ 


// Get top popular services by rating
export const getPopularServices = async (req, res) => {
  try {
    // Fetch top 10 vendors sorted by rating (descending)
    const vendors = await Vendor.find({ status: "approved", blocked: false })
      .sort({ rating: -1 })
      .limit(10)
      .select(
        "vendorName businessName serviceCategory subService rating jobs description"
      );

    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.error("Error fetching popular services:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get recently completed services (most jobs done recently)
export const getRecentServices = async (req, res) => {
  try {
    // Sort by latest updated vendors with jobs > 0
    const vendors = await Vendor.find({ status: "approved", blocked: false, jobs: { $gt: 0 } })
      .sort({ updatedAt: -1 }) // or createdAt if you want newest vendors
      .limit(10)
      .select(
        "vendorName businessName serviceCategory subService rating jobs description"
      );

    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    console.error("Error fetching recent services:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get recent activity (recently completed jobs)
export const getRecentActivity = async (req, res) => {
  try {
    const recentVendors = await Vendor.find({
      status: "approved",
      blocked: false,
    })
      .sort({ updatedAt: -1 }) // most recent first
      .limit(2) // only 2 vendors
      .select(
        "vendorName businessName serviceCategory subService rating jobs description updatedAt"
      );

    res.status(200).json({ success: true, data: recentVendors });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
