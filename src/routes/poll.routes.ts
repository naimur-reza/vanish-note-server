import { Router } from "express";
import { pollController } from "../controllers/poll.controllers";

const router = Router();

router.post("/create-poll", pollController.createPoll);

export const pollRoutes = router;
