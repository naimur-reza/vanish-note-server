import type { Request, Response } from "express";
import { db } from "../config/db";
import { generateSlug } from "../helpers/generateSlug";

const createPoll = async (req: Request, res: Response) => {
  const data = req.body;

  const { question } = data;

  const slug = generateSlug(question);

  const payload = {
    slug,
    createdAt: new Date(),
    ...data,
  };

  const result = await db.collection("polls").insertOne(payload);

  const insertedPoll = await db
    .collection("polls")
    .findOne({ _id: result.insertedId });

  res.status(201).json({
    message: "Poll created successfully",
    data: insertedPoll,
  });
};

const getPollBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const result = await db.collection("polls").findOne({
    slug: slug,
  });

  res.status(200).json({
    message: "Poll retreived successfully",
    data: result,
  });
};

export const pollController = {
  createPoll,
  getPollBySlug,
};
