import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/db.js";

dotenv.config();

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

// Test route
app.get("/ping", (req, res) => res.json({ message: "Server is live!" }));
app.get("/", (req, res) => res.send("Backend is running..."));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // IMPORT ROUTES
    const { default: adminRoute } = await import("./routes/adminRoute.js");
    const { default: vendorRoute } = await import("./routes/vendorRoutes.js");
    const { default: customerRoute } = await import("./routes/customerRoute.js");
    const { default: bookingRoute } = await import("./routes/bookingRoutes.js");
    // USE ROUTES
    app.use("/api/admin", adminRoute);
    app.use("/api/vendor", vendorRoute);
    app.use("/api/customer", customerRoute);
    app.use("/api/booking", bookingRoute);

    // ❗ NOW add 404 handler AFTER routes
    app.use((req, res, next) => {
      const error = new Error("Route not found");
      error.status = 404;
      next(error);
    });

    // GLOBAL ERROR HANDLER
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(err.status || 500).json({
        message: err.message || "Something went wrong",
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      });
    });

    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
