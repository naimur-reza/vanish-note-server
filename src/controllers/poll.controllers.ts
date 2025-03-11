import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { db } from "../config/db";
import { generateSlug } from "../helpers/generateSlug";
import { generateId } from "../lib/utils";

const createPoll = async (req: Request, res: Response) => {
  const data = req.body;

  const { question, options, ...restData } = data;

  const modifiedOptions = options.map((option: { value: string }) => ({
    id: generateId(8),
    value: option.value,
    votes: 0,
  }));

  const slug = generateSlug(question);

  const payload = {
    question,
    slug,
    options: modifiedOptions,
    ...restData,
    reactions: {
      likes: 0,
      trending: 0,
    },
    totalVotes: 0,
    createdAt: new Date(),
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
    slug,
  });

  console.log(result);

  if (!result) {
    res.status(404).json({
      message: "Poll not found",
      data: null,
    });

    return;
  }

  res.status(200).json({
    message: "Poll retreived successfully",
    data: result,
  });
};

const updatePoll = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  delete data._id;

  const response = await db.collection("polls").findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    { $set: data },
    { upsert: true, returnDocument: "after" }
  );

  res.status(200).json({
    message: "Poll updated successfully",
    data: response,
  });
};

export const pollController = {
  createPoll,
  getPollBySlug,
  updatePoll,
};
