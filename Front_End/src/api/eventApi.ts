import { apiClient } from "./userApi";

export interface EventData {
  title: string;
  description: string;
  location: string;
  date: string;
}

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
    return [response.data, response.headers["authorization"]];
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to create event");
  }
};
