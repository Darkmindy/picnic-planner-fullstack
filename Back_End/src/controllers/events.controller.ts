import { Response } from "express";
import mongoose from "mongoose";
import { fromZodError } from "zod-validation-error";
import { ExtendedRequest } from "../middleware/authorization.middleware";
import {
	createEvent,
	deleteEventById,
	deleteFromUserEvents,
	getEventById,
	getEventByTitle,
	pushToUserEvents,
	showEvents,
	updateEvent,
	updateUserEvents,
} from "../services/event.service";
import { findUserById } from "../services/user.service";
import {
	IFormattedEvent,
	ZEventSchema,
	ZOptionalEvent,
} from "../validation/event.valitation";

//* create event
export const addEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// validate request
		const validationEvent = ZEventSchema.safeParse(req.body);
		if (!validationEvent.success) {
			return res
				.status(400)
				.json(fromZodError(validationEvent.error).message);
		}

		// check if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);

		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}

		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}

		const event = validationEvent.data;

		const existingEvent = await getEventByTitle(event.title);

		// check if event already exists
		if (existingEvent) {
			return res
				.status(400)
				.json(`Event with title ${event.title} already exists`);
		}

		// formatted event for client side
		const showEvent: IFormattedEvent = {
			title: event.title as string,
			description: event.description as string,
			location: event.location as string,
			date: event.date as string,
		};

		const createdEvent = await createEvent(showEvent);
		if (!createdEvent) {
			return res.status(500).json(`Event not created`);
		}

		// push to the user's events
		await pushToUserEvents(userId, createdEvent);

		res.status(201).json({
			message: "Event created successfully",
			event: {
				title: createdEvent?.title,
				description: createdEvent?.description,
				location: createdEvent?.location,
				date: createdEvent?.date,
			},
		});
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

//* update event
export const updateEventHandler = async (
	req: ExtendedRequest,
	res: Response
) => {
	try {
		// find the id of the event to update
		const eventId = req.params.id;
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
		const validationEvent = ZOptionalEvent.safeParse(req.body);
		if (!validationEvent.success) {
			return res
				.status(400)
				.json(fromZodError(validationEvent.error).message);
		}

		const event = validationEvent.data;

		// formatted event for client side
		const showEvent: IFormattedEvent = {
			title: event.title as string,
			description: event.description as string,
			location: event.location as string,
			date: event.date as string,
		};

		const updateExtingEvent = await updateEvent(eventId, showEvent);
		if (!updateExtingEvent) {
			return res
				.status(400)
				.json(`Event with id ${eventId} not found in user's events`);
		}

		// update the event inside the user
		await updateUserEvents(existingUser, eventId, updateExtingEvent);
		res.status(201).json({
			message: "Event updated successfully",
			event: {
				title: updateExtingEvent?.title,
				description: updateExtingEvent?.description,
				location: updateExtingEvent?.location,
				date: updateExtingEvent?.date,
			},
		});
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

//* get events
export const getEvents = async (res: Response) => {
	try {
		const allEvents = await showEvents();
		const formattedEvents: IFormattedEvent[] = [];

		for (const event of allEvents) {
			// formatted event for client side
			const showEvent: IFormattedEvent = {
				_id: event._id,
				title: event.title as string,
				description: event.description as string,
				location: event.location as string,
				date: event.date as string,
			};

			formattedEvents.push(showEvent);
		}
		res.status(200).json(formattedEvents);
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};

//* delete event
export const deleteEvent = async (req: ExtendedRequest, res: Response) => {
	try {
		// find the id of the event to delete
		const eventId = req.params.id;

		if (typeof eventId !== "string") {
			return res.status(400).json(`Event ID must be a string`);
		}
		// validate request
		const validationResult = ZOptionalEvent.safeParse({ eventId });
		if (!validationResult.success) {
			return res
				.status(400)
				.json(fromZodError(validationResult.error).message);
		}

		// check if eventId is valid
		const isValidEventId = mongoose.Types.ObjectId.isValid(eventId);

		if (!isValidEventId) {
			return res
				.status(400)
				.json(`Invalid event id, please provide a valid id`);
		}

		// check if event exists
		const existingEvent = await getEventById(eventId);
		if (!existingEvent) {
			return res.status(400).json(`Event with id ${eventId} not found`);
		}
		// check if userid exists
		const userId = req.user?._id as string;
		const existingUser = await findUserById(userId);
		if (!existingUser) {
			return res.status(400).json(`User not found`);
		}
		// check if user is online
		if (existingUser.isOnline === false) {
			return res.status(400).json(`User not logged in`);
		}

		await deleteEventById(eventId);
		// delete the event also from the user's events array
		await deleteFromUserEvents(existingUser, eventId);
		res.status(201).json("Event deleted successfully");
	} catch (error) {
		res.status(500).json("Internal server error: " + error);
	}
};
