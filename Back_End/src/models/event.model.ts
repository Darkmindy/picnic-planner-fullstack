import mongoose from "mongoose";
import { IEvent } from "../validation/event.valitation";

export const eventSchema = new mongoose.Schema<IEvent>(
	{
		title: {
			type: String,
		},
		description: {
			type: String,
		},
		location: {
			type: String,
		},
		date: {
			type: String,
		},
	},
	{ toJSON: { virtuals: true } }
);

// delete __v property from client side
eventSchema.set("toObject", {
	transform: (ret) => {
		ret.id = ret._id.toString(); // Convert ObjectId to string for convenience
		delete ret.__v; // Remove __v property
		return ret;
	},
});

// if doesn't work modify the event in eventmodel
export const EventModel = mongoose.model("Event", eventSchema);
