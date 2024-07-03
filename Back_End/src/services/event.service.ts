import { EventModel } from "../models/event.model";
import { User } from "../models/user.model";
import { IEvent, IOptionalEvent } from "../validation/event.valitation";
import { IUser } from "../validation/user.validation";

export const getEventByTitle = async (
	title: string
): Promise<IEvent | null> => {
	return await EventModel.findOne({ title });
};

export const createEvent = async (event: IEvent): Promise<IEvent | null> => {
	return await EventModel.create(event);
};

export const showEvents = async (): Promise<IEvent[]> => {
	return await EventModel.find();
};

export const getEventById = async (id: string): Promise<IEvent | null> => {
	return await EventModel.findById(id);
};

export const deleteEventById = async (id: string): Promise<IEvent | null> => {
	return await EventModel.findByIdAndDelete(id);
};

//? to value: use pushToUserEvents service, cause it's more efficient on controller side
// export const createOrUpdateUserEvents = async (
// 	userId: string,
// 	events: IEvent[]
// ): Promise<IUser | null> => {
// 	return await User.findByIdAndUpdate(userId, { events }, { new: true });
// };

// push the event to the user's events array
export const pushToUserEvents = async (
	userId: string,
	event: IEvent
): Promise<IUser | null> => {
	return await User.findByIdAndUpdate(userId, { $push: { events: event } });
};

export const updateEvent = async (
	eventId: string,
	event: IOptionalEvent
): Promise<IEvent | null> => {
	return await EventModel.findOneAndUpdate(
		{ _id: eventId },
		{ $set: event },
		{ new: true }
	);
};

export const updateUserEvents = async (
	user: IUser,
	eventId: string,
	eventUpdated: IEvent
): Promise<IUser | null> => {
	const result = await User.updateOne(
		{ _id: user._id, "events._id": eventId },
		{ $set: { "events.$": eventUpdated } }
	);

	if (!result) {
		return null;
	}
	return await User.findById(user._id);
};

export const deleteFromUserEvents = async (
	user: IUser,
	eventId: string
): Promise<IUser | null> => {
	return await User.findByIdAndUpdate(user._id, {
		$pull: { events: { _id: eventId } },
	});
};
