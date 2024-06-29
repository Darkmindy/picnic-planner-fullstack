import { ExtendedRequest } from "../middleware/authorization.middleware";
import { Response } from "express";
import { ZEventSchema } from "../validation/event.valitation";
import { fromZodError } from "zod-validation-error";
import { createEvent, getEventByTitle } from "../services/event.service";
import { createUserEvents, findUserById, updateUserEvents } from "../services/user.service";

/* 
- validate request
- import event from req.body
- the event already exists-
- create event
 */
export const addEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationResult = ZEventSchema.safeParse(req.body);
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
		}

		// control if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);

		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}

		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}

		const event = validationResult.data;

		const existingEvent = await getEventByTitle(event.title);

		// check if event already exists
		if (existingEvent) {
			return res
				.status(400)
				.json(`Event with title ${event.title} already exists`);
		}
		const createdEvent = await createEvent(event);
		if (createdEvent) {
			existingUser.events!.push(createdEvent);
			if (existingUser._id && existingUser.events) {
				const userId = existingUser._id.toString();
				await createUserEvents(userId, existingUser.events);
			}
		}
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

export const updateEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationResult = ZEventSchema.safeParse(req.body);
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
		}

		// control if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);

		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}

		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}
		// event is the data from req.body
		const event = validationResult.data;

		const existingEvent = await getEventByTitle(event.title);
		if (!existingEvent) {
			return res
				.status(400)
				.json(`Event with title ${event.title} not found`);
		} {
			// const updatedUserEvent = await updateSpecificUserEvent(userId, eventId, updatedEvent);

			//existingUser.events!.push(event);
			if (existingUser._id && existingUser.events) {
				const userId = existingUser._id.toString();
				await createUserEvents(userId, existingUser.events);
			}
		}
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
