import express from "express";
import { adminLogin, getAllUsers, getDashboardStats } from "../controllers/adminController.js";
import { getRecentActivity } from "../controllers/activityController.js";
import adminAuth from "../middlewares/adminAuth.js";


const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard", adminAuth, getDashboardStats);

router.get("/recent-activity", adminAuth, getRecentActivity);

router.get("/getUser",getAllUsers)



export default router;
