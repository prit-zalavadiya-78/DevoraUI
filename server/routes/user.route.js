import express from "express";
import { getCurrentUser, getAllUsers, setApiKey, removeApiKey } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/current-user", protect, getCurrentUser);
userRouter.get("/all-users", getAllUsers);
userRouter.post("/set-api-key", protect, setApiKey);
userRouter.post("/remove-api-key", protect, removeApiKey);

export default userRouter;