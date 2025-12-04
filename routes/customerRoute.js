import express from "express";
import {  getAllServicesGrouped, getPopularServices, getRecentActivity, getUserProfile, loginUser, registerUser, updateTotalSpent, updateUserLocation } from "../controllers/customerController.js";

const router = express.Router();
// routes for Login 
router.post("/register",registerUser)
router.post("/login", loginUser);

//for customer Profile

// update location
router.put("/update-location/:id", updateUserLocation);

// update totalSpent (add or set)
router.put("/update-total/:id", updateTotalSpent);

// get profile
router.get("/profile/:id", getUserProfile);

// Routes for the Home Screen 

router.get("/popular-services",getPopularServices)
router.get("/recent-activity", getRecentActivity);

// routs for the Services Screen 

router.get("/All-Services",getAllServicesGrouped)
export default router;
