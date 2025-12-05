import mongoose from "mongoose";
import dotenv from "dotenv";
import Vendor from "../models/vendorModel.js"; // adjust path if needed
import bcrypt from "bcryptjs";

dotenv.config();

const hashedPassword = bcrypt.hashSync("Password123", 10);

const vendors = [
  // ======================
  // VEHICLE SERVICES
  // ======================
  {
    vendorName: "Ahmed Car Wash",
    businessName: "Shiny Car Wash",
    email: "carwash1@example.com",
    phoneNumber: "0500000001",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Car Wash",
    businessAddress: "Dubai Marina",
    description: "Professional car washing service",
    status: "approved",
    rating: 4.8,
    jobs: 42,
    earnings: 8000,
    successRate: "96%",
  },
  {
    vendorName: "Recovery UAE",
    businessName: "Fast Recovery Team",
    email: "recovery1@example.com",
    phoneNumber: "0500000002",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Stolen Car Recovery",
    businessAddress: "Al Barsha",
    description: "GPS tracking and recovery assistance",
    status: "approved",
    rating: 4.5,
    jobs: 20,
    earnings: 12000,
    successRate: "92%",
  },
  {
    vendorName: "Tyre Fix Pro",
    businessName: "Tyre Replacement Experts",
    email: "tyre1@example.com",
    phoneNumber: "0500000003",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Tyre Replacement & Repair",
    businessAddress: "Deira",
    description: "Complete tyre solutions",
    status: "approved",
    rating: 4.7,
    jobs: 33,
    earnings: 9000,
    successRate: "89%",
  },
  {
    vendorName: "Technical Expert",
    businessName: "Tech Support UAE",
    email: "tech1@example.com",
    phoneNumber: "0500000004",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Technical Support",
    businessAddress: "JLT",
    description: "24/7 technical assistance",
    status: "approved",
    rating: 4.9,
    jobs: 55,
    earnings: 11000,
    successRate: "98%",
  },
  {
    vendorName: "Oil Masters",
    businessName: "Engine Oil Change Pro",
    email: "oil1@example.com",
    phoneNumber: "0500000005",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Engine Oil Change",
    businessAddress: "Business Bay",
    description: "Quality oil change service",
    status: "approved",
    rating: 4.6,
    jobs: 28,
    earnings: 4500,
    successRate: "90%",
  },
  {
    vendorName: "Battery Guys",
    businessName: "Rapid Battery Replacement",
    email: "battery1@example.com",
    phoneNumber: "0500000006",
    password: hashedPassword,
    serviceCategory: "Vehicle Services",
    subService: "Battery Replacement",
    businessAddress: "Satwa",
    description: "Battery testing and replacement",
    status: "approved",
    rating: 4.4,
    jobs: 31,
    earnings: 5000,
    successRate: "87%",
  },

  // ======================
  // HOME SERVICES
  // ======================
  {
    vendorName: "Maryam Babysitting",
    businessName: "Care with Love",
    email: "baby1@example.com",
    phoneNumber: "0500000007",
    password: hashedPassword,
    serviceCategory: "Home Services",
    subService: "Baby Sitting",
    businessAddress: "Sharjah",
    description: "Trusted childcare services",
    status: "approved",
    rating: 4.9,
    jobs: 60,
    earnings: 15000,
    successRate: "99%",
  },
  {
    vendorName: "Aisha Maid Service",
    businessName: "Home Maid Pro",
    email: "maid1@example.com",
    phoneNumber: "0500000008",
    password: hashedPassword,
    serviceCategory: "Home Services",
    subService: "House Maid",
    businessAddress: "Ajman",
    description: "Professional household help",
    status: "approved",
    rating: 4.7,
    jobs: 40,
    earnings: 9500,
    successRate: "93%",
  },
  {
    vendorName: "Clean with Aleena",
    businessName: "Aleena Cleaning Services",
    email: "clean1@example.com",
    phoneNumber: "0500000009",
    password: hashedPassword,
    serviceCategory: "Home Services",
    subService: "House Cleaning",
    businessAddress: "Dubai Silicon Oasis",
    description: "Regular cleaning services",
    status: "approved",
    rating: 4.8,
    jobs: 70,
    earnings: 18000,
    successRate: "97%",
  },
  {
    vendorName: "Deep Clean Experts",
    businessName: "Spotless Home Co",
    email: "deep1@example.com",
    phoneNumber: "0500000010",
    password: hashedPassword,
    serviceCategory: "Home Services",
    subService: "Deep Cleaning",
    businessAddress: "Dubai Hills",
    description: "Thorough deep cleaning",
    status: "approved",
    rating: 4.6,
    jobs: 36,
    earnings: 10000,
    successRate: "91%",
  },
  {
    vendorName: "FixIt",
    businessName: "Home Maintenance Expert",
    email: "maint1@example.com",
    phoneNumber: "0500000011",
    password: hashedPassword,
    serviceCategory: "Home Services",
    subService: "Maintenance Work",
    businessAddress: "Karama",
    description: "Home repair and maintenance",
    status: "approved",
    rating: 4.5,
    jobs: 27,
    earnings: 6000,
    successRate: "88%",
  },

  // ======================
  // SECURITY SERVICES
  // ======================
  {
    vendorName: "Security Pro",
    businessName: "Secure Guards UAE",
    email: "security1@example.com",
    phoneNumber: "0500000012",
    password: hashedPassword,
    serviceCategory: "Security Services",
    subService: "Security Guards & Bouncers",
    businessAddress: "Dubai",
    description: "Yearly, Monthly, Hourly security",
    status: "approved",
    rating: 4.9,
    jobs: 85,
    earnings: 25000,
    successRate: "99%",
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");


    await Vendor.insertMany(vendors);
    console.log("Seed vendors inserted successfully!");

    process.exit();
  })
  .catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  });
