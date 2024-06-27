import mongoose from "mongoose";
import { IEvent } from "../validation/event.valitation";

const eventSchema = new mongoose.Schema<IEvent>({
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
    }
})

// if doesn't work modify the event in eventmodel
export const EventModel = mongoose.model("Event", eventSchema);