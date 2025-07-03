import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    const allowedEmail = process.env.ADMIN_EMAIL; // change to your admin email
    const allowedPassword = process.env.ADMIN_PASSWORD; // change to your chosen password
    console.log("🔐 Provided Email:", email);
    console.log("🔐 Env Email:", process.env.ADMIN_EMAIL);
    console.log("🔐 Provided Password:", password);
    console.log("🔐 Env Password:", process.env.ADMIN_PASSWORD);
    if (email !== allowedEmail || password !== allowedPassword) {
        res.status(403).json({ message: "Unauthorized access" });
        return;
    }
    // ✅ Step 2: Proceed with checking MongoDB
    const foundUser = await User.findOne({ email, password });
    const user = foundUser;
    // ✅ Step 3: Generate token
    const token = generateToken(user._id.toString());
    res.json({
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    });
};
