import type { Request, Response } from "express";

const createPoll = (req: Request, res: Response) => {
  const data = req.body;
  res.json({
    data,
  });
};

export const pollController = {
  createPoll,
};
