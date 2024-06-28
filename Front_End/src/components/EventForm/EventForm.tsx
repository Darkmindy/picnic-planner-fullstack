import { createEvent, EventData } from "api/eventApi"; // Assumendo che tu abbia una funzione createEvent
import React, { useState } from "react";
import { useAuth } from "services/AuthContext";
import "./EventForm.css";

const EventForm: React.FC = () => {
	const [title, setEventTitle] = useState("");
	const [description, setEventDescription] = useState("");
	const [location, setEventLocation] = useState("");
	const [date, setEventDate] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<any | null>(null);

	const { accessToken } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const eventData: EventData = { title, description, location, date };

		try {
			if (!accessToken) {
				throw new Error("Access token not available");
			}

			const result = await createEvent(accessToken, eventData); // Utilizzo della funzione API createEvent
			setResult(result);
			console.log("Event created:", result);

			console.log("Event Name:", title);
			console.log("Event Date:", date);

			// Reset form fields
			setEventTitle("");
			setEventDescription("");
			setEventLocation("");
			setEventDate("");
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
				console.error(error.message);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="event-form">
			<h2>Crea un nuovo evento</h2>
			<div>
				<label>Nome dell'evento:</label>
				<input
					type="text"
					value={title}
					onChange={(e) => setEventTitle(e.target.value)}
				/>
			</div>
			<div>
				<label>Descrizione dell'evento:</label>
				<textarea
					value={description}
					onChange={(e) => setEventDescription(e.target.value)}
				/>
			</div>
			<div>
				<label>Luogo dell'evento:</label>
				<input
					type="text"
					value={location}
					onChange={(e) => setEventLocation(e.target.value)}
				/>
			</div>
			<div>
				<label>Data dell'evento:</label>
				<input
					type="text"
					value={date}
					onChange={(e) => setEventDate(e.target.value)}
				/>
			</div>
			{isSubmitting && <p>Submitting event...</p>}{" "}
			{/*Conditionally render
			loading indicator */}
			<button type="submit" disabled={isSubmitting}>
				Crea evento
			</button>{" "}
			{/* Disable button during submission */}
			{result && <p>Event created successfully!</p>}{" "}
			{/* Display success message after successful response */}
			{error && <p>Error creating event: {error}</p>}{" "}
			{/* Display error message if any */}
		</form>
	);
};

export default EventForm;
