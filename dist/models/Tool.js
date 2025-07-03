import mongoose from "mongoose";
const toolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["frontend", "backend", "database", "devtools", "deployment"], required: true },
    icon: { type: String, required: true },
}, { timestamps: true });
export default mongoose.model("Tool", toolSchema);
