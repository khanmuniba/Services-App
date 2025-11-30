import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/db.js";

dotenv.config(); // Load env first

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}

// Basic test routes
// app.get("/ping", (req, res) => res.json({ message: "Server is live!" }));
app.get("/", (req, res) => res.send("Backend is running..."));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// START SERVER SAFELY
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1️⃣ CONNECT TO DATABASE FIRST
    await connectDB();

    // 2️⃣ IMPORT ROUTES AFTER DB CONNECTS
    const { default: adminRoute } = await import("./routes/adminRoute.js");
    const { default: vendorRoute } = await import("./routes/vendorRoutes.js");
    const { default: customerRoute } = await import("./routes/customerRoute.js");

    // 3️⃣ USE ROUTES
    app.use("/api/admin", adminRoute);
    app.use("/api/vendor", vendorRoute);
    app.use("/api/customer", customerRoute);

    // 4️⃣ START SERVER AFTER ROUTES ARE ATTACHED
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
