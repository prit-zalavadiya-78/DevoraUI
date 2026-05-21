import User from "../models/user.model.js";

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

export {getCurrentUser, getAllUsers};