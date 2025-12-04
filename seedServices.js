import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "./models/ServicesModel.js"; // ✅ Correct import

dotenv.config();

const services = [
  {
    vendorId: "692cb4bda9eaa338288920d9", // Abdul Rehman
    title: "Car Wash",
    category: "Vehicle Services",
    description: "Full car wash including interior and exterior cleaning.",
    features: [
      "Exterior wash",
      "Interior vacuuming",
      "Tire cleaning",
      "Window cleaning",
      "Dashboard cleaning"
    ],
    process: [
      "Initial inspection",
      "Pre-wash rinse",
      "Soap and scrub",
      "Vacuum interior",
      "Final inspection"
    ],
    pricing: "Starting from AED 25",
    duration: "30-45 minutes",
    availability: "Mon-Sat: 8AM-8PM",
    rating: 4
  },
  {
    vendorId: "692cb556a9eaa338288920e5", // Umar
    title: "Security Guards",
    category: "Security Services",
    description: "Professional security guards for events and properties.",
    features: [
      "Trained security personnel",
      "Licensed guards (SIRA certified)",
      "Event and venue guarding",
      "Residential and commercial guarding",
      "Flexible contracts"
    ],
    process: [
      "Risk assessment",
      "Contract finalization",
      "Personnel briefing",
      "Deployment of security team",
      "Regular performance review"
    ],
    pricing: "Custom Quote (Varies by contract)",
    duration: "Flexible (Hourly, Monthly, Yearly)",
    availability: "24/7 in Sharjah",
    rating: 0
  },
  {
    vendorId: "692d0d49a9eaa338288920fa", // Abc
    title: "Battery Check & Replacement",
    category: "Vehicle Services",
    description: "Complete battery testing and replacement service.",
    features: [
      "Battery testing",
      "Replacement of old battery",
      "Installation and recycling",
      "Warranty on batteries",
      "Quick service"
    ],
    process: [
      "Battery diagnosis",
      "Check charging system",
      "Remove old battery",
      "Install new battery",
      "Final system check"
    ],
    pricing: "From AED 80 including installation",
    duration: "15-30 minutes",
    availability: "Daily 8AM-6PM",
    rating: 0
  },
  {
    vendorId: "692d15e8a9eaa3382889213b", // Ali
    title: "Window Tinting & Ceramic Coating",
    category: "Vehicle Services",
    description: "Professional window tinting and ceramic coating for vehicles.",
    features: [
      "High-quality tinting",
      "Ceramic coating application",
      "UV protection",
      "Scratch resistance",
      "Durable finish"
    ],
    process: [
      "Clean windows and surface",
      "Apply tinting film",
      "Apply ceramic coating",
      "Buff and inspect",
      "Final check"
    ],
    pricing: "From AED 150 per vehicle",
    duration: "1-2 hours",
    availability: "Mon-Sat: 9AM-6PM",
    rating: 3
  }
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing services
    await Service.deleteMany({});
    console.log("Existing services removed");

    // Insert new services
    await Service.insertMany(services);
    console.log("Services seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding services:", error);
    mongoose.connection.close();
  }
};

seedServices();
