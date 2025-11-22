import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ message: "Invalid admin email" });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    message: "Admin login successful",
    token,
    role: "admin",
  });
};
