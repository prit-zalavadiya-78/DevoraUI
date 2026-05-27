import crypto from "crypto";
import User from "../models/user.model.js";
import Api from "../models/api.model.js";

const setApikey = async (req, res) => {
    try {
        const { apiKey } = req.body;
        if(!apiKey){
            return res.status(400).json({message: "API key is required"});
        }
        const user = await User.findById(req.userID);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const encryptedApiKey = crypto.createHash("sha256").update(apiKey).digest("hex");

        const exists = await Api.findOne({ownerId: user._id});
        if(exists){
            exists.apiKey = encryptedApiKey;
            await exists.save();
            return res.status(200).json({message: "API key updated successfully"});
        }

        const api = await Api.create({apiKey: encryptedApiKey, ownerId: user._id});
        await api.save();

        res.status(200).json({message: "API key set successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {setApikey};