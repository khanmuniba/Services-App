import User from "../models/UserModel.js";
// import vendorModel from "../models/vendorModel.js";
import Vendor from "../models/vendorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//  USER REGISTRATION

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //  Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    //  Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    //  Return success
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//  USER LOGIN

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // 2. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    //  Return response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// to display popular services 


export const getPopularServices = async (req, res) => {
  try {
  const data = await Vendor.aggregate([
      { $match: { status: "approved" } },
      {
        $group: {
          _id: "$serviceCategory",
          services: {
            $push: {
              vendorName: "$vendorName",
              businessName: "$businessName",
              subService: "$subService",
              rating: "$rating",
              jobs: "$jobs",
            },
          },
        },
      },
    ]);

   

  } catch (err) {
    console.log("POPULAR SERVICES ERROR →", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch popular services",
      error: err.message,
    });
  }
};


