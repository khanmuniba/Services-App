import jwt from "jsonwebtoken";
import Vendor from "../models/vendorModel.js";

export const vendorAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch vendor from DB using id from token
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    req.vendor = vendor; // ✅ attach full vendor document
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
export default vendorAuth;