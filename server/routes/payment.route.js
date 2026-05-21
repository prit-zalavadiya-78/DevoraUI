import { Router } from "express";
import { createOrder, verifyOrder } from "../controllers/payment.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/create", protect, createOrder);
router.post("/verify", protect, verifyOrder); 

export default router;