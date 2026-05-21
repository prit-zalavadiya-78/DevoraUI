import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import componentRouter from "./routes/component.route.js";
import paymentRouter from "./routes/payment.route.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use(cors({
    origin: "https://devoraui-1.onrender.com/",
    credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/component", componentRouter);
app.use("/api/payment", paymentRouter);

app.listen(process.env.PORT, async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
});