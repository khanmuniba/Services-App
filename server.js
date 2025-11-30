import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/db.js";
import adminRoute from "./routes/adminRoute.js";
import vendorRoute from "./routes/vendorRoutes.js";
import customerRoute from "./routes/customerRoute.js";

dotenv.config()
connectDB()
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

// Routes
app.use("/api/admin", adminRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/customer", customerRoute);

app.get("/ping", (req, res) => res.json({ message: "Server is live!" }));
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

// ✅ Connect DB and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => { // wait for DB connection first
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
