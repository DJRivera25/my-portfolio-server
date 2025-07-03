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
