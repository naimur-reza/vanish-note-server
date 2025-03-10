import type { Request, Response } from "express";
import { db } from "../config/db";

const createPoll = async (req: Request, res: Response) => {
  const data = req.body;

  const result = await db
    .collection("polls")
    .insertOne({ ...data, createdAt: new Date() });

  res.status(201).json({
    message: "Poll created successfully",
    data: result,
  });
};

export const pollController = {
  createPoll,
};
