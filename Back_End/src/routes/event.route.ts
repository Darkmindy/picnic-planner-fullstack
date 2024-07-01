import { Router } from "express";
import { addEvent, updateEventHandler } from "../controllers/events.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/add-event", authMiddleware, addEvent);
router.put("/update-event/:id", authMiddleware, updateEventHandler);
