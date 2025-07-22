import User from "../models/user.model.js";


export const protect = (req, res, next) => {
    const { userId } = req.auth;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });   
    }else{
        const user = User.findById(userId);
        req.user = user;
        next();
    }
}