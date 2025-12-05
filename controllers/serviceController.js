import Service from "../models/ServicesModel.js";
// import Vendor from "../models/vendorModel.js"
// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("vendorId", "vendorName businessName serviceCategory");

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, data: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// controllers/serviceController.js



