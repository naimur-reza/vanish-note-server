import { Router } from "express";
import { pollController } from "../controllers/poll.controllers";

const router = Router();

router.post("/create-poll", pollController.createPoll);

router.get("/:slug", pollController.getPollBySlug);

router.patch("/:id", pollController.updatePoll);

export const pollRoutes = router;
