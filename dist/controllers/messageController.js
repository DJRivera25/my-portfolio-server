import Message from "../models/Message.js";
export const getMessages = async (_req, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
};
export const createMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
};
