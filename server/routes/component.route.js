import express from "express";
import { saveComponent, publishComponent, getAllComponents } from "../controllers/component.controller.js";
import protect from "../middlewares/auth.middleware.js";
import { generateComponent } from "../controllers/aicomponent.controller.js";

const router = express.Router();

router.post("/generate", protect, generateComponent)
router.post("/save", protect, saveComponent);
router.post("/publish", protect, publishComponent);
router.get("/all-components", getAllComponents);

export default router;