
const createOrder = async (req, res) => {
    try {
        const { amount, aiCredits } = req.body;

        if(!amount || !aiCredits){
            return res.status(400).json({ message: "Invalid amount or aiCredits" });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await instance.orders.create(options);

        await Payment.create({
            userId: req.userID,
            amount,
            aiCredits,
            razorpayOrderId: order.id,
            status: "created",
        });
    
    
        return res.status(200).json(order);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to create order" });
    }
}

const verifyOrder = async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
        const payment = await Payment.findOne({ razorpayOrderId });
        if(!payment){
            return res.status(404).json({ message: "Payment not found" });
        }
        if(payment.status === "paid"){
            return res.status(200).json({ message: "Payment already verified" });
        }
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
        hmac.update(razorpayOrderId + "|" + razorpayPaymentId);
        const generatedSignature = hmac.digest("hex");
        if(generatedSignature !== razorpaySignature){
            return res.status(401).json({ message: "Invalid signature" });
        }
        payment.razorpayPaymentId = razorpayPaymentId;
        payment.status = "paid"; 
        await payment.save();
        const user = await User.findByIdAndUpdate(payment.userId, {$inc: {aiCredits: payment.aiCredits}}, {new: true});
        return res.status(200).json({ success: true, message: "Payment verified successfully", user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to verify payment" });
    }
}

export { createOrder, verifyOrder };