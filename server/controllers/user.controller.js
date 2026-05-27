import User from "../models/user.model.js";
import crypto from "crypto"
import dotenv from "dotenv";

dotenv.config();

const algorithm = "aes-256-cbc";
const secretKey = process.env.ENCRYPTION_KEY; // 32 bytes
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(secretKey, "hex"),
    iv
  );

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userID);

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({createdAt: -1});

        if(!users) {
            return res.status(404).json({message: "Users not found"});
        }

        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const setApiKey = async (req, res) => {
    try {
        const { apiKey } = req.body;
        if(!apiKey){
            return res.status(400).json({message: "API key is required"});
        }
        const user = await User.findById(req.userID);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const encryptedApiKey = encrypt(apiKey);

        user.apiKey = encryptedApiKey.encryptedData;
        user.iv = encryptedApiKey.iv;
        await user.save();
        return res.status(200).json({message: "API key set successfully", apiKey: encryptedApiKey.encryptedData, iv: encryptedApiKey.iv});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const removeApiKey = async (req, res) => {
    try {
        const user = await User.findById(req.userID);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        user.apiKey = "";
        user.iv = "";
        await user.save();
        return res.status(200).json({message: "API key removed successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {getCurrentUser, getAllUsers, setApiKey, removeApiKey};