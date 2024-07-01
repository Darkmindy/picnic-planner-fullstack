import { Response } from "express";
import mongoose from "mongoose";
import { fromZodError } from "zod-validation-error";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import {
	createEvent,
	getEventById,
	getEventByTitle,
	updateEvent,
} from "../services/event.service";
import {
	createOrUpdateUserEvents,
	findUserById,
} from "../services/user.service";
import { ZEventSchema, ZOptionalEvent } from "../validation/event.valitation";

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
				await createOrUpdateUserEvents(userId, existingUser.events);
			}
		}
		res.status(201).json(createdEvent);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

export const updateEventHandler = async (
	req: ExtendedRequest,
	res: Response
) => {
	try {
		// find the id of the event to update
		const eventId = req.params.id;
		console.log("eventId: " + eventId);

		// check if eventId is valid
		const validEventId = mongoose.Types.ObjectId.isValid(eventId);
		if (!validEventId) {
			return res
				.status(400)
				.json(`Invalid event id, please provide a valid id`);
		}

		// check if event exists
		const existingEvent = await getEventById(eventId);
		if (!existingEvent) {
			return res.status(400).json(`Event with id ${eventId} not found`);
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

		// validate request
		const validationError = ZOptionalEvent.safeParse(req.body);
		if (!validationError.success) {
			return res
				.status(400)
				.json(fromZodError(validationError.error).message);
		}

		const updateExtingEvent = await updateEvent(
			eventId,
			validationError.data
		);
		if (!updateExtingEvent) {
			return res
				.status(400)
				.json(`Event with id ${eventId} not found in user's events`);
		}
		res.status(201).json(updateExtingEvent);

		//TODO c'è un bug perchè l'evento si modifica all'interno dell'utente ma non nella sezione events dell'utente
		existingUser.events!.push(updateExtingEvent);
		if (existingUser._id && existingUser.events) {
			const userId = existingUser._id.toString();
			await createOrUpdateUserEvents(userId, existingUser.events);
		}
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
