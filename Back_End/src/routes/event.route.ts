import { Router } from "express";
import { addEvent, getEvents } from "../controllers/events.controller";
import { authMiddleware } from "../middleware/authorization.middleware";

export const router = Router();

router.post("/add-event", authMiddleware, addEvent)
//router.put("/update-event/:id", authMiddleware, updateEvent)
router.get("/fetch-events", getEvents)