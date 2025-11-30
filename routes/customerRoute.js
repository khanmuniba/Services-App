import express from "express";
import {  getPopularServices, loginUser, registerUser } from "../controllers/customerController.js";

const router = express.Router();
// routes
router.post("/register",registerUser)
router.post("/login", loginUser);
// for service
router.get("/popular-services", getPopularServices);


export default router;
