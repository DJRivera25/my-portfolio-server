import jwt from "jsonwebtoken";
import User from "../models/User.js";
export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    if (!token) {
        res.status(401).json({ message: "Not authorized, token missing" });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        req.user = user; // Fully typed with comparePassword method
        next();
    }
    catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
