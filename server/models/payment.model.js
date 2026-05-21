import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    aiCredits: Number,
    razorpayOrderId: String, 
    razorpayPaymentId: String,
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",
    }
}, { timestamps: true });

export const Payment = mongoose.model("Payment", paymentSchema);

