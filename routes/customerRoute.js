import express from "express";
import {  getUserProfile, loginUser, registerUser, updateTotalSpent, updateUserLocation } from "../controllers/customerController.js";

const router = express.Router();
// routes
router.post("/register",registerUser)
router.post("/login", loginUser);

//for customer Profile
// update location
router.put("/update-location/:id", updateUserLocation);

// update totalSpent (add or set)
router.put("/update-total/:id", updateTotalSpent);

// get profile
router.get("/profile/:id", getUserProfile);




export default router;
