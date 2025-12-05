// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "../models/vendorModel.js";
import Service from "../models/ServicesModel.js";

dotenv.config(); // Load .env FIRST

// ------------------------------------------------------
// 🔗 CONNECT TO MONGO
// ------------------------------------------------------
async function connectDB() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing from .env file");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("🔥 MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
}

// ------------------------------------------------------
// 📌 SEED FUNCTION
// ------------------------------------------------------
async function seedData() {
  try {
    // DELETE OLD DATA
    await Vendor.deleteMany({});
    await Service.deleteMany({});
    console.log("🧹 Old Vendor & Service data deleted!");

    // ------------------------------------------------------
    // 📌 10 Vendors (Seed Data)
    // ------------------------------------------------------
    const vendorSeed = [
      {
        vendorName: "Ali Khan",
        businessName: "Fast Car Washers",
        email: "ali.carwash@example.com",
        phoneNumber: "03001234567",
        password: "hashedpassword",
        serviceCategory: "Vehicle Services",
        subService: "Car Wash",
        businessAddress: "Karachi, Pakistan",
        description: "Professional outdoor & indoor car washing services."
      },
      {
        vendorName: "Ahmed Raza",
        businessName: "Tyre Master Shop",
        email: "ahmed.tyre@example.com",
        phoneNumber: "03007654321",
        password: "hashedpassword",
        serviceCategory: "Vehicle Services",
        subService: "Tyre Replacement & Repair",
        businessAddress: "Lahore, Pakistan",
        description: "Complete tyre repair, puncture fix, and wheel alignment."
      },
      {
        vendorName: "Bilal Hussain",
        businessName: "Engine Pro Service",
        email: "bilal.engineoil@example.com",
        phoneNumber: "03123456789",
        password: "hashedpassword",
        serviceCategory: "Vehicle Services",
        subService: "Engine Oil Change",
        businessAddress: "Rawalpindi, Pakistan",
        description: "Quick engine oil change at your doorstep."
      },
      {
        vendorName: "Usman Ali",
        businessName: "TechAuto Support",
        email: "usman.techsupport@example.com",
        phoneNumber: "03214567890",
        password: "hashedpassword",
        serviceCategory: "Vehicle Services",
        subService: "Technical Support",
        businessAddress: "Islamabad, Pakistan",
        description: "Advanced vehicle diagnostics and technical solutions."
      },
      {
        vendorName: "Hamza Tariq",
        businessName: "BatteryZone",
        email: "hamza.battery@example.com",
        phoneNumber: "03051239876",
        password: "hashedpassword",
        serviceCategory: "Vehicle Services",
        subService: "Battery Replacement",
        businessAddress: "Faisalabad, Pakistan",
        description: "On-spot battery testing & replacement services."
      },
      {
        vendorName: "Sara Malik",
        businessName: "Trusted Babysitters",
        email: "sara.babysitting@example.com",
        phoneNumber: "03112233445",
        password: "hashedpassword",
        serviceCategory: "Home Services",
        subService: "Baby Sitting",
        businessAddress: "Islamabad, Pakistan",
        description: "Certified and trained babysitters available 24/7."
      },
      {
        vendorName: "Ayesha Khan",
        businessName: "Home Maid Center",
        email: "ayesha.housemaid@example.com",
        phoneNumber: "03001478523",
        password: "hashedpassword",
        serviceCategory: "Home Services",
        subService: "House Maid",
        businessAddress: "Karachi, Pakistan",
        description: "Professional full-time and part-time maids."
      },
      {
        vendorName: "Farhan Javed",
        businessName: "CleanPro Services",
        email: "farhan.cleaning@example.com",
        phoneNumber: "03351234987",
        password: "hashedpassword",
        serviceCategory: "Home Services",
        subService: "Deep Cleaning",
        businessAddress: "Lahore, Pakistan",
        description: "Residential & commercial deep cleaning experts."
      },
      {
        vendorName: "Zain Ali",
        businessName: "HandyFix Maintenance",
        email: "zain.maintenance@example.com",
        phoneNumber: "03233445566",
        password: "hashedpassword",
        serviceCategory: "Home Services",
        subService: "Maintenance Work",
        businessAddress: "Rawalpindi, Pakistan",
        description: "Home electrical, plumbing & repair services."
      },
      {
        vendorName: "SecurityCorp Team",
        businessName: "Elite Guards",
        email: "elite.security@example.com",
        phoneNumber: "03009988776",
        password: "hashedpassword",
        serviceCategory: "Security Services",
        subService: "Security Guards & Bouncers",
        businessAddress: "Dubai",
        description: "Trained bouncers & guards available for events & contracts."
      }
    ];

    // INSERT VENDORS
    console.log("⏳ Creating Vendors...");
    const createdVendors = await Vendor.insertMany(vendorSeed);
    console.log(`✅ Vendors Created: ${createdVendors.length}`);

    // ------------------------------------------------------
    // 📌 CREATE LINKED SERVICES FOR EACH VENDOR
    // ------------------------------------------------------
    console.log("⏳ Creating Services...");

    let createdServices = [];

    for (let vendor of createdVendors) {
      const service = await Service.create({
        vendorId: vendor._id,
        title: vendor.subService,
        category: vendor.serviceCategory,
        description: vendor.description,
        features: [
          "Verified vendor",
          "High-quality service",
          "Customer support available"
        ],
        process: [
          "Customer books the service",
          "Vendor contacts customer",
          "Vendor arrives at location",
          "Service completed",
          "Customer feedback collected"
        ],
        pricing: "Contact for pricing",
        duration: "1–3 hours",
        availability: "Available",
        rating: Math.floor(Math.random() * 5) + 1
      });

      createdServices.push(service);

      // Link service to vendor
      vendor.services.push(service._id);
      await vendor.save();
    }

    console.log(`✅ Services Created: ${createdServices.length}`);
    console.log("🎉 SEEDING COMPLETED SUCCESSFULLY!");

  } catch (error) {
    console.error("❌ SEEDING FAILED:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

// ------------------------------------------------------
// 🚀 RUN
// ------------------------------------------------------
await connectDB();
await seedData();
