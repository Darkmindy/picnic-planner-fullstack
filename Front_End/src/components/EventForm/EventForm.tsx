import { createEvent } from '../../api/eventApi';
import { EventData } from 'types/IEvent';
import React, { useState } from 'react';
import { useAuth } from '../../services/AuthContext'; 
//import { logOut } from 'api/userApi';
import './EventForm.css';

interface EventFormProps {
  getEvents: () => void;
}

const EventForm: React.FC<EventFormProps> = ({getEvents}) => {
  const [title, setEventTitle] = useState('');
  const [description, setEventDescription] = useState('');
  const [location, setEventLocation] = useState('');
  const [date, setEventDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { accessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    const eventData: EventData = { title, description, location, date };

    try {
      if (!accessToken.current) {
        throw new Error('Access token not available');
      }

      const data = await createEvent(accessToken.current, eventData);
      console.log(data);
      getEvents();
      setSuccessMessage('Event created successfully!');

      console.log('Event created:', eventData);
      setEventTitle('');
      setEventDescription('');
      setEventLocation('');
      setEventDate('');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        console.error('Error creating event:', error.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="event-form">
      <h2>Crea un nuovo evento</h2>
      <div>
        <label>Nome dell'evento:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setEventTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrizione dell'evento:</label>
        <textarea
          value={description}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Luogo dell'evento:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data dell'evento:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </div>
      {isSubmitting && <p>Submitting event...</p>}
      <button type="submit" disabled={isSubmitting}>
        Crea evento
      </button>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>Error creating event: {error}</p>}
    </form>
    </>
  );
};

export default EventForm;
