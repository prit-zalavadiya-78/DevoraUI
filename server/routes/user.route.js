import express from "express";
import { getCurrentUser, getAllUsers } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get("/current-user", protect, getCurrentUser);
userRouter.get("/all-users", getAllUsers);

export default userRouter;