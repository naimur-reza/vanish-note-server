import type { Request, Response } from "express";
import { db } from "../config/db";
import { generateSlug } from "../helpers/generateSlug";

const createPoll = async (req: Request, res: Response) => {
  const data = req.body;

  const { title } = data;

  const slug = generateSlug(title);

  const payload = {
    slug,
    createdAt: new Date(),
    ...data,
  };

  const result = await db.collection("polls").insertOne(payload);

  res.status(201).json({
    message: "Poll created successfully",
    data: result,
  });
};

export const pollController = {
  createPoll,
};
