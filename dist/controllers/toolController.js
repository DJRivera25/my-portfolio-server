import Tool from "../models/Tool.js";
// 🔍 GET all tools
export const getTools = async (_req, res) => {
    try {
        const tools = await Tool.find().sort({ createdAt: -1 });
        res.json(tools);
    }
    catch (error) {
        console.error("❌ Error fetching tools:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// 🆕 POST new tool
export const createTool = async (req, res) => {
    try {
        const { name, category } = req.body;
        const icon = req.file?.path;
        if (!name || !category || !icon) {
            res.status(400).json({ message: "All fields including icon are required" });
            return;
        }
        const newTool = new Tool({ name, category, icon });
        const saved = await newTool.save();
        res.status(201).json(saved);
    }
    catch (error) {
        console.error("❌ Error creating tool:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// 🗑️ DELETE a tool by ID
export const deleteTool = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);
        if (!tool) {
            res.status(404).json({ message: "Tool not found" });
            return;
        }
        await tool.deleteOne();
        res.status(200).json({ message: "Tool deleted" });
    }
    catch (error) {
        console.error("❌ Error deleting tool:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// ✏️ PUT (update) a tool by ID
export const updateTool = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const icon = req.file?.path;
        const tool = await Tool.findById(req.params.id);
        if (!tool) {
            res.status(404).json({ message: "Tool not found" });
            return;
        }
        tool.name = name || tool.name;
        tool.category = category || tool.category;
        if (icon)
            tool.icon = icon;
        const updated = await tool.save();
        res.status(200).json(updated);
    }
    catch (error) {
        console.error("❌ Error updating tool:", error);
        res.status(500).json({ message: "Server error" });
    }
};
