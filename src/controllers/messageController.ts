import { Request, Response } from "express";
import Message from "../models/Message.js";

export const getMessages = async (_req: Request, res: Response) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const newMessage = new Message(req.body);
  const saved = await newMessage.save();
  res.status(201).json(saved);
};

export const markMessageAsSeen = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Message.findByIdAndUpdate(id, { hasViewed: true }, { new: true });

    if (!updated) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    res.json(updated);
  } catch (err) {
    console.error("Error marking message as seen:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Error deleting message:", err);
    res.status(500).json({ message: "Server error" });
  }
};
