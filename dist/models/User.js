import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
// Define schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
}, { timestamps: true });
// 🔐 Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// 🔐 Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;
