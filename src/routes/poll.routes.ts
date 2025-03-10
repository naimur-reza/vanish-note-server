import { Router } from "express";
import { pollController } from "../controllers/poll.controllers";

const router = Router();

router.post("/create-poll", pollController.createPoll);

router.get("/", pollController.getPollBySlug);

export const pollRoutes = router;
