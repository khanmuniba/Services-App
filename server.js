import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/db.js";
import adminRoutes from "./routes/adminRoute.js";
import vendorRoute from './routes/vendorRoutes.js'
import customerRoute from './routes/customerRoute.js'
dotenv.config();
connectDB();

const app = express();

// ⭐ FIXED & IMPROVED CORS FOR MOBILE + RENDER
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

//admin routes 
app.use("/api/admin", adminRoutes);

app.use("/api/vendor", vendorRoute);

app.use("/api/customer",customerRoute)


app.get("/", (req, res) => {
  res.send("Backend is running...");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
