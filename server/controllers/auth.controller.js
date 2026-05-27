import User from "../models/user.model.js";
import getToken from "../config/token.js";

const googleAuth = async (req, res) => {
    try {
        const {name, email} = req.body;

        let user = await User.findOne({email});

        if(!user){
            user = await User.create({
                name,
                email,
                role: "user",
                aiCredits: 100,
                apiKey: ""
            })
        }

        let token = await getToken(user._id);

        res.cookie("token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json(user);

    } catch (error) {
        // console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: false,
            secure: true,
            sameSite: "none",
        });
        return res.status(200).json({message: "User logged out successfully"});
    } catch (error) {
        // console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export {googleAuth, logoutUser};