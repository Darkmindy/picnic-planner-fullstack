import { apiClient } from "./userApi";
import { EventData } from "../types/IEvent";

export const fetchEvents = async () => {
  try {
    const response = await apiClient.get("/fetch-events");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to fetch events");
  }
}

export const createEvent = async (
  accessToken: string,
  eventData: EventData
) => {
  try {
    const response = await apiClient.post("/add-event", eventData, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create event");
  }
};


export const updateEvent = async (accessToken: string, event: EventData) => {
  try {
    const response = await apiClient.put(`/update-event/${event._id}`, {...event}, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to update event");
  }
}

export const deleteEvent = async (accessToken: string, eventId: string) => {
  try {
    const response = await apiClient.get(`/delete-event/${eventId}`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to delete event");
  }
}