import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedToken){
            return res.status(401).json({message: "Unauthorized"});
        }

        req.userID = decodedToken.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Unauthorized"});
    }
}

export default protect;